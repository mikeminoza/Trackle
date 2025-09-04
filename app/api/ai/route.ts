import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "@/types/ai";
 import { models } from "@/constants/ai-models";

export async function POST(req: Request) {
  try {
    const { messages, model }: { messages: ChatMessage[]; model: string } = await req.json();
    if (!models.find((m) => m.id === model && m.available)) {
      return NextResponse.json({ error: "This model is not available" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const aiModel = genAI.getGenerativeModel({ model }); 

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
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
