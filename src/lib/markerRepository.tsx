"use server";

import { MapData } from "./mapRepository";
import { supabaseClient } from "./supabaseClient";

const TABLE_NAME = "map_forge_markers";

type Operation = "create" | "edit";

type SaveMarkerArgs = {
  id: string;
  map_id?: number;
  x?: number;
  y?: number;
  title: string;
  description?: string;
  operation?: Operation; // default: "create"
};

// Save or update a marker (create/edit)
export async function saveOrUpdateMarker({
  id,
  map_id,
  x,
  y,
  title,
  description,
  operation = "create",
}: SaveMarkerArgs): Promise<MapData[] | null> {
  const query =
    operation === "create" // create new marker
      ? supabaseClient
          .from(TABLE_NAME)
          .insert([
            {
              id,
              map_id,
              x,
              y,
              title,
              description,
            },
          ])
          .select()
      : supabaseClient // edit existing marker
          .from(TABLE_NAME)
          .update({
            title,
            description,
          })
          .eq("id", id)
          .select();

  const { data, error } = await query;

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
