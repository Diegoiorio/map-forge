"use client";

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { MapItem } from "../types/MapItem";
import { Dispatch, SetStateAction, useState } from "react";
import deleteMap from "@/lib/deleteMap";
import { useRouter } from "next/navigation";

export default function DeleteMapDialog(props: {
  mapItem: MapItem | false;
  setDeletingMap: Dispatch<SetStateAction<false | MapItem>>;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

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
                loading={isDeleting}
                onClick={async () => {
                  if (!props.mapItem) return;

                  setIsDeleting(true);

                  const res = await deleteMap(props.mapItem);

                  props.setDeletingMap(false);
                  setIsDeleting(false);

                  // Go to home and shows result message
                  router.push(`/?deletedMap=${res.ok ? "1" : "0"}`);
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
