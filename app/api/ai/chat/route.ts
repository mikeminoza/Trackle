import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "@/types/ai";
import { models } from "@/constants/ai-models";
import { geminiConfig } from "@/lib/gemini/config";

export async function POST(req: Request) {
  try {
    const { messages, model }: { messages: ChatMessage[]; model: string } = await req.json();

    if (!models.find((m) => m.id === model && m.available)) {
      return NextResponse.json({ error: "This model is not available" }, { status: 400 });
    }
    if (!messages?.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY in environment");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const aiModel = genAI.getGenerativeModel({ model, systemInstruction: geminiConfig.chat.systemInstruction }); 

    const history = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
 
    const chat = aiModel.startChat({ history });
 
    const lastMessage = messages[messages.length - 1];

    const result = await chat.sendMessage(lastMessage.content);
    const aiResponse = result.response.text();

    return NextResponse.json({ reply: aiResponse });
  } catch (err) {
    console.error("AI Route Error:", err);
    return NextResponse.json(
      { error: "Something went wrong while processing your request." },
      { status: 400 }
    );
  }
}
