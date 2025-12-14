// Component to handle map clicks for adding markers
export default function AddMarkerClickHandler({
  enabled,
  onPick,
  useMapEvents,
}: {
  enabled: boolean;
  onPick: (x: number, y: number) => void;
  useMapEvents: typeof import("react-leaflet").useMapEvents;
}) {
  useMapEvents({
    click(e) {
      if (!enabled) return;

      // In CRS.Simple, Leaflet uses [lat, lng] but they are just [y, x]
      const y = Math.round(e.latlng.lat);
      const x = Math.round(e.latlng.lng);
      onPick(x, y);
    },
  });

  return null;
}
