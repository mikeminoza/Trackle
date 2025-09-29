import { NextResponse } from "next/server"; 
import { models } from "@/constants/ai-models";
import { GoogleGenAI } from "@google/genai";
import { voiceTransactionConfig } from "@/lib/gemini/voiceTransactionConfig";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const model = models[0].id;
    const geminiAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const response = await geminiAI.models.generateContent({
      model: model,
      config: {
        systemInstruction: voiceTransactionConfig.systemInstruction,
        responseMimeType: voiceTransactionConfig.responseMimeType,
        responseSchema: voiceTransactionConfig.responseSchema,
      },
      contents: input,
    });

    if (!response.text) {
      return NextResponse.json({ error: "Failed to generate transaction input(s)" }, { status: 400 });
    }

    const transactions = JSON.parse(response.text);

    return NextResponse.json(transactions);
  } catch (error: unknown) {
    console.error("Error generating insights:", error);
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 400 });
  }
}
