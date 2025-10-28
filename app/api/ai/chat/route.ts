import { NextResponse } from "next/server";
import { ChatMessage } from "@/types/ai";
import { models } from "@/constants/ai-models"; 
import { GoogleGenAI } from "@google/genai"; 
import { getBudgetsService, getBudgetSummaryService } from "@/services/budget";
import { getTransactionsService } from "@/services/transaction"; 
import { chatConfig } from "@/lib/gemini/chatConfig";
import { querySelectorConfig } from "@/lib/gemini/querySelectorConfig";
import { handleDashboardAction } from "@/services/dashboardHandler";

export async function POST(req: Request) {
  try {
    const { messages, model, userId }: { messages: ChatMessage[]; model: string; userId: string } =
      await req.json();

    if (!models.find((m) => m.id === model && m.available)) {
      return NextResponse.json({ error: "This model is not available" }, { status: 400 });
    }
    if (!messages?.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY in environment");
    }

    const geminiAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const lastMessage = messages[messages.length - 1];

    // Generate query and get user data
    const querySelector = await geminiAI.models.generateContent({
      model: model,
      config: {
        systemInstruction: querySelectorConfig.systemInstruction,
        responseMimeType: querySelectorConfig.responseMimeType,
        responseJsonSchema: querySelectorConfig.responseSchema,
      },
      contents: lastMessage.content,
    });
 
    if (!querySelector.text) {
      return NextResponse.json({ error: "Failed to generate query" }, { status: 400 });
    }

    const queryJson = JSON.parse(querySelector.text);
    
    let fetchedData;  
    switch (queryJson.query) {
      case "financialSummary":
        fetchedData = await handleDashboardAction(userId, { type: "summary" });
        break;

      case "transactionAggregates":
        fetchedData = await handleDashboardAction(userId, { type: "aggregates", year: queryJson.params.year });
        break;

      case "spendingBreakdown":
        fetchedData = await handleDashboardAction(userId, { type: "breakdown", year: queryJson.params.year, month: queryJson.params.month });
        break;

      case "years":
        fetchedData = await handleDashboardAction(userId, { type: "years" });
        break;

      case "budgets":
        fetchedData = await getBudgetsService({ userId, ...queryJson.params });
        break;

      case "budgetSummary":
        fetchedData = await getBudgetSummaryService({ userId, ...queryJson.params });
        break;

      case "transactions":
        fetchedData = await getTransactionsService({ userId, page: 0, limit: 15, ...queryJson.params });
        break;

      default:
        fetchedData = {};
    }

    // Generate chat
    const systemData = fetchedData ? JSON.stringify(fetchedData, null, 2) : "{}";
    const historyMessages = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = geminiAI.chats.create({
      model,
      history: historyMessages,
      config: {
        systemInstruction: `
          ${chatConfig.systemInstruction}
          User data (for context, do not repeat unless relevant)
          If there is not data, state clearly: "I don’t have enough data to provide an accurate answer."
          ${systemData}
        `,
      },
    });

    const result = await chat.sendMessage({
      message: lastMessage.content,
    });
    const aiResponse = result.text;

    return NextResponse.json({ reply: aiResponse });
  } catch (err) {
    console.error("AI Route Error:", err);
    return NextResponse.json(
      { error: "Something went wrong while processing your request." },
      { status: 400 }
    );
  }
}
