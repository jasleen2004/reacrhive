import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Extract mime type and raw base64 from data URL
    // Format: data:image/jpeg;base64,/9j/4AAQ...
    const matches = imageBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!matches) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }

    const mimeType = matches[1]; // e.g. image/jpeg
    const base64Data = matches[2]; // raw base64 only

    // Convert base64 to binary buffer
    const binaryBuffer = Buffer.from(base64Data, "base64");

    // Build multipart form with actual binary image blob
    const formData = new FormData();
    const blob = new Blob([binaryBuffer], { type: mimeType });
    formData.append("image_file", blob, "image.png");
    formData.append("size", "auto");
    formData.append("bg_color", "ffffff");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVEBG_API_KEY || "",
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Remove.bg error:", err);
      return NextResponse.json(
        { error: "Background removal failed", details: err },
        { status: 500 }
      );
    }

    // Response is raw PNG bytes — convert to base64 data URL
    const arrayBuffer = await response.arrayBuffer();
    const base64Result = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64Result}`;

    return NextResponse.json({ imageUrl: dataUrl });
  } catch (err: any) {
    console.error("REMOVEBG ERROR:", err);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}