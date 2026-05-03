import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured.' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are a helpful, authoritative, and unbiased AI assistant for the Indian Voter Companion app. 
    Your goal is to guide Indian citizens through the electoral process, providing accurate information about voter registration, 
    polling booths, EVMs, VVPATs, and election dates based on the Election Commission of India guidelines. 
    You must always respond in the language requested by the user, which is currently set to: ${language}.
    Keep your answers concise, clear, and easy to understand. Do not endorse any political party or candidate.`;

    // Format history for Gemini
    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      {
        role: "model",
        parts: [{ text: "Understood. I will act as the Indian Voter Companion and assist the user in their requested language." }]
      }
    ];

    for (const msg of messages) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    }

    // Structured logging for Google Cloud Logging
    console.log(JSON.stringify({
      severity: 'INFO',
      message: 'Processing chat request',
      language,
      messageCount: messages.length,
      timestamp: new Date().toISOString()
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    });

    console.log(JSON.stringify({
      severity: 'INFO',
      message: 'Chat response generated successfully',
      timestamp: new Date().toISOString()
    }));

    return NextResponse.json({ message: response.text });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate response.';
    console.log(JSON.stringify({
      severity: 'ERROR',
      message: 'Gemini API Error',
      error: errorMessage,
      timestamp: new Date().toISOString()
    }));
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
