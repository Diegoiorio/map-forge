"use server";

import { supabaseClient } from "./supabaseClient";
import type { FileObject } from "@supabase/storage-js";

interface DeleteResponse {
  data: FileObject[] | null;
  error: { message: string } | null;
}

export default async function deleteImage(
  fileName: string | null
): Promise<DeleteResponse> {
  if (!fileName || !fileName.trim()) {
    return { data: null, error: { message: "Missing fileName." } };
  }

  // ripulisci querystring / hash / slash iniziali
  const clean = fileName.split("?")[0].split("#")[0].replace(/^\/+/, "");

  const filePath = clean.startsWith("maps/") ? clean : `maps/${clean}`;

  const { data, error } = await supabaseClient.storage
    .from("map-forge")
    .remove([filePath]);

  if (error) {
    return { data: null, error: { message: error.message } };
  }

  // se data è vuota, NON ha cancellato nulla (path sbagliato o file inesistente)
  if (!data || data.length === 0) {
    return {
      data: [],
      error: {
        message: `Nothing deleted. File not found at path: ${filePath}`,
      },
    };
  }

  return { data, error: null };
}
