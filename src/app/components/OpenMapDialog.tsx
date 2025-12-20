import { Box, Dialog, Flex, Icon, Link, List, Portal } from "@chakra-ui/react";
import { useViewMode } from "../providers/ViewModeProvider";
import CloseButton from "./CloseButton";
import { useEffect, useRef, useState } from "react";
import { getAllMaps } from "@/lib/mapRepository";
import SpinnerLoader from "./SpinnerLoader";
import { LuTrash } from "react-icons/lu";
import { MapItem } from "../types/MapItem";
import DeleteMapDialog from "./DeleteMapDialog";

export default function OpenMapPopup() {
  const { viewMode, resetViewMode } = useViewMode();
  const [mapList, setMapList] = useState<MapItem[]>([]);
  const [loadingMap, setLoadingMap] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [deletingMap, setDeletingMap] = useState<MapItem | false>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const dialogViewMode = "mapList";
  const title = "Your maps";

  // Fetch saved maps from the database
  const getSavedMaps = async () => {
    return await getAllMaps();
  };

  // Close dialog on click outside
  // Close dialog on click outside (but ignore nested alertdialog)
  useEffect(() => {
    if (viewMode !== dialogViewMode) return;

    const handleDocClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      // If the nested DeleteMapDialog (role="alertdialog") is open,
      // ignore clicks inside it (content/backdrop/etc.)
      if (deletingMap && target.closest('[role="alertdialog"]')) {
        return;
      }

      const el = contentRef.current;
      if (!el) return;

      // Click inside outer dialog -> do nothing
      if (el.contains(target)) return;

      // Real outside click -> close
      setDeletingMap(false);
      resetViewMode(dialogViewMode);
    };

    document.addEventListener("click", handleDocClick); // <-- no capture

    return () => {
      document.removeEventListener("click", handleDocClick);
    };
  }, [viewMode, resetViewMode, deletingMap]);

  // Fetch maps when dialog opens
  useEffect(() => {
    if (viewMode !== dialogViewMode) return;

    const load = async () => {
      setLoadingMap(true);
      const maps = await getSavedMaps();

      if (maps) {
        setMapList(maps);
        setMapLoaded(true);
      }
      setLoadingMap(false);
    };

    if (!mapLoaded) {
      load();
    }
  }, [mapLoaded, viewMode]);

  const content = () => {
    return loadingMap ? (
      <SpinnerLoader />
    ) : mapList.length === 0 ? (
      "No maps found."
    ) : (
      <Box>
        <List.Root as="ol" unstyled>
          {mapList.map((map, index) => {
            const isEvenRow = index % 2 === 1;

            return (
              <List.Item
                as="li"
                key={map.id}
                mb={2}
                px={4}
                py={1.5}
                bg={isEvenRow ? "gray.800" : "transparent"}
                borderRadius={5}
              >
                <Flex justify="space-between">
                  <Link
                    href={`/map/${map.id}`}
                    _hover={{ textDecoration: "none", opacity: 0.7 }}
                  >
                    {map.name}
                  </Link>

                  <Icon
                    size="sm"
                    mt={0.5}
                    _hover={{
                      textDecoration: "none",
                      opacity: 1,
                      color: "red",
                    }}
                    onClick={() => {
                      const mapToDelete: MapItem = {
                        id: map.id,
                        name: map.name,
                        url: map.url,
                      };

                      setDeletingMap(mapToDelete);
                      console.log(mapToDelete);
                    }}
                  >
                    <LuTrash />
                  </Icon>
                </Flex>
              </List.Item>
            );
          })}
        </List.Root>
      </Box>
    );
  };

  if (viewMode !== "mapList") return null;

  return (
    <div>
      <Dialog.Root open={viewMode === dialogViewMode}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content ref={contentRef}>
              <Box className="absolute right-0" m={4}>
                <CloseButton onClick={() => resetViewMode(dialogViewMode)} />
              </Box>

              {title && (
                <Dialog.Header>
                  <Dialog.Title fontSize={"1.5em"}>{title}</Dialog.Title>
                </Dialog.Header>
              )}
              <Dialog.Body spaceY="4">{content()}</Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {viewMode === dialogViewMode && deletingMap && (
        <DeleteMapDialog
          mapItem={deletingMap}
          setDeletingMap={setDeletingMap}
        />
      )}
    </div>
  );
}
