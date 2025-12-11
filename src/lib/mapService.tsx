"use server";

import { supabaseClient } from "./supabaseClient";

const TABLE_NAME = "map_forge_maps";

interface MapData {
  id: number;
  name: string;
  url: string;
  created_at: string;
}

export async function saveMap(
  mapName: string,
  mapUurl: string
): Promise<MapData[] | null> {
  const { data, error } = await supabaseClient
    .from(TABLE_NAME)
    .insert([{ name: mapName, url: mapUurl }])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    return null;
  }

  return data;
}
