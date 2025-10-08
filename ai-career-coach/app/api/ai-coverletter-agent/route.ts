import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import axios from "axios";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeFile: any = formData.get("resumeFile");
    const jobTitle = formData.get("jobTitle") as string;
    const companyName = formData.get("companyName") as string;
    const jobDescription = formData.get("jobDescription") as string;

    if (!resumeFile || !jobTitle || !companyName || !jobDescription) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = await currentUser();
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized or missing email" }, { status: 401 });
    }

    const email = user.primaryEmailAddress.emailAddress;
    const dbUser = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!dbUser.length) {
      return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
    }
    const userId = dbUser[0].id;

    // Extract raw text from PDF
    const loader = new WebPDFLoader(resumeFile);
    const docs = await loader.load();
    const resumeRawText = docs[0]?.pageContent;

    // Optional: convert PDF to Base64 if you want to store or send it
    const arrayBuffer = await resumeFile.arrayBuffer();
    const base64Resume = Buffer.from(arrayBuffer).toString("base64");

    // Send data to Inngest AICoverLetterAgent
    const resultId = await inngest.send({
      name: "AICoverLetterAgent",
      data: {
        resumeRawText,
        jobTitle,
        companyName,
        jobDescription,
        base64ResumeFile: base64Resume,
        userEmail: email,
        userId: userId
        
      },
    });

    const runId = resultId?.ids[0];
    let runStatus;

    // Poll Inngest until completion or timeout
    const timeout = 30000; // 30s
    const start = Date.now();
    while (true) {
      if (Date.now() - start > timeout) {
        return NextResponse.json({
          message: "Timeout waiting for Inngest. Cover letter may still be generating.",
          runId,
        });
      }

      runStatus = await getInngestRun(runId);
      const status = runStatus?.data?.[0]?.status;

      if (status === "Completed") break;
      if (status === "Failed") throw new Error("Inngest run failed");

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const output = runStatus?.data?.[0]?.output?.[0];
    if (!output) {
      return NextResponse.json({
        message: "Cover letter generation completed but no output available yet",
        runId,
      });
    }
    let outputData;
try {
  outputData = JSON.parse(output.content);
} catch {
  outputData = { coverLetter: output.content }; // fallback if not JSON
}

    return NextResponse.json(outputData);

  } catch (err: any) {
    console.error("Cover letter generation failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Helper function to poll Inngest
async function getInngestRun(runId: string) {
  const result = await axios.get(`${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`, {
    headers: {
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
    },
  });
  return result.data;
}


// import { NextRequest, NextResponse } from "next/server";
// import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
// import { inngest } from "@/inngest/client";
// import axios from "axios";
// import { currentUser } from "@clerk/nextjs/server";
// import { usersTable } from "@/configs/schema";
// import { db } from "@/configs/db";
// import { eq } from "drizzle-orm";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const resumeFile: any = formData.get("resumeFile");
//     const jobTitle = formData.get("jobTitle") as string;
//     const companyName = formData.get("companyName") as string;
//     const jobDescription = formData.get("jobDescription") as string;

//     if (!resumeFile || !jobTitle || !companyName || !jobDescription) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     const user = await currentUser();
//     if (!user?.primaryEmailAddress?.emailAddress) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     const email = user.primaryEmailAddress.emailAddress;
     
//     // Extract raw text from PDF
//     const loader = new WebPDFLoader(resumeFile);
//     const docs = await loader.load();
//     const resumeRawText = docs[0]?.pageContent || "";

//     // Optional: convert PDF to Base64
//     const arrayBuffer = await resumeFile.arrayBuffer();
//     const base64Resume = Buffer.from(arrayBuffer).toString("base64");

//     // Send data to Inngest function
//     const resultId = await inngest.send({
//       name: "AICoverLetterAgent",
//       data: { resumeRawText, jobTitle, companyName, jobDescription, base64ResumeFile: base64Resume, userEmail: email,userId:userId },
//     });

//     const runId = resultId?.ids?.[0];
//     if (!runId) {
//       return NextResponse.json({ error: "Failed to start Inngest run" }, { status: 500 });
//     }

//     // Poll Inngest until completion or timeout
//     const timeout = 90000; // 90 seconds
//     const start = Date.now();
//     let output: any;

//     while (true) {
//       if (Date.now() - start > timeout) {
//         return NextResponse.json({
//           message: "Timeout waiting for cover letter. It may still be generating in background.",
//           runId,
//         });
//       }

//       const runStatus = await getInngestRun(runId);
//       const status = runStatus?.data?.[0]?.status;
//       output = runStatus?.data?.[0]?.output?.[0];

//       if (output?.coverLetter) {
//         // ✅ Cover letter ready
//         return NextResponse.json({ coverLetter: output.coverLetter });
//       }

//       // Wait 0.5s before next poll
//       await new Promise((resolve) => setTimeout(resolve, 500));
//     }
//   } catch (err: any) {
//     console.error("Cover letter generation failed:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// // Helper function to poll Inngest runs
// async function getInngestRun(runId: string) {
//   const result = await axios.get(`${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`, {
//     headers: { Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}` },
//   });
//   return result.data;
// }
