import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, occasion, style, intensity, mood, wardrobe } = body;

    if (!wardrobe || !Array.isArray(wardrobe) || wardrobe.length === 0) {
      return NextResponse.json(
        { error: "Wardrobe missing or empty" },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are a professional fashion stylist with an editorial eye.

Your job:
- Select the BEST outfit combination from the user's wardrobe items below.
- Consider the occasion: "${occasion || "General"}"
- Consider the editorial direction: "${style || "Auto"}"
- Consider the intensity: "${intensity || "Auto"}"
- Consider the mood/atmosphere: "${mood || "Auto"}"
- Consider the user's prompt: "${prompt || ""}"

User wardrobe:
${JSON.stringify(wardrobe.map((i: any) => ({
  id: i.id,
  name: i.name,
  category: i.category,
  aesthetic: i.aesthetic,
  occasion: i.occasion,
  colors: i.colors,
  stylingNotes: i.stylingNotes,
})), null, 2)}

Rules:
- Choose 2–5 items MAX from the wardrobe above.
- The outfit must be cohesive — match aesthetics, colors, and categories.
- Prioritize practicality for the occasion.
- Be specific and precise, not generic.
- Return ONLY valid JSON, no text outside the JSON.

Output format:
{
  "outfit": [
    {
      "id": "",
      "name": "",
      "category": "",
      "aesthetic": "",
      "colors": [],
      "stylingNotes": ""
    }
  ],
  "reasoning": "One sentence explaining why this combination works.",
  "alternates": [
    {
      "name": "",
      "reason": ""
    }
  ]
}
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
              text: `Style an outfit for: ${occasion || "general occasion"}. Prompt: ${prompt || "no extra context"}.`,
            },
          ],
        },
      ],
    });

    const raw = response.output_text || "";
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