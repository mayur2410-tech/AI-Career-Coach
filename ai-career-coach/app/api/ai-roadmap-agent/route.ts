import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {userInput} = await req.json();
    const user = await currentUser();

    const resultId = await inngest.send({
            name:"AiRoadMapAgent",
            data:{
                userInput:userInput,
                userEmail:user?.primaryEmailAddress?.emailAddress 
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


