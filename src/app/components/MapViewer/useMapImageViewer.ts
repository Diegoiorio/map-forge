"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LatLngBoundsExpression } from "leaflet";
import type { MarkerData, LeafletDefaultIconProto } from "./MapViewerTypes";
import { getAllMarkerByMap, saveOrUpdateMarker } from "@/lib/markerRepository";

type LeafletModule = typeof import("leaflet");
type ReactLeafletModule = typeof import("react-leaflet");

type Args = {
  mapId: number;
  imageUrl: string;
};

export function useMapImageViewer({ mapId, imageUrl }: Args) {
  // Dynamically-loaded Leaflet module (loaded only in the browser to avoid SSR "window is not defined")
  const [leaflet, setLeaflet] = useState<LeafletModule | null>(null);

  // Dynamically-loaded react-leaflet module (MapContainer, Marker, hooks, etc.)
  const [rl, setRl] = useState<ReactLeafletModule | null>(null);

  // Natural image size (width/height in pixels) used to build Leaflet bounds that match the image coordinate system
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);

  // All markers currently displayed on the map (typically loaded from DB and updated when adding/editing/removing)
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Whether the "Add/Edit marker" dialog is open
  const [addOpen, setAddOpen] = useState(false);

  // Temporary picked point on the map (x,y in image pixels) where the next marker will be created/edited
  // useRef because we want to store it without forcing re-renders
  const pickedRef = useRef<{ x: number; y: number } | null>(null);

  // Marker title being edited in the dialog (used for both create and edit)
  const [title, setTitle] = useState("");

  // Marker description/content being edited in the dialog (rich text string / HTML)
  const [description, setDescription] = useState("");

  // Whether the marker info drawer is open (the drawer that shows details/actions for a selected marker)
  const [drawerOpen, setDrawerOpen] = useState(false);

  // The id of the marker currently selected (e.g., the marker the user clicked on to open the drawer)
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  // If not null, we are editing an existing marker with this id (instead of creating a new one)
  const [editingMarkerId, setEditingMarkerId] = useState<string | null>(null);

  /**
   * Loads Leaflet + react-leaflet dynamically (client only), then fixes default marker icons for Next.js.
   * This prevents SSR crashes and avoids broken marker images.
   */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [Lmod, RLmod] = await Promise.all([
        import("leaflet"),
        import("react-leaflet"),
      ]);

      if (cancelled) return;

      // Fix default Leaflet marker icons in Next (Leaflet expects assets via relative URLs)
      const proto = Lmod.Icon.Default
        .prototype as unknown as LeafletDefaultIconProto;
      delete proto._getIconUrl;

      Lmod.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });

      setLeaflet(Lmod);
      setRl(RLmod);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * Computes the marker object that matches the currently selected marker id.
   * Useful for showing details in the drawer.
   */
  const selectedMarker = useMemo(() => {
    return markers.find((m) => m.id === selectedMarkerId) ?? null;
  }, [markers, selectedMarkerId]);

  /**
   * Loads the image in the browser to read its natural width/height (pixels).
   * We use those dimensions to create Leaflet bounds matching the image coordinate system.
   */
  useEffect(() => {
    let cancelled = false;

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => {
      if (cancelled) return;
      // Fallback size if the image fails to load
      setImgSize({ w: 2000, h: 2000 });
    };
    img.src = imageUrl;

    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  /**
   * Loads markers for the given map id.
   * Currently this is a placeholder; replace with your DB/API call.
   */
  useEffect(() => {
    let cancelled = false;

    // Load all markers for the current map.
    // The `cancelled` flag prevents state updates if the component unmounts
    // or if `mapId` changes before the async operation completes,
    // avoiding race conditions and React state update warnings.
    (async () => {
      const allMarkers: MarkerData[] = await getAllMarkerByMap(mapId);

      if (cancelled) return;

      setMarkers(allMarkers);
    })();

    // Cleanup: mark the effect as cancelled so pending async calls
    // won't try to update state after unmount or dependency change.
    return () => {
      cancelled = true;
    };
  }, [mapId]);

  /**
   * Computes Leaflet bounds for CRS.Simple from the image pixel dimensions.
   * Bounds are [[y0,x0],[y1,x1]] -> [[0,0],[height,width]].
   */
  const bounds: LatLngBoundsExpression | null = useMemo(() => {
    if (!imgSize) return null;
    return [
      [0, 0],
      [imgSize.h, imgSize.w],
    ];
  }, [imgSize]);

  /**
   * Handles a click on the map: prepares the dialog to create a new marker at the clicked point.
   * Clears edit mode and resets form fields.
   */
  const onPickPoint = (x: number, y: number) => {
    setEditingMarkerId(null);
    pickedRef.current = { x, y };
    setTitle("");
    setDescription("");
    setAddOpen(true);
  };

  /**
   * Saves the marker currently in the dialog.
   * - If editingMarkerId is set -> updates existing marker
   * - Otherwise -> creates a new marker using pickedRef coords
   */
  const onSaveMarker = () => {
    const picked = pickedRef.current;
    if (!picked) return;
    if (!title.trim()) return;

    // EDIT mode
    if (editingMarkerId) {
      setMarkers((prev) =>
        prev.map((m) =>
          m.id === editingMarkerId
            ? {
                ...m,
                title: title.trim(),
                description: description.trim() || undefined,
              }
            : m
        )
      );

      setAddOpen(false);
      setEditingMarkerId(null);
      pickedRef.current = null;

      mapId = mapId;
      saveOrUpdateMarker({
        id: editingMarkerId,
        title: title.trim(),
        description: description.trim() || undefined,
        operation: "edit",
      });
      console.log(markers);

      return;
    }

    // CREATE mode
    const newMarker: MarkerData = {
      id: crypto.randomUUID(),
      x: picked.x,
      y: picked.y,
      title: title.trim(),
      description: description.trim() || undefined,
    };

    setMarkers((prev) => [...prev, newMarker]);
    setAddOpen(false);

    saveOrUpdateMarker({
      id: newMarker.id,
      map_id: mapId,
      x: newMarker.x,
      y: newMarker.y,
      title: newMarker.title,
      description: newMarker.description,
    });

    pickedRef.current = null;
  };

  /**
   * True when both Leaflet modules are loaded and bounds are available.
   * Useful to decide when to render the map vs showing a loader.
   */
  const isReady = !!leaflet && !!rl && !!bounds;

  return {
    // readiness + libs
    isReady,
    leaflet,
    rl,

    // map sizing
    imgSize,
    bounds,

    // marker data
    markers,
    setMarkers,

    // selection/drawer
    drawerOpen,
    setDrawerOpen,
    selectedMarkerId,
    setSelectedMarkerId,
    selectedMarker,

    // dialog/editor
    addOpen,
    setAddOpen,
    pickedRef,
    title,
    setTitle,
    description,
    setDescription,
    editingMarkerId,
    setEditingMarkerId,

    // actions
    onPickPoint,
    onSaveMarker,
  };
}
