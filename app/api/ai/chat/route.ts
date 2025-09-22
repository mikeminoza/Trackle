import { NextResponse } from "next/server";
import { ChatMessage } from "@/types/ai";
import { models } from "@/constants/ai-models";
import { geminiConfig } from "@/lib/gemini/config";
import { GoogleGenAI } from "@google/genai";
import {
  getFinancialSummary,
  getSpendingBreakdown,
  getTransactionAggregates,
} from "@/services/dashboard";
import { getBudgets, getBudgetSummary } from "@/services/budget";
import { getTransactions } from "@/services/transaction";
import { supabaseAdmin } from "@/lib/supabase/adminClient";

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
        systemInstruction: geminiConfig.querySelector.systemInstruction,
        responseMimeType: geminiConfig.querySelector.responseMimeType,
        responseJsonSchema: geminiConfig.querySelector.responseSchema,
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
        fetchedData = await getFinancialSummary(userId, supabaseAdmin);
        break;
      case "transactionAggregates":
        fetchedData = await getTransactionAggregates(userId, queryJson.params.year, supabaseAdmin);
        break;
      case "spendingBreakdown":
        fetchedData = await getSpendingBreakdown(
          userId!,
          queryJson.params.year,
          queryJson.params.month,
          supabaseAdmin
        );
        break;
      case "budgets":
        fetchedData = await getBudgets(userId, queryJson.params, supabaseAdmin);
        break;
      case "budgetSummary":
        fetchedData = await getBudgetSummary(userId, queryJson.params, supabaseAdmin);
        break;
      case "transactions":
        fetchedData = await getTransactions(userId, 0, 15, queryJson.params, supabaseAdmin);
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
          ${geminiConfig.chat.systemInstruction}
          User data (for context, do not repeat unless relevant):
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
