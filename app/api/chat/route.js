// app/api/chat/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are Moin AI, an advanced, highly intelligent study assistant... (Paste full prompt here)`;

export async function POST(req) {
  const { messages } = await req.json();
  
  // Format history for Gemini
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-pro",
    systemInstruction: SYSTEM_PROMPT 
  });

  const chat = model.startChat({
    history: messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
  });

  const lastMessage = messages[messages.length - 1].content;
  const result = await chat.sendMessage(lastMessage);
  const response = await result.response;
  
  return NextResponse.json({ content: response.text() });
    }
