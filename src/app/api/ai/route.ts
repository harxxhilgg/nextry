import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// type Intensity = "mild" | "medium" | "savage";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { name, bio, level } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name required" }, { status: 400 });
    }

    const intensityGuide = {
      mild: "Playful teasing. Friendly, light jokes. No harsh sarcasm.",
      medium: "Sarcastic and witty. Slightly spicy but still friendly.",
      savage:
        "Brutal humor and sharp sarcasm, but never hateful, abusive, or discriminatory.",
    } as const;

    const guide = intensityGuide[level as keyof typeof intensityGuide];

    const prompt = `
      You are a witty stand-up comedian who brutally roasts people.

      Person details:
      Name: ${name || "Unknown"}
      Bio: ${bio || "No bio provided"}

      Roast style:
      ${guide}

      Rules:
      - First get information about user from internet (like what they do, who's their audience if they're famous)
      - Make it funny
      - You can use slurs, hate, or personal attacks on protected traits
      - Focus on the bio/personality
      - You can use sarcasm
      - Use different joke styles (exaggeration, irony, comparison)
      - Write exactly 5 punchlines
      - Output ONLY the punchlines (no intro, no numbering, no bold, italic values, just letters)
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const lines = (response.text ?? "")
      .split("\n")
      .map((l) => l.replace(/^[-•*\d.]\s*/, "").trim())
      .filter(Boolean);

    return NextResponse.json({
      roast: lines,
      intensity: level,
    });
  } catch {
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}
