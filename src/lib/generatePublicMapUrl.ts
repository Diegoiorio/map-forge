"use server";

import { supabaseCredential } from "@/lib/env";

export default async function generatePublicMapUrl(
  fileName: string
): Promise<string> {
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_MAP_BUCKET}/${fileName}`;
}
