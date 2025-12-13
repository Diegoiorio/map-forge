import { Box, Dialog, List, Portal } from "@chakra-ui/react";
import { useViewMode } from "../providers/ViewModeProvider";
import CloseButton from "./CloseButton";
import { useEffect, useRef } from "react";

export default function OpenMapPopup() {
  const { viewMode, resetViewMode } = useViewMode();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const dialogViewMode = "mapList";
  const title = "Your maps";

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

  const content = (
    <List.Root>
      <List.Item>Item 1</List.Item>
      <List.Item>Item 2</List.Item>
    </List.Root>
  );

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
              <Dialog.Body spaceY="4">{content}</Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}
