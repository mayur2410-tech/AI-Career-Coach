
import { NextResponse } from 'next/server';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { supabaseAdmin } from "@/utils/supabase-admin";
import { trainingData } from "@/utils/training-data";

export async function POST(req: Request) {
    try {
        console.log("🌱 Starting RAG Seeding via API...");

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "GEMINI_API_KEY missing" }, { status: 500 });
        }

        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            modelName: "text-embedding-004",
            taskType: TaskType.RETRIEVAL_DOCUMENT,
        });

        const results = [];

        let dataToSeed = trainingData;

        // Check for custom data in request body
        if (req.body) {
            try {
                const body = await req.json();
                if (Array.isArray(body) && body.length > 0) {
                    console.log("Using custom data from request body");
                    dataToSeed = body;
                }
            } catch (e) {
                // Ignore error if body is empty or invalid JSON, fall back to default
                console.log("No valid JSON body found, using default training data");
            }
        }

        for (const item of dataToSeed) {
            // Check if already exists to avoid duplicates (optional, simple check)
            // For now, just insert.

            const embeddingVector = await embeddings.embedQuery(item.content);

            const { error } = await supabaseAdmin
                .from("documents")
                .insert({
                    content: item.content,
                    metadata: item.metadata,
                    embedding: embeddingVector,
                });

            if (error) {
                console.error("Insert error:", error);
                results.push({ topic: item.metadata.topic, status: "error", error: error.message });
            } else {
                results.push({ topic: item.metadata.topic, status: "success" });
            }

            // Add delay to avoid rate limits (2 seconds)
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        return NextResponse.json({ message: "Seeding complete", results });
    } catch (error: any) {
        console.error("Seeding error:", error);
        return NextResponse.json({ error: "Seeding failed", details: error.message }, { status: 500 });
    }
}
