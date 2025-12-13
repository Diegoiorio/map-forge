import { Box, Dialog, Link, List, Portal } from "@chakra-ui/react";
import { useViewMode } from "../providers/ViewModeProvider";
import CloseButton from "./CloseButton";
import { useEffect, useRef, useState } from "react";
import { getAllMaps } from "@/lib/mapRepository";

type MapItem = {
  id: number;
  name: string;
  url: string;
};

export default function OpenMapPopup() {
  const { viewMode, resetViewMode } = useViewMode();
  const [mapList, setMapList] = useState<MapItem[]>([]);
  const [loadingMap, setLoadingMap] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const dialogViewMode = "mapList";
  const title = "Your maps";

  // Fetch saved maps from the database
  const getSavedMaps = async () => {
    return await getAllMaps();
  };

  // Close dialog on click outside
  useEffect(() => {
    if (viewMode !== dialogViewMode) return;

    const handlePointerDown = (event: PointerEvent) => {
      const el = boxRef.current;
      if (!el) return;

      // Handle click outside
      if (!el.contains(event.target as Node)) {
        resetViewMode(dialogViewMode);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [viewMode, resetViewMode]);

  // Fetch maps when dialog opens
  useEffect(() => {
    if (viewMode !== dialogViewMode) return;

    const load = async () => {
      setLoadingMap(true);
      const maps = await getSavedMaps();

      if (maps) {
        setMapList(maps);
      }
      setLoadingMap(false);
    };

    load();
  }, [viewMode]);

  const content = () => {
    return loadingMap ? (
      "Loading maps..."
    ) : mapList.length === 0 ? (
      "No maps found."
    ) : (
      <Box>
        <List.Root as="ol" unstyled>
          {mapList.map((map) => (
            <List.Item
              as="li"
              key={map.id}
              mb={2}
              _hover={{ textDecoration: "none", opacity: 0.7 }}
            >
              <Link href="./">{map.name}</Link>
            </List.Item>
          ))}
        </List.Root>
      </Box>
    );
  };

  if (viewMode !== "mapList") return null;

  return (
    <div ref={boxRef}>
      <Dialog.Root open={viewMode === dialogViewMode}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Box className="absolute right-0" m={4}>
                <CloseButton onClick={() => resetViewMode(dialogViewMode)} />
              </Box>

              {title && (
                <Dialog.Header>
                  <Dialog.Title>{title}</Dialog.Title>
                </Dialog.Header>
              )}
              <Dialog.Body spaceY="4">{content()}</Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}
