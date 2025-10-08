import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { AICoverLetterAgent, helloWorld } from "../../../inngest/function";
import { AiResumeAgent } from "../../../inngest/function";
import {AIRoadmapAgent} from "../../../inngest/function";

// Create an API that serves zero functions
export const { GET, POST,PUT} = serve({
  client: inngest,
  functions: [
   helloWorld,
   AiResumeAgent,
   AIRoadmapAgent,
   AICoverLetterAgent

  ],
});