import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req:NextRequest) {
    const {userInput} = await req.json();
    const user = await currentUser();
      const email= user?.primaryEmailAddress?.emailAddress;
        if (!email) {
            return NextResponse.json({ error: "User email not found." }, { status: 400 });
        }
        const dbUser = await db.select().from(usersTable).where(eq(usersTable.email, email));
        const userId = dbUser[0].id;
    

    const resultId = await inngest.send({
            name:"AiRoadMapAgent",
            data:{
                userInput:userInput,
                userEmail:email,
                userId:userId
            }
    });
    const runId = resultId?.ids[0];
    let runStatus;
    while(true){
        runStatus = await getRuns(runId);
        if(runStatus?.data?.[0]?.status === "Completed") {
            break;
        }
        if(runStatus?.data?.[0]?.status === "Cancelled"){
            break;
        }

            await new Promise(resolve => setTimeout(resolve, 500));

    }
    return NextResponse.json({ output: runStatus.data?.[0].output?.output[0] });
    
}

  async function getRuns(runId: string) {
    const result = await axios.get(`${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,{
            headers:{
                    Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`
            }
    }
    )
    return result.data;
}


