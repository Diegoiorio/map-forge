"use client";

import { Box, Button } from "@chakra-ui/react";
import SpinnerLoader from "../SpinnerLoader";
import { Props } from "./MapViewerTypes";
import MapNameLabel from "./MapNameLabel";
import MapMarkerDialog from "./MapMarkerEditorDialog";
import MapMarkerInfoDrwer from "./MapMarkerInfoDrawer";
import MapImageViewerContainer from "./MapImageViewerContainer";
import { useMapImageViewer } from "./useMapImageViewer";
import { getAllMarkerByMap } from "@/lib/markerRepository";
import downloadMapPdf from "@/lib/downloadMapPdf";
import DownloadButton from "./DownloadPdfButton";

export default function MapImageViewer({ mapId, imageUrl, imageName }: Props) {
  const vm = useMapImageViewer({ mapId, imageUrl });

  if (!vm.isReady) return <SpinnerLoader />;

  const { useMapEvents } = vm.rl!;

  return (
    <Box position="absolute" top={0} left={0} right={0}>
      <MapNameLabel imageName={imageName} />

      <DownloadButton
        getAllMarkerByMap={getAllMarkerByMap}
        mapId={mapId}
        imageUrl={imageUrl}
        imageName={imageName}
        downloadMapPdf={downloadMapPdf}
      />

      <MapImageViewerContainer
        leaflet={vm.leaflet!}
        bounds={vm.bounds!}
        imageUrl={imageUrl}
        dialogViewMode={true}
        enableAddOnClick={true}
        onPickPoint={vm.onPickPoint}
        useMapEvents={useMapEvents}
        markers={vm.markers}
        setSelectedMarkerId={vm.setSelectedMarkerId}
        setDrawerOpen={vm.setDrawerOpen}
      />

      <MapMarkerDialog
        addOpen={vm.addOpen}
        setAddOpen={vm.setAddOpen}
        pickedRef={vm.pickedRef}
        onCreateMarker={vm.onSaveMarker}
        title={vm.title}
        setTitle={vm.setTitle}
        description={vm.description}
        setDescription={vm.setDescription}
        isEditing={!!vm.editingMarkerId}
      />

      <MapMarkerInfoDrwer
        drawerOpen={vm.drawerOpen}
        selectedMarker={vm.selectedMarker}
        setDrawerOpen={vm.setDrawerOpen}
        setEditingMarkerId={vm.setEditingMarkerId}
        pickedRef={vm.pickedRef}
        setTitle={vm.setTitle}
        setDescription={vm.setDescription}
        setAddOpen={vm.setAddOpen}
        setMarkers={vm.setMarkers}
        setSelectedMarkerId={vm.setSelectedMarkerId}
      />
    </Box>
  );
}
