"use client";

import { Button } from "@chakra-ui/react";
import { MarkerData } from "./MapViewerTypes";
import { useState } from "react";
import SpinnerLoader from "../SpinnerLoader";

export default function DownloadButton(props: {
  getAllMarkerByMap(mapId: number): Promise<MarkerData[]>;
  mapId: number;
  imageUrl: string;
  imageName: string;
  downloadMapPdf(payload: {
    imageUrl: string;
    imageName: string;
    markers: MarkerData[];
  }): Promise<void>;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Button
      fontSize="sm"
      fontWeight={"bold"}
      position={"absolute"}
      top={5}
      right={10}
      zIndex={1000}
      maxH={"23px"}
      backgroundColor="white"
      borderRadius={"lg"}
      border={"1px solid white"}
      color={"back"}
      cursor={"pointer"}
      boxShadow="0 2px 8px rgba(0,0,0,0.30)"
      onClick={async () => {
        try {
          setLoading(true);

          const markers = await props.getAllMarkerByMap(props.mapId);

          await props.downloadMapPdf({
            imageUrl: props.imageUrl,
            imageName: props.imageName,
            markers,
          });
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }}
    >
      Download pdf
      {loading && <SpinnerLoader size="sm" />}
    </Button>
  );
}
