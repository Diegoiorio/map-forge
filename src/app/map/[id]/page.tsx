import { getMapById } from "@/lib/mapRepository";
import MapImageViewer from "@/app/components/MapImageViewer";

type MapPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MapPage({ params }: MapPageProps) {
  const { id } = await params;

  if (Number.isNaN(id)) return <div>Invalid map id.</div>;

  const map = await getMapById(Number(id));
  if (!map) return <div>Map not found.</div>;

  return (
    <MapImageViewer mapId={map.id} imageUrl={map.url} imageName={map.name} />
  );
}
