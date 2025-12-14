// Props for MapImageViewer component
export type Props = {
  mapId: number;
  imageUrl: string;
  imageName: string;
};

// Marker data structure
export type MarkerData = {
  id: string;
  x: number;
  y: number;
  title: string;
  description?: string;
};

// Used to remove Leaflet internal marker url resolver without "any"
export type LeafletDefaultIconProto = {
  _getIconUrl?: unknown;
};
