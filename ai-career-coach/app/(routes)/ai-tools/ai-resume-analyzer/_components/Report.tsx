"use client";

import { Sparkle } from "lucide-react";
import React from "react";


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
  // console.log("overall score:", data.overall_score);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Analysis Results</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
         <Sparkle /> Re-analyze
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
            {section.whats_good.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium text-gray-700">What's Good:</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {section.whats_good.map((item, idx) => (
                    <li key={idx}>{highlightKeywords(item, KEYWORDS)}</li>
                  ))}
                </ul>
              </div>
            )}

           {section.tips_for_improvement.length > 0 && (
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
