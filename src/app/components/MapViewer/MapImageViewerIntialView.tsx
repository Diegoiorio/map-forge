import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function SetInitialView({
  bounds,
  extraZoom = 1,
}: {
  bounds: L.LatLngBoundsExpression;
  extraZoom?: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds, { padding: [20, 20] });
    map.setZoom(map.getZoom() + extraZoom);
  }, [map, bounds, extraZoom]);

  return null;
}
