import { Box, Button, Dialog, Field, Input } from "@chakra-ui/react";
import TextEditor from "../TextEditor";

interface MapMarkerEditorDialogProps {
  addOpen: boolean;
  setAddOpen: (open: boolean) => void;
  pickedRef: React.MutableRefObject<{ x: number; y: number } | null>;
  onCreateMarker: () => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (desc: string) => void;
}

export default function MapMarkerDialog(props: MapMarkerEditorDialogProps) {
  return (
    <Dialog.Root
      size={"lg"}
      scrollBehavior="inside"
      open={props.addOpen}
      onOpenChange={(e) => props.setAddOpen(e.open)}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Add marker</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body spaceY="4">
            <Box fontSize="sm" opacity={0.8}>
              Position:{" "}
              {props.pickedRef.current
                ? `x=${props.pickedRef.current.x}, y=${props.pickedRef.current.y}`
                : "-"}
            </Box>

            <Field.Root required>
              <Field.Label>Title</Field.Label>
              <Input
                value={props.title}
                onChange={(e) => props.setTitle(e.target.value)}
                placeholder="e.g. Dungeon entrance"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Description</Field.Label>
              <TextEditor
                description={props.description}
                setDescription={props.setDescription}
              />
            </Field.Root>
          </Dialog.Body>

          <Dialog.Footer gap="2">
            <Button variant="ghost" onClick={() => props.setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={props.onCreateMarker}
              disabled={!props.title.trim()}
            >
              Save marker
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
