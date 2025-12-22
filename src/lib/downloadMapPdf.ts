import { MarkerData } from "@/app/components/MapViewer/MapViewerTypes";

export default async function downloadMapPdf(payload: {
  imageUrl: string;
  imageName: string;
  markers: MarkerData[];
}) {
  console.log(payload);
  const res = await fetch("/api/maps/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("PDF Generation failed");

  // Create blob for file and associate it to url
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  // Create a link to download and simulate a click on it
  const a = document.createElement("a");
  a.href = url;
  a.download = `${payload.imageName}.pdf`;
  a.click();

  URL.revokeObjectURL(url);
}
