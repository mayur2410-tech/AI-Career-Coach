import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import { run } from "node:test";
import axios from "axios";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";


export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const resumeFile: any = formData.get("resumeFile");
  const recordId = formData.get("recordId");
  const analysisType = formData.get("analysisType");
  const jobRole = formData.get("jobRole");
  const jobDescription = formData.get("jobDescription") || "";

  const user = await currentUser();
  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ error: "Unauthorized or missing email" }, { status: 401 });
  }
  const email = user?.primaryEmailAddress?.emailAddress;
  const dbUser = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (!dbUser.length) {
    return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
  }
  const userId = dbUser[0].id;
  const loader = new WebPDFLoader(resumeFile)
  const docs = await loader.load();
  // console.log("docs:",docs[0])  //it cointain Raw pdf text 

  const arrayBuffer = await resumeFile.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');

  // Fetch RAG context if job role is provided
  let ragContext = '';
  if (jobRole) {
    try {
      const ragQuery = jobDescription
        ? `${jobRole}: ${jobDescription.slice(0, 500)}`
        : jobRole.toString();

      const ragResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/mock-interview/get-context`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: ragQuery })
      });

      const ragData = await ragResponse.json();
      if (ragData.documents && ragData.documents.length > 0) {
        ragContext = ragData.documents.map((doc: any) => doc.content).join('\n\n');
      }
    } catch (err) {
      console.error("RAG fetch error:", err);
    }
  }

  const resultId = await inngest.send({
    name: 'AiResumeAgent',
    data: {
      recordId: recordId,
      resumeFile: resumeFile,
      base64ResumeFile: base64,
      pdfText: docs[0]?.pageContent,
      userEmail: email,
      userId: userId,
      analysisType: analysisType,
      jobRole: jobRole,
      jobDescription: jobDescription,
      ragContext: ragContext
    }
  });
  const runId = resultId?.ids[0];
  let runStatus;
  try {
    const timeout = 30000; // 30 seconds max
    const start = Date.now();
    while (true) {
      if (Date.now() - start > timeout) {
        console.warn("Timeout waiting for Inngest run:", runId);
        return NextResponse.json({
          message: "Timeout waiting for Inngest. Analysis may still be running in background.",
          recordId,
          runId,
        });
      }
      runStatus = await getRuns(runId);
      const status = runStatus?.data?.[0]?.status;
      if (status === "Completed") break;
      if (status === "Failed") throw new Error("Inngest run failed");

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const output = runStatus?.data?.[0]?.output?.[0];
    if (!output) {
      console.warn("No analysis output found for runId:", runId);
      return NextResponse.json({
        message: "Analysis completed but no output available yet",
        recordId,
        runId,
      });
    }
    return NextResponse.json(output);

  } catch (err: any) {
    console.error("Polling Inngest failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }


}

async function getRuns(runId: string) {
  const result = await axios.get(`${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`, {
    headers: {
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`
    }
  }
  )
  return result.data;
}