import mapContentToHtml from "@/lib/HtmlGenerator/mapContentToHtml";
import { htmlToPdfBuffer } from "@/lib/htmlToPdfBuffer";
import { NextResponse } from "next/server";

// IMPORTANT: puppeteer needs Node runtime
export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();

  const html = mapContentToHtml(body);

  const pdfBuffer = await htmlToPdfBuffer(html);

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(pdfBuffer.length),
      "Content-Disposition": `inline; filename="${encodeURIComponent(
        (body?.imageName ?? "map") + ".pdf"
      )}"`,
    },
  });
}
