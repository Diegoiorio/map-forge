import deleteImage from "./deleteImage";
import { getFileNameFromUrl } from "./mapIdGetterFromUrl";
import { deleteMapById } from "./mapRepository";
import { deleteAllMapMrker } from "./markerRepository";
import { MapItem } from "@/app/types/MapItem";

type DeleteMapResult =
  | { ok: true }
  | { ok: false; step: "markers" | "map" | "image" | "input"; error: string };

export default async function deleteMap(
  map: MapItem
): Promise<DeleteMapResult> {
  if (!map?.id) {
    return { ok: false, step: "input", error: "Missing map.id" };
  }

  // 1) Delete markers
  const markersDeleted = await deleteAllMapMrker(map.id);

  if (markersDeleted !== null) {
    return { ok: false, step: "markers", error: "Failed to delete markers." };
  }

  // 2) Delete map row
  const mapDeleted = await deleteMapById(map.id);
  if (mapDeleted !== null) {
    return { ok: false, step: "map", error: "Failed to delete map row." };
  }

  // 3) Delete image from storage (best-effort)
  // deleteImage expects "uuid-name.ext". So here we should extract the full filename instead.
  // If you keep getMapIdFromSupabaseUrl as-is, you'll need a different extractor.
  const fileName = getFileNameFromUrl(map.url);

  if (!fileName) {
    return {
      ok: false,
      step: "image",
      error: "Could not extract file name from map.url.",
    };
  }

  const imgRes = await deleteImage(fileName);
  if (imgRes.error) {
    return { ok: false, step: "image", error: imgRes.error.message };
  }

  return { ok: true };
}
