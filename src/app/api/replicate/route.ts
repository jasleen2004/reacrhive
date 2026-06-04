import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const token = process.env.REPLICATE_API_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "REPLICATE_API_TOKEN not set" }, { status: 500 });
    }

    // Start the prediction
    const startRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "95fcc2a26d3899cd6c2691c900465aaeff466285d65c14638cc5f36f34befaf1",
        input: {
          image: imageBase64,
        },
      }),
    });

    if (!startRes.ok) {
      const err = await startRes.text();
      return NextResponse.json({ error: "Replicate start failed", details: err }, { status: 500 });
    }

    const prediction = await startRes.json();
    const predictionId = prediction.id;

    // Poll until complete (max 30 seconds)
    let output = null;
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 1000));

      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: { "Authorization": `Token ${token}` },
      });

      const pollData = await pollRes.json();

      if (pollData.status === "succeeded") {
        output = pollData.output;
        break;
      }

      if (pollData.status === "failed" || pollData.status === "canceled") {
        return NextResponse.json(
          { error: "Replicate prediction failed", details: pollData.error },
          { status: 500 }
        );
      }
    }

    if (!output) {
      return NextResponse.json({ error: "Replicate timed out" }, { status: 500 });
    }

    // Output is a URL — fetch and convert to base64 so it persists
    const imageResponse = await fetch(typeof output === "string" ? output : output[0]);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64Result = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64Result}`;

    return NextResponse.json({ imageUrl: dataUrl });
  } catch (err: any) {
    console.error("REPLICATE ERROR:", err);
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}