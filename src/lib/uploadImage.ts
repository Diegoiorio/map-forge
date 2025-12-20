import { supabaseClient } from "./supabaseClient";

interface UploadResponse {
  data: { path: string } | null;
  error: { message: string } | null;
}

function sanitizeFileName(name: string): string {
  return name
    .normalize("NFD") // rimuoves accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/[^a-zA-Z0-9._-]/g, "") // only safe characters
    .toLowerCase();
}

export default async function uploadImage(file: File): Promise<UploadResponse> {
  // e.g. save into a "maps/" folder, keep original filename
  const safeName = sanitizeFileName(file.name);
  const filePath = `maps/${crypto.randomUUID()}-${safeName}`;

  const uploadResponse: UploadResponse = await supabaseClient.storage
    .from("map-forge")
    .upload(filePath, file, {
      upsert: true, // Overwrite
    });
  if (uploadResponse.error) {
    // Handle error
    console.error("Upload error:", uploadResponse.error.message);
    return {
      data: null,
      error: { message: uploadResponse.error.message },
    };
  }

  return {
    data: { path: filePath },
    error: null,
  };
}
