import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // Assuming Shadcn Progress exists, else fallback to standard
import { Download, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface FeedbackData {
    overallScore: number;
    scores: {
        communication: number;
        technical: number;
        confidence: number;
        completeness: number;
    };
    strengths: string[];
    improvements: string[];
    questions: {
        question: string;
        answer: string;
        feedback: string;
        score: number;
    }[];
}

interface FeedbackReportProps {
    data: FeedbackData;
}

export default function FeedbackReport({ data }: FeedbackReportProps) {

    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-4 bg-gray-50/50 min-h-screen">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Interview Report</h2>
                <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Save PDF
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-t-4 border-blue-600">
                    <CardHeader>
                        <CardTitle>Overall Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-blue-100">
                            <span className="text-4xl font-bold text-blue-600">{data.overallScore}%</span>
                        </div>
                        <p className="mt-4 text-gray-500 font-medium">{data.overallScore >= 70 ? 'Passed' : 'Needs Improvement'}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Category Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { label: 'Communication', value: data.scores.communication },
                            { label: 'Technical Details', value: data.scores.technical },
                            { label: 'Confidence', value: data.scores.confidence },
                            { label: 'Answer Completeness', value: data.scores.completeness },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{item.label}</span>
                                    <span className="font-bold">{item.value}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-green-50 border-green-100">
                    <CardHeader>
                        <CardTitle className="text-green-700 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" /> Strengths
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-1 text-green-800">
                            {data.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-100">
                    <CardHeader>
                        <CardTitle className="text-red-700 flex items-center gap-2">
                            <XCircle className="h-5 w-5" /> Areas for Improvement
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-1 text-red-800">
                            {data.improvements.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold">Detailed Question Analysis</h3>
                {data.questions.map((q, i) => (
                    <Collapsible key={i} className="border rounded-lg bg-white shadow-sm">
                        <div className="p-4 flex justify-between items-start">
                            <div className="space-y-1">
                                <span className="text-xs font-semibold text-gray-500 uppercase">Question {i + 1}</span>
                                <p className="font-medium text-lg">{q.question}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${q.score >= 70 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {q.score}/100
                                </span>
                            </div>
                        </div>
                        <div className="px-4 pb-4 border-t pt-4 bg-gray-50">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs font-bold text-gray-500">YOUR ANSWER</span>
                                    <p className="text-sm text-gray-700 mt-1 italic">"{q.answer}"</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-500">FEEDBACK & IMPROVEMENT</span>
                                    <p className="text-sm text-blue-800 mt-1">{q.feedback}</p>
                                </div>
                            </div>
                        </div>
                    </Collapsible>
                ))}
            </div>
        </div>
    );
}
