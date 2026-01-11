"use client"

import React, { useState } from 'react'
import InterviewSetupForm from '@/components/interview/InterviewSetupForm'
import InterviewSession from '@/components/interview/InterviewSession'
import FeedbackReport from '@/components/interview/FeedbackReport'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

const AIMockInterview = () => {
  const [step, setStep] = useState('setup'); // setup, interview, generating, report
  const [jobRole, setJobRole] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [feedbackData, setFeedbackData] = useState(null);

  const handleStartInterview = (role, text) => {
    setJobRole(role);
    setResumeText(text);
    setStep('interview');
  };

  const handleEndInterview = async (transcript) => {
    setStep('generating');
    try {
      const response = await axios.post('/api/mock-interview/generate-feedback', {
        transcript,
        jobRole,
        resumeText
      });
      setFeedbackData(response.data);
      setStep('report');
    } catch (error) {
      console.error("Feedback generation error:", error);
      toast.error("Failed to generate feedback report. Please try again.");
      setStep('setup'); // Fallback or handle error better
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {step === 'setup' && (
        <div className="space-y-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">AI Mock Interview</h1>
            <p className="text-gray-500">Practice your interview skills with our AI using your resume.</p>
          </div>
          <InterviewSetupForm onStart={handleStartInterview} />
        </div>
      )}

      {step === 'interview' && (
        <InterviewSession
          jobRole={jobRole}
          resumeText={resumeText}
          onEnd={handleEndInterview}
        />
      )}

      {step === 'generating' && (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold">Generating your Feedback Report...</h2>
          <p className="text-gray-500">Analyzing your answers and communication style.</p>
        </div>
      )}

      {step === 'report' && feedbackData && (
        <FeedbackReport data={feedbackData} />
      )}
    </div>
  )
}

export default AIMockInterview
