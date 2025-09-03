import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "@/types/ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json(); 

    const history = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
 
    const chat = model.startChat({ history });
 
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
