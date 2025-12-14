// Marker data type
export type MarkerData = {
  id: string;
  x: number; // pixel X on the original image
  y: number; // pixel Y on the original image
  title: string;
  description?: string;
};

// Props for MapImageViewer
export type Props = {
  mapId: number;
  imageUrl: string;
  imageName: string;
};
