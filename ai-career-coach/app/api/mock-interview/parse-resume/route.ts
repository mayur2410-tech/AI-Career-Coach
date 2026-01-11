import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const resumeFile = formData.get("resumeFile");

        if (!resumeFile || !(resumeFile instanceof Blob)) {
            return NextResponse.json({ error: "Resume file is required and must be a PDF" }, { status: 400 });
        }

        // Extract raw text from PDF
        const loader = new WebPDFLoader(resumeFile);
        const docs = await loader.load();
        const resumeRawText = docs.map(doc => doc.pageContent).join("\n");

        return NextResponse.json({ text: resumeRawText });

    } catch (err: any) {
        console.error("Resume parsing failed:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
