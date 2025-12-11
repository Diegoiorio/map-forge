"use server";

import { supabaseClient } from "./supabaseClient";

const TABLE_NAME = "map_forge_maps";

// [TODO] Define proper types for map data
export async function saveMap(mapName: string, mapUurl: string) {
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
