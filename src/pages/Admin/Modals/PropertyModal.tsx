import React, { useRef } from "react";
import { X, UploadCloud, Trash2, Star, Image as ImageIcon, Video } from "lucide-react";
import {
  overlayClass,
  glassInputClass,
  fieldLabelClass,
  cancelBtnClass,
  saveBtnClass,
} from "@/pages/Admin/Modals/modalStyles";

interface PropertyModalProps {
  isOpen: boolean;
  editingId: string | null;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  isOpen,
  editingId,
  form,
  setForm,
  onSave,
  onClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const currentImages: string[] = Array.isArray(form.images) ? form.images : [];

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const availableSlots = 5 - currentImages.length;
    if (availableSlots <= 0) return;

    const selectedFiles = Array.from(files).slice(0, availableSlots);

    const newImagePromises = selectedFiles.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            resolve(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagePromises).then((base64Images) => {
      setForm((prev: any) => ({
        ...prev,
        images: [...(Array.isArray(prev.images) ? prev.images : []), ...base64Images],
      }));
    });
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setForm((prev: any) => ({
      ...prev,
      images: (Array.isArray(prev.images) ? prev.images : []).filter(
        (_: string, idx: number) => idx !== indexToRemove
      ),
    }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
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
              Fill in property specifications and select up to 5 luxury showcase photos.
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

        <form onSubmit={onSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Title */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Property Title</label>
            <input
              type="text"
              required
              placeholder="e.g. The Glass Pavilion Sanctuary"
              className={glassInputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Price (RWF)</label>
            <input
              type="number"
              required
              placeholder="e.g. 250000000"
              className={glassInputClass}
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
          </div>

          {/* Discount Price */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Discount Price (0 if none)</label>
            <input
              type="number"
              placeholder="0"
              className={glassInputClass}
              value={form.discountPrice || 0}
              onChange={(e) =>
                setForm({ ...form, discountPrice: Number(e.target.value) })
              }
            />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Property Type</label>
            <select
              className={glassInputClass}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
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
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
              <option value="Off-Market">Off-Market</option>
            </select>
          </div>

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>City / Region</label>
            <input
              type="text"
              required
              placeholder="e.g. Kigali"
              className={glassInputClass}
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Street Address</label>
            <input
              type="text"
              required
              placeholder="e.g. KG 9 Ave, Nyarutarama"
              className={glassInputClass}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
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
                value={form.beds}
                onChange={(e) =>
                  setForm({ ...form, beds: Number(e.target.value) })
                }
              />
              <input
                type="number"
                placeholder="Baths"
                min={0}
                className={`${glassInputClass} w-1/2`}
                value={form.baths}
                onChange={(e) =>
                  setForm({ ...form, baths: Number(e.target.value) })
                }
              />
            </div>
          </div>

          {/* Area */}
          <div className="flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Area (sq ft / sqm)</label>
            <input
              type="number"
              placeholder="e.g. 450"
              className={glassInputClass}
              value={form.area}
              onChange={(e) =>
                setForm({ ...form, area: Number(e.target.value) })
              }
            />
          </div>

          {/* ============================================================== */}
          {/* IMAGE ONLY UPLOAD MANAGER (MAX 5) */}
          {/* ============================================================== */}
          <div className="sm:col-span-2 flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-border-light">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-[0.85rem] font-semibold text-text-primary flex items-center gap-2">
                  <ImageIcon size={16} className="text-accent-gold" />
                  Property Image Showcase
                  <span className="text-[0.75rem] font-normal text-text-secondary">
                    ({currentImages.length}/5 uploaded)
                  </span>
                </label>
                <p className="text-[0.72rem] text-text-tertiary mt-0.5">
                  Upload up to 5 photos. The first image will be set as the main cover photo.
                </p>
              </div>
            </div>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />

            {/* Visual Photo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-2">
              {currentImages.map((imgUrl, idx) => (
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

              {/* Upload Dropzone / Add Trigger */}
              {currentImages.length < 5 && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="aspect-[4/3] rounded-xl border-2 border-dashed border-border-light hover:border-accent-gold/60 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer flex flex-col items-center justify-center p-2 text-center"
                >
                  <UploadCloud size={24} className="text-accent-gold mb-1" />
                  <span className="text-[0.75rem] font-medium text-text-primary">
                    Upload
                  </span>
                  <span className="text-[0.65rem] text-text-tertiary">
                    PNG, JPG, WEBP
                  </span>
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
              value={form.videoUrl || ""}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={fieldLabelClass}>Property Description</label>
            <textarea
              rows={3}
              placeholder="Describe architectural highlights, luxury finishes, views, security..."
              className={glassInputClass}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Actions */}
          <div className="sm:col-span-2 flex justify-end gap-3 pt-3 border-t border-border-light mt-2">
            <button type="button" onClick={onClose} className={cancelBtnClass}>
              Cancel
            </button>
            <button type="submit" className={saveBtnClass}>
              Save Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};