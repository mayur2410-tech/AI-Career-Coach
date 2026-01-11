
import { supabase } from "./supabase";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

export async function searchSimilarDocuments(query: string, matchCount = 3) {
    try {
        // 1. Generate embedding for user query
        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            modelName: "text-embedding-004",
            taskType: TaskType.RETRIEVAL_QUERY,
        });

        const queryVector = await embeddings.embedQuery(query);

        // 2. Search in Supabase via RPC
        const { data, error } = await supabase.rpc("match_documents", {
            query_embedding: queryVector,
            match_threshold: 0.5, // Sensitivity
            match_count: matchCount,
        });

        if (error) {
            console.error("RAG Search Error:", error);
            return [];
        }

        return data || [];
    } catch (err) {
        console.error("RAG specific error:", err);
        return [];
    }
}
