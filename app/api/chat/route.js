import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const SYSTEM_PROMPT = `You are Moin AI, an advanced, highly intelligent study assistant. You help students learn, understand concepts, and achieve their academic goals. Be friendly, clear, and thorough in your explanations.`;

export async function POST(req) {
  try {
    const { message, history } = await req.json();

    console.log("[v0] Received message:", message);

    // Build messages array from history
    const messages = [];
    
    if (history && history.length > 0) {
      for (const msg of history) {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      }
    }
    
    // Add the current message
    messages.push({
      role: 'user',
      content: message
    });

    console.log("[v0] Calling AI with messages:", messages.length);

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    console.log("[v0] Got response:", text?.substring(0, 100));

    return Response.json({ response: text });
  } catch (error) {
    console.error("[v0] Chat API Error:", error);
    return Response.json(
      { error: error.message || "Failed to get response" },
      { status: 500 }
    );
  }
}
