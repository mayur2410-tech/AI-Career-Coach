import { db } from "@/configs/db";
import { inngest } from "./client";
import { createAgent, anthropic, gemini } from '@inngest/agent-kit';
import ImageKit from "imagekit";
import { resumeAnalysisTable } from "@/configs/schema";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);



export const AiResumeAnalyzerAgent = createAgent({
  name:"AiResumeAnalyzerAgent",
  description:'AI Resume analzyer agent help to return report',
  system:`You are an advanced Al Resume Analyzer Agent.
Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format.
The schema must match the layout and structure of a visual Ul that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.
INPUT: I will provide a plain text resume.
GOAL: Output a JSON report as per the schema below. The report should reflect:
overall_score (0—10)
overall_feedback (short message e.g., "Excellent", "Needs improvement")
summary_comment (1—2 sentence evaluation summary)
Section scores for:
Contact Info
Experience
Education
Skills
Each section should include:
score (as percentage)
Optional comment about that section
Tips for improvement (3—5 tips)
What's Good (1—3 strengths)
Needs Improvement (1 —3 weaknesses)
Output JSON Schema:
json
Copy
Edit
{
"overall score": 85,
"overall¯feedback": "Excellentl",
"summary_comment": "Your resume is strong, but there are areas to refine.",
"sections": {
"contact_info": {
"score": 95,
"comment": "Perfectly structured and complete."
},
"experience": {
"score": 88,
"comment": "Strong bullet points and impact."
},
"education": {
"score": 70,
"comment": "Consider adding relevant coursework."
},
"skills": {
"score": 60,
"comment": "Expand on specific skill proficiencies."
}
},
"tips_for_improvement":[
"Add more numbers and metrics to your experience section to show impact.
"Integrate more industry-specific keywords relevant to your target roles.
"Start bullet points with strong action verbs to make your achievements stand out."
]
"whats_good": [
"Clean and professional formatting." ,
"Clear and concise contact information." ,
"Relevant work experience."
],
"needs_improvement": [
"Skills section lacks detail.",
"Some experience bullet points could be stronger.
"Missing a professional summary/objective."
]}`,
  model:gemini({
    model:'gemini-2.0-flash',
    apiKey:process.env.GEMINI_API_KEY
  })
})

var imagekit = new ImageKit({
  //@ts-ignore
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY ,
  //@ts-ignore

    privateKey : process.env.IMAGEKIT_PRIVATE_KEY ,
  //@ts-ignore

    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT 
});

export const  AiResumeAgent = inngest.createFunction(
   {id:'AiResumeAgent'},
   {event:'AiResumeAgent'},
   async ({event, step})=>{
    const {recordId, base64ResumeFile, pdfText,userEmail,userId} = await  event.data;

    //upload file to cloud storage( imagekit.io )
      const uploadImageUrl = await step.run("uploadImage",async()=>{
        const imageKitFile = await imagekit.upload({
            file: base64ResumeFile, //required
            fileName: `${Date.now()}.pdf`, //required
            isPublished:true
        })
        return imageKitFile.url
      })
      const aiResumeReport  = await AiResumeAnalyzerAgent.run(pdfText)
      //@ts-ignore
      const rawContent = aiResumeReport.output[0].content;
      const rawContentJson  = rawContent.replace('```json', '').replace('```', '')
      const parseJSON = JSON.parse(rawContentJson)
    
      //save to db 

      const saveToDB = await step.run("saveToDB", async()=>{
           const result = await db.insert(resumeAnalysisTable).values({
            userId: userId,
            email: userEmail,
            analysisData: parseJSON,
            resumeURL: uploadImageUrl

           })

          //  console.log("result:",result)
           return parseJSON;
      })

   }
)