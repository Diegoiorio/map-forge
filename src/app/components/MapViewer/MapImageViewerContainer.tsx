"use client";

import { ImageOverlay, MapContainer, ZoomControl, Marker } from "react-leaflet";
import type { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import SetInitialView from "./MapImageViewerIntialView";
import AddMarkerClickHandler from "./AddMarkerClickHandler";
import { MarkerData } from "./MapViewerTypes";
import { Box } from "@chakra-ui/react";

export interface MapImageViewerContainerProps {
  leaflet: typeof import("leaflet");
  bounds: LatLngBoundsExpression;
  imageUrl: string;
  dialogViewMode: boolean;
  enableAddOnClick: boolean;
  onPickPoint: (x: number, y: number) => void;
  useMapEvents: typeof import("react-leaflet").useMapEvents;
  markers: MarkerData[];
  setSelectedMarkerId: React.Dispatch<React.SetStateAction<string | null>>;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MapImageViewerContainer(
  props: MapImageViewerContainerProps
) {
  return (
    <Box overflow="hidden" h="100vh" w="100vw">
      <MapContainer
        crs={props.leaflet.CRS.Simple}
        bounds={props.bounds}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        minZoom={-2}
        maxZoom={4}
        maxBounds={props.bounds}
        maxBoundsViscosity={1.0}
      >
        <SetInitialView bounds={props.bounds} extraZoom={0.5} />

        <ZoomControl position="bottomright" />

        <ImageOverlay url={props.imageUrl} bounds={props.bounds} />

        <AddMarkerClickHandler
          enabled={props.dialogViewMode && props.enableAddOnClick}
          onPick={props.onPickPoint}
          useMapEvents={props.useMapEvents}
        />

        {props.markers.map((m) => {
          const pos: LatLngExpression = [m.y, m.x];

          return (
            <Marker
              key={m.id}
              position={pos}
              eventHandlers={{
                click: () => {
                  props.setSelectedMarkerId(m.id);
                  props.setDrawerOpen(true);
                },
              }}
            />
          );
        })}
      </MapContainer>
    </Box>
  );
}
