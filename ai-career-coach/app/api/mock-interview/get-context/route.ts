
import { NextResponse } from 'next/server';
import { searchSimilarDocuments } from '@/utils/rag-search';

export async function POST(req: Request) {
    try {
        const { query } = await req.json();
        if (!query) return NextResponse.json({ error: "Query required" }, { status: 400 });

        const documents = await searchSimilarDocuments(query);
        return NextResponse.json({ documents });
    } catch (error) {
        console.error("Context fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch context" }, { status: 500 });
    }
}
