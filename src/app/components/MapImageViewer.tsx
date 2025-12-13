"use client";

import { Box, Button, Dialog, Field, Input, Textarea } from "@chakra-ui/react";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";
import L, { LatLngBoundsExpression } from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";

// Optional: fix default Leaflet marker icons in bundlers (Next)
// If your markers appear as broken images, uncomment and ensure these paths resolve.
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x.src,
//   iconUrl: markerIcon.src,
//   shadowUrl: markerShadow.src,
// });

type MarkerData = {
  id: string;
  x: number; // pixel X on the original image
  y: number; // pixel Y on the original image
  title: string;
  description?: string;
};

type Props = {
  mapId: number;
  imageUrl: string;
};

function ClickToAddMarker({
  enabled,
  onPick,
}: {
  enabled: boolean;
  onPick: (x: number, y: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (!enabled) return;

      // In CRS.Simple, Leaflet uses [lat, lng] but they are just [y, x]
      const y = Math.round(e.latlng.lat);
      const x = Math.round(e.latlng.lng);
      onPick(x, y);
    },
  });

  return null;
}

export default function MapImageViewer({ mapId, imageUrl }: Props) {
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);

  // Markers state (replace with your DB fetch/save)
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Add-marker dialog state
  const [addOpen, setAddOpen] = useState(false);
  const pickedRef = useRef<{ x: number; y: number } | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dialogViewMode = true; // you can connect this to your ViewModeProvider if you want
  const enableAddOnClick = true; // you can add a toggle button if you want

  // Load image natural size (so bounds match pixels)
  useEffect(() => {
    let cancelled = false;

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => {
      if (cancelled) return;
      // fallback if image fails to load
      setImgSize({ w: 2000, h: 2000 });
    };
    img.src = imageUrl;

    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  // Example: fetch markers for this map (replace with your API/DB)
  useEffect(() => {
    // TODO: load markers by mapId
    // fetch(`/api/maps/${mapId}/markers`) ...
    setMarkers([]); // start empty for now
  }, [mapId]);

  const bounds: LatLngBoundsExpression | null = useMemo(() => {
    if (!imgSize) return null;
    // [[y0, x0], [y1, x1]] == [[0,0],[height,width]]
    return [
      [0, 0],
      [imgSize.h, imgSize.w],
    ];
  }, [imgSize]);

  const onPickPoint = (x: number, y: number) => {
    pickedRef.current = { x, y };
    setTitle("");
    setDescription("");
    setAddOpen(true);
  };

  const onCreateMarker = () => {
    const picked = pickedRef.current;
    if (!picked) return;
    if (!title.trim()) return;

    const newMarker: MarkerData = {
      id: crypto.randomUUID(),
      x: picked.x,
      y: picked.y,
      title: title.trim(),
      description: description.trim() || undefined,
    };

    setMarkers((prev) => [...prev, newMarker]);

    // TODO: persist to DB with mapId
    // await fetch("/api/markers", { method: "POST", body: JSON.stringify({ mapId, ...newMarker }) })

    setAddOpen(false);
    pickedRef.current = null;
  };

  if (!bounds) {
    return <Box p="4">Loading map...</Box>;
  }

  return (
    <Box>
      <Box fontSize="sm" opacity={0.8} mb="2">
        Map #{mapId} — click to add marker
      </Box>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" h="70vh">
        <MapContainer
          crs={L.CRS.Simple}
          bounds={bounds}
          // Fit image into viewport
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          minZoom={-2}
          maxZoom={4}
          // Prevent panning infinitely far away
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
        >
          <ZoomControl position="bottomright" />

          <ImageOverlay url={imageUrl} bounds={bounds} />

          <ClickToAddMarker
            enabled={dialogViewMode && enableAddOnClick}
            onPick={onPickPoint}
          />

          {markers.map((m) => (
            <Marker key={m.id} position={[m.y, m.x]}>
              <Popup>
                <Box fontWeight="600">{m.title}</Box>
                {m.description ? <Box mt="2">{m.description}</Box> : null}
                <Box mt="2" fontSize="xs" opacity={0.7}>
                  x: {m.x}, y: {m.y}
                </Box>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>

      {/* Add Marker Dialog */}
      <Dialog.Root open={addOpen} onOpenChange={(e) => setAddOpen(e.open)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add marker</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body spaceY="4">
              <Box fontSize="sm" opacity={0.8}>
                Position:{" "}
                {pickedRef.current
                  ? `x=${pickedRef.current.x}, y=${pickedRef.current.y}`
                  : "-"}
              </Box>

              <Field.Root required>
                <Field.Label>Title</Field.Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dungeon entrance"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional notes..."
                />
              </Field.Root>
            </Dialog.Body>

            <Dialog.Footer gap="2">
              <Button variant="ghost" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={onCreateMarker} disabled={!title.trim()}>
                Save marker
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Box>
  );
}
