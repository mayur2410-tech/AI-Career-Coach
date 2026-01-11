import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface InterviewSetupFormProps {
    onStart: (role: string, resumeText: string) => void;
}

export default function InterviewSetupForm({ onStart }: InterviewSetupFormProps) {
    const [jobRole, setJobRole] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!jobRole || !file) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('resumeFile', file);

            const response = await fetch('/api/mock-interview/parse-resume', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to parse resume');

            const data = await response.json();
            onStart(jobRole, data.text);
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border">
            <h2 className="text-2xl font-bold mb-6">Start Mock Interview</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Target Job Role</label>
                    <Input
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        placeholder="e.g. Senior Frontend Engineer"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Upload Resume (PDF)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="hidden"
                            id="resume-upload"
                        />
                        <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">{file ? file.name : "Click to upload PDF"}</span>
                        </label>
                    </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Start Interview'
                    )}
                </Button>
            </form>
        </div>
    );
}
