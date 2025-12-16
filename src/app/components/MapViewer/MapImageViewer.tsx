"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import SpinnerLoader from "../SpinnerLoader";
import { MarkerData, Props, LeafletDefaultIconProto } from "./MapViewerTypes";
import SetInitialView from "./MapImageViewerIntialView";
import AddMarkerClickHandler from "./AddMarkerClickHandler";
import MapNameLabel from "./MapNameLabel";

import type { LatLngBoundsExpression, LatLngExpression } from "leaflet";

import MapMarkerDialog from "./MapMarkerEditorDialog";
import MapMarkerInfoDrwer from "./MapMarkerInfoDrawer";

type LeafletModule = typeof import("leaflet");
type ReactLeafletModule = typeof import("react-leaflet");

export default function MapImageViewer({ mapId, imageUrl, imageName }: Props) {
  const [leaflet, setLeaflet] = useState<LeafletModule | null>(null);
  const [rl, setRl] = useState<ReactLeafletModule | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [Lmod, RLmod] = await Promise.all([
        import("leaflet"),
        import("react-leaflet"),
      ]);

      if (cancelled) return;

      // Fix default Leaflet marker icons in Next
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

  // Image natural size
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);

  // Markers state
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Add-marker dialog state
  const [addOpen, setAddOpen] = useState(false);
  const pickedRef = useRef<{ x: number; y: number } | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const [editingMarkerId, setEditingMarkerId] = useState<string | null>(null);

  const dialogViewMode = true;
  const enableAddOnClick = true;

  const selectedMarker = useMemo(() => {
    return markers.find((m) => m.id === selectedMarkerId) ?? null;
  }, [markers, selectedMarkerId]);

  // Load image natural size
  useEffect(() => {
    let cancelled = false;

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => {
      if (cancelled) return;
      setImgSize({ w: 2000, h: 2000 });
    };
    img.src = imageUrl;

    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  useEffect(() => {
    // TODO: load markers by mapId
    setMarkers([]);
  }, [mapId]);

  // Strongly typed bounds for Leaflet
  const bounds: LatLngBoundsExpression | null = useMemo(() => {
    if (!imgSize) return null;
    return [
      [0, 0],
      [imgSize.h, imgSize.w],
    ];
  }, [imgSize]);

  const onPickPoint = (x: number, y: number) => {
    setEditingMarkerId(null);
    pickedRef.current = { x, y };
    setTitle("");
    setDescription("");
    setAddOpen(true);
  };

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
    pickedRef.current = null;
  };

  if (!leaflet || !rl || !bounds) return <SpinnerLoader />;

  const { MapContainer, ImageOverlay, Marker, ZoomControl, useMapEvents } = rl;

  return (
    <Box position="absolute" top={0} left={0} right={0}>
      <MapNameLabel imageName={imageName} />

      <Box overflow="hidden" h="100vh" w="100vw">
        <MapContainer
          crs={leaflet.CRS.Simple}
          bounds={bounds}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          minZoom={-2}
          maxZoom={4}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
        >
          <SetInitialView bounds={bounds} extraZoom={0.5} />

          <ZoomControl position="bottomright" />

          <ImageOverlay url={imageUrl} bounds={bounds} />

          <AddMarkerClickHandler
            enabled={dialogViewMode && enableAddOnClick}
            onPick={onPickPoint}
            useMapEvents={useMapEvents}
          />

          {markers.map((m) => {
            const pos: LatLngExpression = [m.y, m.x];

            return (
              <Marker
                key={m.id}
                position={pos}
                eventHandlers={{
                  click: () => {
                    setSelectedMarkerId(m.id);
                    setDrawerOpen(true);
                  },
                }}
              />
            );
          })}
        </MapContainer>
      </Box>

      <MapMarkerDialog
        addOpen={addOpen}
        setAddOpen={setAddOpen}
        pickedRef={pickedRef}
        onCreateMarker={onSaveMarker}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        isEditing={!!editingMarkerId}
      />

      <MapMarkerInfoDrwer
        drawerOpen={drawerOpen}
        selectedMarker={selectedMarker}
        setDrawerOpen={setDrawerOpen}
        setEditingMarkerId={setEditingMarkerId}
        pickedRef={pickedRef}
        setTitle={setTitle}
        setDescription={setDescription}
        setAddOpen={setAddOpen}
        setMarkers={setMarkers}
        setSelectedMarkerId={setSelectedMarkerId}
      />
    </Box>
  );
}
