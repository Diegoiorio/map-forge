import { NextRequest, NextResponse } from "next/server";
import uploadImage from "@/lib/uploadImage";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const result = await uploadImage(file);

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    // Success
    return NextResponse.json(
      {
        message: "File uploaded successfully",
        path: result.data?.path,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected upload error:", error);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
