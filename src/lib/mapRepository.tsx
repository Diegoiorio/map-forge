"use server";

import { supabaseClient } from "./supabaseClient";

const TABLE_NAME = "map_forge_maps";

export interface MapData {
  id: number;
  name: string;
  url: string;
  created_at: string;
}

// Save a new map to the database
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

// Retrieve all maps from the database
export async function getAllMaps(): Promise<MapData[] | null> {
  const { data, error } = await supabaseClient.from(TABLE_NAME).select("*");

  if (error) {
    console.error("Supabase read error:", error);
    return null;
  }

  return data;
}

// Retrieve a map from the database
export async function getMapById(id: number): Promise<MapData | null> {
  const { data, error } = await supabaseClient
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Supabase read error:", error);
    return null;
  }

  return data;
}

// Retrieve a map from the database
export async function deleteMapById(id: number): Promise<MapData | null> {
  const { data, error } = await supabaseClient
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase read error:", error);
    return null;
  }

  return data;
}
