import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { MapItem } from "../types/MapItem";
import { Dispatch, SetStateAction } from "react";
import deleteMap from "@/lib/deleteMap";

export default function DeleteMapDialog(props: {
  mapItem: MapItem | false;
  setDeletingMap: Dispatch<SetStateAction<false | MapItem>>;
}) {
  return (
    <Dialog.Root open={true} role="alertdialog">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                This action cannot be undone. This will permanently delete and
                remove your data from our systems.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => props.setDeletingMap(false)}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="red"
                onClick={() => {
                  console.log("Click Delete");
                  if (props.mapItem) {
                    deleteMap(props.mapItem);
                  }
                  props.setDeletingMap(false);
                }}
              >
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
