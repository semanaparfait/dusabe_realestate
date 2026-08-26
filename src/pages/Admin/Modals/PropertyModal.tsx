import React, { useRef, useState, useEffect } from "react";
import { X, UploadCloud, Trash2, Star, Loader2, Video, Image as ImageIcon } from "lucide-react";
import {
  overlayClass,
  glassInputClass,
  fieldLabelClass,
  cancelBtnClass,
  saveBtnClass,
} from "@/pages/Admin/Modals/modalStyles";
import { uploadImageToCloudflare } from "@/utils/uploadToCloudflare";
import { toast } from "react-toastify";
import { collection, doc, addDoc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import type { PropertyData, PostedByInfo } from "@/pages/Admin/AdminTypes/AdminTypes";

// Builds a snapshot of the signed-in admin for attribution on the listing.
// uid/email come from Firebase Auth; any extra profile fields (name, role, ...)
// are pulled in from their Users/{uid} document if one exists.
async function getCurrentAdminInfo(): Promise<PostedByInfo | null> {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;

  const info: PostedByInfo = {
    uid: currentUser.uid,
    email: currentUser.email,
  };

  try {
    const profileSnap = await getDoc(doc(db, "Users", currentUser.uid));
    if (profileSnap.exists()) {
      const profile = profileSnap.data();
      Object.assign(info, profile, { uid: currentUser.uid, email: currentUser.email });
    }
  } catch (err) {
    console.error("Could not load admin profile for attribution.", err);
  }

  return info;
}



interface PropertyModalProps {
  isOpen: boolean;
  editingId: string | null;
  form: PropertyData;
  setForm: React.Dispatch<React.SetStateAction<PropertyData>>;
  onClose: () => void;
  onSuccess?: () => void; // Callback to refresh property list in the parent tab
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  isOpen,
  editingId,
  form,
  setForm,
  onClose,
  onSuccess,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Form Field States initialized from props
  const [title, setTitle] = useState<string>(form.title || "");
  const [price, setPrice] = useState<number>(form.price || 0);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(form.discountPrice || 0);
  const [type, setType] = useState<string>(form.type || "Villa");
  const [status, setStatus] = useState<string>(form.status || "For Sale");
  const [city, setCity] = useState<string>(form.city || "");
  const [address, setAddress] = useState<string>(form.address || "");
  const [beds, setBeds] = useState<number>(form.beds || 0);
  const [baths, setBaths] = useState<number>(form.baths || 0);
  const [area, setArea] = useState<number>(form.area || 0);
  const [images, setImages] = useState<string[]>(Array.isArray(form.images) ? form.images : []);
  const [videoUrl, setVideoUrl] = useState<string>(form.videoUrl || "");
  const [description, setDescription] = useState<string>(form.description || "");

  // Sync state whenever editing item changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle(form.title || "");
      setPrice(form.price || 0);
      setDiscountPrice(form.discountPrice || 0);
      setType(form.type || "Villa");
      setStatus(form.status || "For Sale");
      setCity(form.city || "");
      setAddress(form.address || "");
      setBeds(form.beds || 0);
      setBaths(form.baths || 0);
      setArea(form.area || 0);
      setImages(Array.isArray(form.images) ? form.images : []);
      setVideoUrl(form.videoUrl || "");
      setDescription(form.description || "");
      setUploadError(null);
    }
  }, [isOpen, form]);

  if (!isOpen) return null;

  // Cloudflare R2 Multi-File Upload Handler
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const availableSlots = 5 - images.length;
    if (availableSlots <= 0) {
      setUploadError("Maximum of 5 photos allowed per property.");
      return;
    }

    const selectedFiles = Array.from(files).slice(0, availableSlots);
    setIsUploading(true);
    setUploadError(null);

    try {
      // Upload directly to Cloudflare under the 'properties' folder
      const uploadPromises = selectedFiles.map((file) =>
        uploadImageToCloudflare(file, "properties")
      );
      const uploadedUrls = await Promise.all(uploadPromises);

      const updatedImages = [...images, ...uploadedUrls];
      setImages(updatedImages);
      setForm((prev: PropertyData) => ({ ...prev, images: updatedImages }));
      toast.success(`${uploadedUrls.length} image(s) uploaded to Cloudflare!`);
    } catch (err: any) {
      const errorMsg = err.message || "Failed to upload images to Cloudflare.";
      setUploadError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    setImages(updated);
    setForm((prev: any) => ({ ...prev, images: updated }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  // Submit & Save Data to Firebase Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !city.trim() || !address.trim() || price <= 0) {
      toast.error("Please fill in all required property details.");
      return;
    }

    setIsSaving(true);

    const adminInfo = await getCurrentAdminInfo();

    const payload = {
      title: title.trim(),
      price: Number(price),
      discountPrice: Number(discountPrice) || 0,
      type,
      status,
      city: city.trim(),
      address: address.trim(),
      beds: Number(beds) || 0,
      baths: Number(baths) || 0,
      area: Number(area) || 0,
      images,
      videoUrl: videoUrl.trim(),
      description: description.trim(),
      updatedAt: serverTimestamp(),
      // Every save records who last touched the listing...
      ...(adminInfo ? { lastEditedBy: adminInfo } : {}),
    };

    try {
      if (editingId) {
        // Update existing document. postedBy is deliberately left out of this
        // payload — updateDoc() only patches the given fields, so whoever
        // originally created the listing stays intact.
        const docRef = doc(db, "properties", editingId);
        await updateDoc(docRef, payload);
        toast.success("Property updated successfully in Firebase!");
      } else {
        // Create new document — ...and creation additionally records who posted it.
        const colRef = collection(db, "properties");
        await addDoc(colRef, {
          ...payload,
          ...(adminInfo ? { postedBy: adminInfo } : {}),
          createdAt: serverTimestamp(),
        });
        toast.success("New property published to Firebase!");
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Firebase save error:", error);
      toast.error(error.message || "Failed to save property to Firebase.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={overlayClass}>
      <div className="w-full max-w-[800px] max-h-[92vh] overflow-y-auto bg-bg-secondary border border-border-light rounded-[24px] p-6 sm:p-9 [backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)] text-text-primary font-sans">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-5 mb-6 border-b border-border-light">
          <div>
            <h2 className="text-[1.35rem] sm:text-[1.5rem] font-heading font-bold text-text-primary">
              {editingId ? "Edit Property Listing" : "Post New Luxury Property"}
            </h2>
            <p className="text-[0.78rem] text-text-secondary mt-0.5">
              Fill in property specifications and upload up to 5 photos to Cloudflare.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors cursor-pointer border-none bg-transparent"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Title */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Property Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. The Glass Pavilion Sanctuary"
              className={glassInputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Price (RWF) *</label>
            <input
              type="number"
              required
              min={0}
              placeholder="e.g. 250000000"
              className={glassInputClass}
              value={price || ""}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          {/* Discount Price */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Discount Price (0 if none)</label>
            <input
              type="number"
              min={0}
              placeholder="0"
              className={glassInputClass}
              value={discountPrice || ""}
              onChange={(e) => setDiscountPrice(Number(e.target.value))}
            />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Property Type</label>
            <select
              className={glassInputClass}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Apartment">Apartment</option>
              <option value="Commercial">Commercial</option>
              <option value="Mansion">Mansion</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Listing Status</label>
            <select
              className={glassInputClass}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
              <option value="Off-Market">Off-Market</option>
            </select>
          </div>

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>City / Region *</label>
            <input
              type="text"
              required
              placeholder="e.g. Kigali"
              className={glassInputClass}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Street Address *</label>
            <input
              type="text"
              required
              placeholder="e.g. KG 9 Ave, Nyarutarama"
              className={glassInputClass}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Bedrooms / Bathrooms */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Bedrooms / Bathrooms</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Beds"
                min={0}
                className={`${glassInputClass} w-1/2`}
                value={beds || ""}
                onChange={(e) => setBeds(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Baths"
                min={0}
                className={`${glassInputClass} w-1/2`}
                value={baths || ""}
                onChange={(e) => setBaths(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Area */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Area (sq ft / sqm)</label>
            <input
              type="number"
              placeholder="e.g. 450"
              min={0}
              className={glassInputClass}
              value={area || ""}
              onChange={(e) => setArea(Number(e.target.value))}
            />
          </div>

          {/* ============================================================== */}
          {/* CLOUDFLARE R2 IMAGE UPLOAD GALLERY (MAX 5) */}
          {/* ============================================================== */}
          <div className="sm:col-span-2 flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-border-light">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-[0.85rem] font-semibold text-text-primary flex items-center gap-2">
                  <ImageIcon size={16} className="text-accent-gold" />
                  Property Image Showcase
                  <span className="text-[0.75rem] font-normal text-text-secondary">
                    ({images.length}/5 uploaded)
                  </span>
                </label>
                <p className="text-[0.72rem] text-text-tertiary mt-0.5">
                  Uploaded directly to Cloudflare R2. The first image serves as the main cover.
                </p>
              </div>
            </div>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/webp"
              multiple
              disabled={isUploading}
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />

            {uploadError && (
              <p className="text-red-400 text-[0.75rem]">{uploadError}</p>
            )}

            {/* Visual Photo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-2">
              {images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border-light bg-black/40 shadow-inner"
                >
                  <img
                    src={imgUrl}
                    alt={`Listing photo ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Primary Cover Badge */}
                  {idx === 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-accent-gold text-black text-[0.6rem] font-extrabold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                      <Star size={9} fill="currentColor" /> Cover
                    </span>
                  )}

                  {/* Delete Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition-colors border-none cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload Dropzone Button */}
              {images.length < 5 && (
                <div
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`aspect-[4/3] rounded-xl border-2 border-dashed border-border-light hover:border-accent-gold/60 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer flex flex-col items-center justify-center p-2 text-center ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={24} className="text-accent-gold animate-spin mb-1" />
                      <span className="text-[0.7rem] text-text-secondary">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={24} className="text-accent-gold mb-1" />
                      <span className="text-[0.75rem] font-medium text-text-primary">
                        Upload
                      </span>
                      <span className="text-[0.65rem] text-text-tertiary">
                        Max 5 photos
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* YouTube Video URL */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={`${fieldLabelClass} flex items-center gap-1.5`}>
              <Video size={14} className="text-accent-gold" />
              YouTube Video Tour URL (Optional)
            </label>
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              className={glassInputClass}
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Property Description</label>
            <textarea
              rows={3}
              placeholder="Describe architectural highlights, luxury finishes, views, security..."
              className={glassInputClass}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="sm:col-span-2 flex justify-end gap-3 pt-3 border-t border-border-light mt-2">
            <button type="button" onClick={onClose} disabled={isSaving} className={cancelBtnClass}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || isSaving}
              className={`${saveBtnClass} flex items-center gap-2`}
            >
              {isSaving && <Loader2 size={16} className="animate-spin" />}
              {isSaving ? "Saving..." : editingId ? "Update Listing" : "Save Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};