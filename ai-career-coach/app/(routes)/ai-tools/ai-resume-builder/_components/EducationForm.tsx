"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface EducationEntry {
  institution: string;
  degree: string;
  year: string;
}

interface EducationFormProps {
  data: EducationEntry[];
  setData: Dispatch<SetStateAction<EducationEntry[]>>;
}

export default function EducationForm({ data, setData }: EducationFormProps) {
  const handleChange = (index: number, field: keyof EducationEntry, value: string) => {
    setData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value } as EducationEntry;
      return updated;
    });
  };

  const addEducation = () => {
    setData((prev) => [...prev, { institution: "", degree: "", year: "" }]);
  };

  const removeEducation = (index: number) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold">Education</h2>

      {data.map((edu, index) => (
        <div key={index} className="border p-4 rounded-md space-y-3">
          <div>
            <label className="block font-medium mb-1">Institution</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => handleChange(index, "institution", e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Stanford University"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Degree</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. B.Tech in Computer Science"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Year</label>
            <input
              type="text"
              value={edu.year}
              onChange={(e) => handleChange(index, "year", e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 2024"
            />
          </div>

          {data.length > 1 && (
            <Button variant="destructive" onClick={() => removeEducation(index)}>
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button variant="outline" onClick={addEducation}>
        Add Another Education
      </Button>

      {/* Navigation handled by parent if needed */}
    </div>
  );
}
