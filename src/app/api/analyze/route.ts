import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const imageFile = formData.get("image");
      const description = String(formData.get("description") || "");

      if (!imageFile || typeof imageFile === "string") {
        return NextResponse.json({ error: "Image file is required" }, { status: 400 });
      }

      const file = imageFile as File;
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const imageUrl = `data:${file.type || "image/jpeg"};base64,${base64}`;

      const visionPrompt = `
You are an expert fashion analysis AI.
Analyze the uploaded outfit image and identify each visible clothing item separately.
IMPORTANT: Include accessories as separate detected items when visible (necklaces, earrings, rings, bracelets, watches, handbags, belts, sunglasses, scarves, hats, etc.).
Return ONLY valid JSON in this exact structure:
{
  "items": [
    {
      "name": "Oversized Cream Shirt",
      "category": "Tops",
      "aesthetic": "Quiet Luxury",
      "colors": ["Cream", "Beige"],
      "material": "Cotton",
      "pattern": "Solid",
      "season": "Spring",
      "occasion": "Casual",
      "accessories": ["Gold Necklace"],
      "stylingNotes": "Soft tailored layering piece"
    }
  ]
}

User notes: ${description}
Rules:
- Detect separate items, not just the whole outfit.
- Include accessories as their own distinct items when visible.
- Use specific garment names and specific colors/materials when visible.
- Keep the output compact and production-ready.
`;

      const response = await client.responses.create({
        model: "gpt-4o",
        input: [
          { role: "system", content: "You are a professional fashion analysis assistant." },
          {
            role: "user",
            content: [
              { type: "input_text", text: visionPrompt },
              { type: "input_image", image_url: imageUrl, detail: "auto" },
            ],
          },
        ],
      });

      const raw = response.output_text || "";
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) {
        return NextResponse.json({ error: "AI returned invalid JSON", raw }, { status: 500 });
      }

      try {
        const json = JSON.parse(match[0]);
        return NextResponse.json(json);
      } catch {
        return NextResponse.json({ error: "AI returned invalid JSON", raw }, { status: 500 });
      }
    }

    const body = await req.json();
    const { prompt, occasion, wardrobe } = body;

    if (!wardrobe || !Array.isArray(wardrobe)) {
      return NextResponse.json(
        { error: "Wardrobe missing or invalid" },
        { status: 400 }
      );
    }

    const userOccasion = occasion || "General Occasion";
    const userPrompt = prompt || "";

    const systemPrompt = `
You are a professional fashion stylist.

Your job:
- Select the BEST outfit from the user's wardrobe.
- Consider the occasion: "${userOccasion}"
- Consider the user's prompt: "${userPrompt}"
- Consider the user's wardrobe items below.
- Return ONLY JSON.

User wardrobe:
${JSON.stringify(wardrobe, null, 2)}

Rules:
- Choose 2–5 items MAX.
- Make sure the outfit is cohesive.
- Match aesthetics, colors, and categories.
- Prioritize practicality for the occasion.
- Be precise, not generic.

Output format:

{
  "outfit": [
    {
      "name": "",
      "category": "",
      "aesthetic": "",
      "colors": [],
      "stylingNotes": ""
    }
  ],
  "reasoning": "",
  "alternates": [
    {
      "name": "",
      "reason": ""
    }
  ]
}

Return ONLY JSON. No text outside JSON.
`;

    const response = await client.responses.create({
      model: "gpt-4o",
      input: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Style an outfit for: ${userOccasion}. User prompt: ${userPrompt}`,
            },
          ],
        },
      ],
    });

    const raw = response.output_text;

    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json(
        { error: "AI returned invalid JSON", raw },
        { status: 500 }
      );
    }

    let json;
    try {
      json = JSON.parse(match[0]);
    } catch {
      return NextResponse.json(
        { error: "AI returned invalid JSON", raw },
        { status: 500 }
      );
    }

    return NextResponse.json(json);
  } catch (err: any) {
    console.error("STYLE ERROR:", err);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
