export async function uploadImageToCloudflare(
  file: File, 
  folder: "properties" | "agents" | "testimonials" | "blogs" = "properties"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const endpoint = import.meta.env.VITE_CLOUDFLARE_WORKER_URL;

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to upload image to Cloudflare");
  }

  const data = await response.json();
  return data.url as string;
}