import { NextResponse } from "next/server";
import { geminiConfig } from "@/lib/gemini/config";
import { models } from "@/constants/ai-models";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { payload } = await req.json();

    const model = models[0].id;
    const geminiAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const response = await geminiAI.models.generateContent({
      model: model,
      config: {
        systemInstruction: geminiConfig.insights.systemInstruction,
        responseMimeType: geminiConfig.insights.responseMimeType,
        responseSchema: geminiConfig.insights.responseSchema,
      },
      contents: JSON.stringify(payload),
    });

    if (!response.text) {
      return NextResponse.json({ error: "Failed to generate insights" }, { status: 400 });
    }

    const aiResponse = JSON.parse(response.text);
    const insights = Array.isArray(aiResponse.insights) ? aiResponse.insights : [];

    return NextResponse.json({ insights });
  } catch (error: unknown) {
    console.error("Error generating insights:", error);
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 400 });
  }
}
