
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { supabaseAdmin } from "../utils/supabase-admin";
import { trainingData } from "../utils/training-data";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const seed = async () => {
    console.log("🌱 Starting RAG Seeding...");

    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ GEMINI_API_KEY is missing!");
        return;
    }

    // Initialize Gemini Embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        modelName: "embedding-001", // or "models/text-embedding-004"
        taskType: TaskType.RETRIEVAL_DOCUMENT,
    });

    for (const item of trainingData) {
        try {
            console.log(`Processing: ${item.metadata.topic}`);

            // Generate embedding
            const embeddingVector = await embeddings.embedQuery(item.content);

            // Upload to Supabase
            const { error } = await supabaseAdmin
                .from("documents")
                .insert({
                    content: item.content,
                    metadata: item.metadata,
                    embedding: embeddingVector,
                });

            if (error) {
                console.error("❌ Error inserting:", error.message);
            } else {
                console.log("✅ Inserted:", item.metadata.topic);
            }
        } catch (err) {
            console.error("❌ Failed to process item:", err);
        }
    }

    console.log("🎉 Seeding complete!");
};

seed();
