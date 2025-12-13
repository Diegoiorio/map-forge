import { getMapById } from "@/lib/mapRepository";

type MapPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MapPage({ params }: MapPageProps) {
  const { id } = await params;

  if (Number.isNaN(id)) return <div>Invalid map id.</div>;

  const map = await getMapById(Number(id));
  if (!map) return <div>Map not found.</div>;

  return (
    <div>
      <h1>Map ID: {id}</h1>
      <p>
        <b>Name:</b> {map.name}
      </p>
      <p>
        <b>URL:</b> {map.url}
      </p>
    </div>
  );
}
