"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ResumeReport from "./_components/Report";

// interface ResumeAnalysis {
//   id: number;
//   userId: number;
//   email: string;
//   analysisData: any;
//   resumeURL?: string;
//   createdAt: string;
// }

export default function AiResumeAnalyzer() {
  const [latestResumes, setLatestResumes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestResumes = async () => {
      try {
        const response = await axios.get("/api/resume-report/latest");
        setLatestResumes(response.data[0]); 
        // console.log("data:",latestResumes?.resumeURL)
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch latest resumes");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestResumes();
  }, []);

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid lg:grid-cols-5 grid-cols-1 ">
         <div className="col-span-2">
          <ResumeReport data={latestResumes?.analysisData} />
         </div>
         <div className="col-span-3 ml-40">
          <h2 className="font-bold text-2xl mb-5">Resume Preview</h2>
            <iframe
              src={latestResumes?.resumeURL+'#toolbar=0&navpanes=0&scrollbar=0'} 
              width={700}         
              height={903}
              // className="min-w-lg"
              style={{ border: "none" }}
            
            />
         </div>
    </div>
  );
}
