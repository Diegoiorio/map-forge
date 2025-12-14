"use client";

import { EditorProvider } from "react-simple-wysiwyg";
import MapImageViewer from "@/app/components/MapViewer/MapImageViewer";

type Props = {
  mapId: number;
  imageUrl: string;
  imageName: string;
};

export default function MapPageClient({ mapId, imageUrl, imageName }: Props) {
  return (
    <EditorProvider>
      <MapImageViewer mapId={mapId} imageUrl={imageUrl} imageName={imageName} />
    </EditorProvider>
  );
}
