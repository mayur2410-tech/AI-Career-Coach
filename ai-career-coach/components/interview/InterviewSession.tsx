"use client"

import React, { useEffect, useState, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, PhoneOff, User, Bot } from 'lucide-react';
import { toast } from 'sonner';

interface InterviewSessionProps {
    jobRole: string;
    resumeText: string;
    onEnd: (transcript: any[]) => void;
}

// Move Vapi initialization inside the component to avoid global state issues
export default function InterviewSession({ jobRole, resumeText, onEnd }: InterviewSessionProps) {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [transcript, setTranscript] = useState<any[]>([]);
    const [isSpeaking, setIsSpeaking] = useState<'user' | 'assistant' | null>(null);
    const [volume, setVolume] = useState({ user: 0, assistant: 0 });
    const [duration, setDuration] = useState(0);

    // Keep transcript in ref for final submission without closure staleness
    const transcriptRef = useRef<any[]>([]);
    // Use ref to hold Vapi instance for cleanup
    const vapiRef = useRef<Vapi | null>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isSessionActive) {
            timer = setInterval(() => setDuration(d => d + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isSessionActive]);

    useEffect(() => {
        const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
        if (!vapiPublicKey) {
            console.error("Missing NEXT_PUBLIC_VAPI_PUBLIC_KEY");
            toast.error("Vapi API key missing");
            return;
        }

        // Initialize Vapi instance specifically for this mount
        const vapiInstance = new Vapi(vapiPublicKey);
        vapiRef.current = vapiInstance;

        const setupListeners = () => {
            vapiInstance.on('call-start', () => {
                setIsSessionActive(true);
                toast.success('Interview started');
            });

            vapiInstance.on('call-end', () => {
                setIsSessionActive(false);
                if (transcriptRef.current.length === 0) {
                    // If transcript is empty, it might be an immediate error or user cancelled instantly
                    // toast.error("Interview ended but no conversation was recorded.");
                    return;
                }
                onEnd(transcriptRef.current);
            });

            vapiInstance.on('speech-start', () => {
                setIsSpeaking('user');
            });

            vapiInstance.on('speech-end', () => {
                setIsSpeaking(null);
            });

            vapiInstance.on('volume-level', (level: any) => {
                const v = typeof level === 'number' ? level : (level?.value || 0);
                // Use a functional update for setVolume to get the latest isSpeaking state
                setVolume(prev => {
                    if (isSpeaking === 'user') return { ...prev, user: v };
                    else if (isSpeaking === 'assistant') return { ...prev, assistant: v };
                    return { user: 0, assistant: 0 };
                });
            });

            vapiInstance.on('message', (message: any) => {
                if (message.type === 'transcript' && message.transcriptType === 'final') {
                    const entry = {
                        role: message.role,
                        content: message.transcript
                    };
                    transcriptRef.current.push(entry);
                    setTranscript(prev => [...prev, entry]);

                    if (message.role === 'assistant') {
                        setIsSpeaking('assistant');
                        setTimeout(() => setIsSpeaking(null), 2000);
                    }
                }
            });
        };

        setupListeners();
        startInterview(vapiInstance);

        return () => {
            console.log("Cleanup: Stopping Vapi session");
            vapiInstance.stop();
            vapiInstance.removeAllListeners();
        };
    }, []); // Run once on mount

    const startInterview = async (vapiFunc: Vapi) => {
        try {
            const systemPrompt = `
        You are an expert technical interviewer conducting a mock interview for the role of ${jobRole}.
        Here is the candidate's resume context: "${resumeText.slice(0, 1000)}...".
        
        Start by introducing yourself as the AI Interviewer and ask the candidate to briefly introduce themselves.
        Then, ask 3-4 questions about their experience based on the resume.
        Finally, ask 2-3 technical questions relevant to ${jobRole}.
        
        Keep your responses concise and professional.
        IMPORTANT: Wait for the candidate to complete their answer before asking the next question.
      `;

            console.log("Starting Vapi session...");
            await vapiFunc.start({
                model: {
                    provider: "openai",
                    model: "gpt-4o",
                    messages: [
                        {
                            role: "system",
                            content: systemPrompt
                        }
                    ]
                },
                voice: {
                    provider: "11labs",
                    voiceId: "burt",
                },
                transcriber: {
                    provider: "deepgram",
                    model: "nova-2",
                    language: "en-US",
                    endpointing: 300 // Wait 300ms of silence before processing (Deepgram specific)
                },
                // Add silence timeout to prevent interruption
                // Vapi often allows 'silenceTimeoutSeconds' at root or within transcriber
            });

        } catch (err) {
            console.error("Failed to start Vapi session:", err);
            toast.error("Failed to start interview. Check console for details.");
            setIsSessionActive(false);
        }
    };

    const endInterview = () => {
        if (vapiRef.current) {
            vapiRef.current.stop();
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col h-[600px] max-w-4xl mx-auto gap-4">
            <div className="flex justify-between items-center p-4 bg-white rounded-lg border shadow-sm">
                <div>
                    <h2 className="text-xl font-bold">Mock Interview: {jobRole}</h2>
                    <p className="text-gray-500 text-sm">Duration: {formatTime(duration)}</p>
                </div>
                <Button variant="destructive" onClick={endInterview}>
                    <PhoneOff className="mr-2 h-4 w-4" /> End Interview
                </Button>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
                <Card className={`flex flex-col items-center justify-center p-8 transition-all ${isSpeaking === 'assistant' ? 'border-blue-500 bg-blue-50' : 'bg-gray-50'}`}>
                    <div
                        className="p-6 rounded-full bg-white shadow-sm mb-4 transition-transform duration-100"
                        style={{ transform: `scale(${1 + (isSpeaking === 'assistant' ? Math.min(volume.assistant, 0.5) : 0)})` }}
                    >
                        <Bot className={`w-12 h-12 ${isSpeaking === 'assistant' ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <h3 className="font-semibold text-lg">AI Interviewer</h3>
                    <p className="text-sm text-gray-500">{isSpeaking === 'assistant' ? 'Speaking...' : 'Listening...'}</p>
                </Card>

                <Card className={`flex flex-col items-center justify-center p-8 transition-all ${isSpeaking === 'user' ? 'border-green-500 bg-green-50' : 'bg-gray-50'}`}>
                    <div
                        className="p-6 rounded-full bg-white shadow-sm mb-4 transition-transform duration-100"
                        style={{ transform: `scale(${1 + (isSpeaking === 'user' ? Math.min(volume.user, 0.5) : 0)})` }}
                    >
                        <User className={`w-12 h-12 ${isSpeaking === 'user' ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <h3 className="font-semibold text-lg">You</h3>
                    <p className="text-sm text-gray-500">{isSpeaking === 'user' ? 'Speaking...' : 'Listening...'}</p>
                </Card>
            </div>

            <Card className="h-48 overflow-y-auto p-4 bg-gray-50 border">
                <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">Live Transcript</h4>
                <div className="space-y-2">
                    {transcript.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {transcript.length === 0 && (
                        <p className="text-center text-gray-400 text-sm italic mt-8">Start speaking to see transcript...</p>
                    )}
                </div>
            </Card>
        </div>
    );
}
