// Component to handle map clicks for adding markers
type AddMarkerClickHandlerProps = {
  enabled: boolean;
  onPick: (x: number, y: number) => void;
  useMapEvents: typeof import("react-leaflet").useMapEvents;
};

export default function AddMarkerClickHandler(
  props: AddMarkerClickHandlerProps
) {
  props.useMapEvents({
    click(e) {
      if (!props.enabled) return;

      // In CRS.Simple, Leaflet uses [lat, lng] but they are just [y, x]
      const y = Math.round(e.latlng.lat);
      const x = Math.round(e.latlng.lng);
      props.onPick(x, y);
    },
  });

  return null;
}
