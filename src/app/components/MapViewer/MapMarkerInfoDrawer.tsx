"use client";

import { Box, Button, Drawer } from "@chakra-ui/react";
import { MarkerData } from "./MapViewerTypes";
import { Dispatch, SetStateAction } from "react";
import { deleteMrker } from "@/lib/markerRepository";

interface MapMarkerInfoDrwerProps {
  drawerOpen: boolean;
  selectedMarker: MarkerData | null;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setEditingMarkerId: Dispatch<SetStateAction<string | null>>;
  pickedRef: React.RefObject<{ x: number; y: number } | null>;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setAddOpen: Dispatch<SetStateAction<boolean>>;
  setMarkers: Dispatch<SetStateAction<MarkerData[]>>;
  setSelectedMarkerId: Dispatch<SetStateAction<string | null>>;
}

export default function MapMarkerInfoDrwer(props: MapMarkerInfoDrwerProps) {
  const { pickedRef } = props;
  return (
    <Drawer.Root
      open={props.drawerOpen}
      onOpenChange={(e) => props.setDrawerOpen(e.open)}
      size={"lg"}
    >
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Marker</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body className="markerDescriptor">
            {!props.selectedMarker ? (
              <Box opacity={0.7}>No marker selected</Box>
            ) : (
              <>
                <Box fontSize="sm" opacity={0.8}>
                  Coordinates: x={props.selectedMarker.x}, y=
                  {props.selectedMarker.y}
                </Box>

                <Box mt="3" fontWeight="700">
                  <h1>{props.selectedMarker.title}</h1>
                </Box>

                {props.selectedMarker.description ? (
                  <Box
                    mt="2"
                    // se description è HTML (wysiwyg), renderizzalo così:
                    dangerouslySetInnerHTML={{
                      __html: props.selectedMarker.description,
                    }}
                  />
                ) : (
                  <Box mt="2" opacity={0.7}>
                    No description
                  </Box>
                )}
              </>
            )}
          </Drawer.Body>

          <Drawer.Footer gap="2">
            <Button
              variant="ghost"
              onClick={() => {
                props.setDrawerOpen(false);
              }}
            >
              Close
            </Button>

            <Button
              onClick={() => {
                if (!props.selectedMarker) return;
                props.setEditingMarkerId(props.selectedMarker.id);
                // precompila il dialog come edit
                pickedRef.current = {
                  x: props.selectedMarker.x,
                  y: props.selectedMarker.y,
                };
                props.setTitle(props.selectedMarker.title);
                props.setDescription(props.selectedMarker.description ?? "");
                props.setAddOpen(true); // riuso MapMarkerDialog
              }}
              disabled={!props.selectedMarker}
            >
              Edit
            </Button>

            <Button
              variant="solid"
              onClick={() => {
                if (!props || !props.selectedMarker) return;

                deleteMrker(props!.selectedMarker!.id);

                props.setMarkers((prev) =>
                  prev.filter((m) => m.id !== props!.selectedMarker!.id)
                );
                props.setDrawerOpen(false);
                props.setSelectedMarkerId(null);
              }}
              disabled={!props.selectedMarker}
            >
              Delete
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
