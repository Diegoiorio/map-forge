import { supabaseClient } from "./supabaseClient";

interface UploadResponse {
  data: { path: string } | null;
  error: { message: string } | null;
}

export default async function uploadImage(file: File): Promise<UploadResponse> {
  // e.g. save into a "maps/" folder, keep original filename
  const filePath = `maps/${crypto.randomUUID()}-${file.name}`;

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
