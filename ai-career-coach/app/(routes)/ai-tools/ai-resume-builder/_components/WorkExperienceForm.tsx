"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface WorkExperienceEntry {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface WorkExperienceFormProps {
  data: WorkExperienceEntry[];
  setData: Dispatch<SetStateAction<WorkExperienceEntry[]>>;
}

export default function WorkExperienceForm({ data, setData }: WorkExperienceFormProps) {
  const handleChange = (
    index: number,
    field: keyof WorkExperienceEntry,
    value: string
  ) => {
    setData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value } as WorkExperienceEntry;
      return updated;
    });
  };

  const addWork = () => {
    setData((prev) => [
      ...prev,
      { title: "", company: "", duration: "", description: "" },
    ]);
  };

  const removeWork = (index: number) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold">Work Experience</h2>

      {data.map((work, index) => (
        <div key={index} className="border p-4 rounded-md space-y-3">
          <div>
            <label className="block font-medium mb-1">Company</label>
            <input
              type="text"
              value={work.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Google"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Title / Role</label>
            <input
              type="text"
              value={work.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Duration</label>
            <input
              type="text"
              value={work.duration}
              onChange={(e) => handleChange(index, "duration", e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Jan 2023 - Present"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={work.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              placeholder="Describe your role and responsibilities"
            />
          </div>

          {data.length > 1 && (
            <Button variant="destructive" onClick={() => removeWork(index)}>
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button variant="outline" onClick={addWork}>
        Add Another Work Experience
      </Button>

      {/* Navigation handled by parent if needed */}
    </div>
  );
}
