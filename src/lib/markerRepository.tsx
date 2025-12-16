"use server";

import { MapData } from "./mapRepository";
import { supabaseClient } from "./supabaseClient";

const TABLE_NAME = "map_forge_markers";

// Save a new marker to the database
export async function saveMrker(
  id: string,
  map_id: number,
  x: number,
  y: number,
  title: string,
  description?: string
): Promise<MapData[] | null> {
  const { data, error } = await supabaseClient
    .from(TABLE_NAME)
    .insert([
      {
        id: id,
        map_id: map_id,
        x: x,
        y: y,
        title: title,
        description: description,
      },
    ])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    return null;
  }

  return data;
}

// Delete a marker
export async function deleteMrker(id: string): Promise<MapData[] | null> {
  const { data, error } = await supabaseClient
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase insert error:", error);
    return null;
  }

  return data;
}
