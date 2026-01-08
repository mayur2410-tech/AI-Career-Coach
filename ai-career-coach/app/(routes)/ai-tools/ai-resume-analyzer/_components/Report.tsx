"use client";

import { Sparkle } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";

interface SectionData {
  score: number;
  comment: string;
  tips_for_improvement: string[];
  whats_good: string[];
  needs_improvement: string[];
}

interface ResumeAnalysis {
  overall_score: number;
  overall_feedback: string;
  summary_comment: string;
  sections: {
    contact_info: SectionData;
    experience: SectionData;
    education: SectionData;
    skills: SectionData;
  };
  tips_for_improvement: string[];
  whats_good: string[];
  needs_improvement: string[];
}

interface Props {
  data: ResumeAnalysis;
}

const ScoreColor = (score: number) => {
  if (score >= 85) return "text-green-600";
  if (score > 50) return "text-yellow-600";
  return "text-red-600";
};

// Utility to highlight keywords in a text
const highlightKeywords = (text: string, keywords: string[]) => {
  const regex = new RegExp(`(${keywords.join("|")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, idx) =>
    keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
      <span key={idx} className="bg-yellow-200 font-semibold px-1 rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
};


const KEYWORDS = [
  // Technologies
  "React.js",
  "Node.js",
  "Express",
  "MongoDB",
  "MERN",
  "API",
  "Git",
  "GitHub",
  "LinkedIn",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Bootstrap",
  "Tailwind",
  "Redux",
  "Next.js",

  // Skills & Concepts
  "GPA",
  "Agile",
  "quantifiable",
  "skills",
  "projects",
  "efficiency",
  "impact",
  "frontend",
  "backend",
  "full-stack",
  "DevOps",
  "testing",
  "unit tests",
  "CI/CD",
  "collaboration",
  "communication",
  "problem-solving",
  "leadership",

  // Action/Result-Oriented Words
  "designed",
  "developed",
  "implemented",
  "optimized",
  "improved",
  "enhanced",
  "managed",
  "delivered",
  "analyzed",
  "created",
  "launched",
  "achieved",
  "built",
  "organized",
  "automated",

  // Resume/Impact Words
  "users",
  "performance",
  "efficiency",
  "revenue",
  "growth",
  "award",
  "honor",
  "recognized",
  "certification",
  "bootcamp",
  "coursework",
];


export default function ResumeReport({ data }: Props) {
const[loader,setLoader]=useState(false)
  const user = useUser()
const userName = user?.user?.firstName || "Candidate";
  // console.log("overall score:", data.overall_score);
const downloadPDF = async () => {
  try {
    setLoader(true)
    const response = await axios.post(
      'http://localhost:4000/generate-pdf',
      {
        resumeData: data,
        candidateName: userName,
        targetRole: 'Full Stack Developer',
        aiProvider: 'Ai Career Coach',
      },
      { responseType: 'blob' }
    );

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${userName}_resume.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error downloading PDF:', err);
  }finally{
    setLoader(false)
  }
};

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Analysis Results</h1>
        <button
  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 w-auto flex items-center gap-2"
  onClick={downloadPDF}
  disabled={loader}
>
  {loader ? (
    <Loader2Icon className="animate-spin" />
  ) : (
    <Sparkle />
  )}
  <span>Export as PDF</span>
</button>

      </div>

      {/* Overall Score */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Overall Score</h2>
        <div className="flex items-center space-x-4 mt-2">
          <span className={`text-3xl font-bold ${ScoreColor(data.overall_score)}`}>
            {data.overall_score}/100
          </span>
          <span className="text-green-600 font-medium">{data.overall_feedback}</span>
        </div>
        <div className="h-2 w-full bg-gray-300 rounded mt-2">
          <div
            className="h-2 bg-blue-600 rounded"
            style={{ width: `${data.overall_score}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-700">{data.summary_comment}</p>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data.sections).map(([key, section]) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold capitalize">{key.replace("_", " ")}</h3>
            <p className={`text-xl font-bold mt-1 ${ScoreColor(section.score)}`}>
              {section.score}%
            </p>
            <p className="mt-1 text-gray-600 text-sm">{section.comment}</p>

            {/* Optional: show tips, whats_good, needs_improvement per section */}
            {section.whats_good?.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium text-gray-700">What's Good:</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {section.whats_good.map((item, idx) => (
                    <li key={idx}>{highlightKeywords(item, KEYWORDS)}</li>
                  ))}
                </ul>
              </div>
            )}

           {section.tips_for_improvement?.length > 0 && (
  <div className="mt-2">
    <h4 className="font-medium text-gray-700">Tips for Improvement:</h4>
    <ul className="list-disc list-inside text-gray-600 text-sm">
      {section.tips_for_improvement.map((tip, idx) => (
        <li key={`tip-${idx}`}>{highlightKeywords(tip, KEYWORDS)}</li>
      ))}
    </ul>
  </div>
)}

          </div>
        ))}
      </div>

      {/* Overall Tips for Improvement */}
      {data.tips_for_improvement.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Tips for Improvement</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {data.tips_for_improvement.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Overall Whats Good */}
      {data.whats_good.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">What's Good Overall</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {data.whats_good.map((item, idx) => (
              <li key={idx}>{highlightKeywords(item, KEYWORDS)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Overall Needs Improvement */}
      {data.needs_improvement.length > 0 && (
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Needs Improvement Overall</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {data.needs_improvement.map((item, idx) => (
              <li key={idx}>{highlightKeywords(item, KEYWORDS)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
// "use client";

// import { Sparkle } from "lucide-react";
// import React, { useState } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// interface SectionData {
//   score: number;
//   comment: string;
//   tips_for_improvement: string[];
//   whats_good: string[];
//   needs_improvement: string[];
// }

// interface ResumeAnalysis {
//   overall_score: number;
//   overall_feedback: string;
//   summary_comment: string;
//   sections: {
//     contact_info: SectionData;
//     experience: SectionData;
//     education: SectionData;
//     skills: SectionData;
//   };
//   tips_for_improvement: string[];
//   whats_good: string[];
//   needs_improvement: string[];
// }

// interface Props {
//   data: ResumeAnalysis;

// }

// const ScoreColor = (score: number) => {
//   if (score >= 85) return "text-green-600";
//   if (score > 50) return "text-yellow-600";
//   return "text-red-600";
// };

// // Utility to highlight keywords in a text
// const highlightKeywords = (text: string, keywords: string[]) => {
//   const regex = new RegExp(`(${keywords.join("|")})`, "gi");
//   const parts = text.split(regex);
//   return parts.map((part, idx) =>
//     keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
//       <span key={idx} className="bg-yellow-200 font-semibold px-1 rounded">
//         {part}
//       </span>
//     ) : (
//       part
//     )
//   );
// };

// const KEYWORDS = [
//   "React.js", "Node.js", "Express", "MongoDB", "MERN", "API", "Git", "GitHub",
//   "HTML", "CSS", "JavaScript", "TypeScript", "Bootstrap", "Tailwind", "Redux", "Next.js",
//   "GPA", "Agile", "quantifiable", "skills", "projects", "efficiency", "impact",
//   "frontend", "backend", "full-stack", "DevOps", "testing", "unit tests", "CI/CD",
//   "collaboration", "communication", "problem-solving", "leadership",
//   "designed", "developed", "implemented", "optimized", "improved", "enhanced",
//   "managed", "delivered", "analyzed", "created", "launched", "achieved", "built",
//   "organized", "automated",
//   "users", "performance", "efficiency", "revenue", "growth", "award", "honor",
//   "recognized", "certification", "bootcamp", "coursework",
// ];

// export default function ResumeReport({
//   data,
 
// }: Props) {
//   const handleExportPDF = async () => {
//     const element = document.getElementById("resume-report");
//     if (!element) return;

//     const canvas = await html2canvas(element, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`resume_analysis_${Date.now()}.pdf`);
//   };

//   return (
//     <div>
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={handleExportPDF}
//           className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center gap-2"
//         >
//           <Sparkle /> Export as PDF
//         </button>
//       </div>

//       <div
//         id="resume-report"
//         className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
//       >
//         {/* Header / Metadata */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold">Resume Analysis Report</h1>
//           <p>Generated on: {new Date().toLocaleDateString()}</p>
//           {/* <p>Candidate: {candidateName}</p> */}
//           {/* <p>Target Role: {targetRole}</p> */}
//           {/* <p>Analysis performed by: {aiProvider}</p> */}
//         </div>

//         {/* Overall Score */}
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <h2 className="text-lg font-semibold">Resume Score</h2>
//           <div className="flex items-center space-x-4 mt-2">
//             <span className={`text-3xl font-bold ${ScoreColor(data.overall_score)}`}>
//               {data.overall_score}/100
//             </span>
//             <span className="text-green-600 font-medium">{data.overall_feedback}</span>
//           </div>
//           <div className="h-2 w-full bg-gray-300 rounded mt-2">
//             <div
//               className="h-2 bg-blue-600 rounded"
//               style={{ width: `${data.overall_score}%` }}
//             ></div>
//           </div>
//           <p className="mt-2 text-sm text-gray-700">{data.summary_comment}</p>
//         </div>

//         {/* Sections */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {Object.entries(data.sections).map(([key, section]) => (
//             <div key={key} className="bg-gray-50 p-4 rounded-lg border">
//               <h3 className="text-lg font-semibold capitalize">{key.replace("_", " ")}</h3>
//               <p className={`text-xl font-bold mt-1 ${ScoreColor(section.score)}`}>
//                 {section.score}%
//               </p>
//               <p className="mt-1 text-gray-600 text-sm">{section.comment}</p>

//               {section.whats_good.length > 0 && (
//                 <div className="mt-2">
//                   <h4 className="font-medium text-gray-700">What's Good:</h4>
//                   <ul className="list-disc list-inside text-gray-600 text-sm">
//                     {section.whats_good.map((item, idx) => (
//                       <li key={idx}>{highlightKeywords(item, KEYWORDS)}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {section.tips_for_improvement.length > 0 && (
//                 <div className="mt-2">
//                   <h4 className="font-medium text-gray-700">Tips for Improvement:</h4>
//                   <ul className="list-disc list-inside text-gray-600 text-sm">
//                     {section.tips_for_improvement.map((tip, idx) => (
//                       <li key={`tip-${idx}`}>{highlightKeywords(tip, KEYWORDS)}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Overall Tips for Improvement */}
//         {data.tips_for_improvement.length > 0 && (
//           <div className="bg-gray-100 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold mb-2">Tips for Improvement</h3>
//             <ul className="list-disc list-inside space-y-1 text-gray-700">
//               {data.tips_for_improvement.map((tip, idx) => (
//                 <li key={idx}>{tip}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Overall Whats Good */}
//         {data.whats_good.length > 0 && (
//           <div className="bg-green-50 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold mb-2">What's Good Overall</h3>
//             <ul className="list-disc list-inside space-y-1 text-gray-700">
//               {data.whats_good.map((item, idx) => (
//                 <li key={idx}>{highlightKeywords(item, KEYWORDS)}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Overall Needs Improvement */}
//         {data.needs_improvement.length > 0 && (
//           <div className="bg-red-50 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold mb-2">Needs Improvement Overall</h3>
//             <ul className="list-disc list-inside space-y-1 text-gray-700">
//               {data.needs_improvement.map((item, idx) => (
//                 <li key={idx}>{highlightKeywords(item, KEYWORDS)}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
