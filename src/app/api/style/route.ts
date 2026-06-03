import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      prompt = "",
      occasion = "General Occasion",
      style = "",
      intensity = "",
      mood = "",
      wardrobe = [],
    } = body;

    if (!Array.isArray(wardrobe) || wardrobe.length === 0) {
      return NextResponse.json(
        { error: "Your wardrobe is empty. Save items first to generate outfits." },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are a premium fashion stylist for ReArchive.
Use ONLY the wardrobe items provided below.
Create an outfit that matches the user's prompt, occasion, editorial direction, intensity, and atmosphere.
If the user selected a specific style direction, make the outfit feel like that aesthetic.
If the user selected intensity, make the silhouette accordingly: minimal = clean and restrained, maximal = bold and layered.
If the user selected atmosphere, shape the mood with colors, textures, and attitude.
Always include accessories if they are in the wardrobe and relevant.
Return ONLY valid JSON with this structure:
{
  "outfit": [
    { "name": "", "category": "", "aesthetic": "", "colors": [], "stylingNotes": "" }
  ],
  "reasoning": "",
  "alternates": [
    { "name": "", "reason": "" }
  ]
}

Wardrobe:
${JSON.stringify(wardrobe, null, 2)}

User prompt: ${prompt}
Occasion: ${occasion}
Editorial direction: ${style || "auto-detect"}
Intensity: ${intensity || "auto-detect"}
Atmosphere: ${mood || "auto-detect"}

Rules:
- Use 2 to 5 wardrobe items maximum.
- Prefer real wardrobe items over invented ones.
- If accessories are available and fit the prompt, include them.
- Make the outfit cohesive, fashionable, and practical.
- Make the result noticeably different when style, intensity, or mood changes.
- Use the selected combination to shape silhouette, palette, textures, and attitude.
- Return compact but rich styling detail.
`;

    const response = await client.responses.create({
      model: "gpt-4o",
      input: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Create an outfit for: ${occasion}. User wants: ${prompt}`,
        },
      ],
    });

    const raw = response.output_text || "";
    const match = raw.match(/\{[\s\S]*\}/);

    if (!match) {
      return NextResponse.json({ error: "AI returned invalid JSON", raw }, { status: 500 });
    }

    const json = JSON.parse(match[0]);
    return NextResponse.json(json);
  } catch (error: any) {
    console.error("STYLE_ROUTE_ERROR", error);
    return NextResponse.json(
      { error: "Failed to generate outfit", details: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
