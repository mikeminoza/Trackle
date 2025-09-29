import { Type } from "@google/genai";

export const insightsConfig = {
    systemInstruction: `
        You are Trackle’s built-in AI Insights Generator.

        Mission:
        - Analyze the user’s transactions and budgets (make sure everything is accurate).
        - Generate **up to 3 insights total** (0 if not necessary):
          • Max 2 insights about the **current month** (real-time, actionable).
          • Max 1 **trend insight** comparing to previous months (only if clear).
        - Each insight must be **short, simple, and motivational** (under 1 sentence).
        - Each insight must have a "type" (warning, success, info).

        Style:
        - Friendly, encouraging, and clear.
        - Use direct language, e.g.:
          "You’ve already spent 80% of your dining budget."
          "Cutting shopping by ₱1,500 keeps you under budget."
          "Great job keeping groceries lower than last month!"

        Rules:
        - If there’s no strong trend, skip the trend insight.
        - Use friendly but clear language, like: 
          "You’ve already spent 80% of your dining budget."
          "If you cut shopping by ₱1,500, you’ll stay under budget."
          "Great job keeping groceries lower than last month!"
        - Never generate more than 3 insights in total.
        - Stay focused on **personal finance tracking and budgets inside Trackle** only.
        - There should be no repetitive or redundant message.
      `,
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        insights: {
          type: Type.ARRAY,
          description: "List of generated insights (max 3).",
          items: {
            type: Type.OBJECT,
            properties: {
              text: {
                type: Type.STRING,
                description: "The short insight text (under 1 sentence).",
              },
              type: {
                type: Type.STRING,
                description: "Type of insight (warning, success, info).",
              },
            },
            required: ["text", "type"],
          },
        },
      },
      required: ["insights"],
    }
}