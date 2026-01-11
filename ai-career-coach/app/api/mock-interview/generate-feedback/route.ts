import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: NextRequest) {
    try {
        if (!apiKey) {
            console.error("GEMINI_API_KEY is not set");
            return NextResponse.json({ error: "Server misconfiguration: Missing GEMINI_API_KEY" }, { status: 500 });
        }

        const { transcript, jobRole, resumeText } = await req.json();

        if (!transcript || !Array.isArray(transcript) || transcript.length === 0) {
            console.warn("Feedback requested with empty transcript");
            return NextResponse.json({
                error: "Interview transcript is empty. Please ensure you spoke during the interview."
            }, { status: 400 });
        }

        if (!jobRole) {
            return NextResponse.json({ error: "Missing job role" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `
      You are an expert technical interviewer. I will provide you with a transcript of a mock interview for the role of ${jobRole}.
      The candidate's resume text is: "${resumeText.slice(0, 1000)}..." (truncated).
      
      Analyze the interview based on the transcript provided below.
      The transcript is a list of messages (role: 'user' | 'assistant', content: string).

      Transcript:
      ${JSON.stringify(transcript)}

      Generate a detailed feedback report in JSON format with the following structure:
      {
        "overallScore": number (0-100),
        "scores": {
          "communication": number (0-100),
          "technical": number (0-100),
          "confidence": number (0-100),
          "completeness": number (0-100)
        },
        "strengths": string[],
        "improvements": string[],
        "questions": [
          {
            "question": string,
            "answer": string,
            "feedback": string,
            "score": number (0-100)
          }
        ]
      }
      
      Ensure the JSON is valid and strictly follows this schema. Do not include markdown formatting.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown if present
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const feedback = JSON.parse(cleanText);

        return NextResponse.json(feedback);

    } catch (err: any) {
        console.error("Feedback generation failed:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
