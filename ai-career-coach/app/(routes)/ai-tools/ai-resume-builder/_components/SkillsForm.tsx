"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface SkillsFormProps {
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    core: string[];
  };
  setSkills: Dispatch<SetStateAction<{
    languages: string[];
    frameworks: string[];
    tools: string[];
    core: string[];
  }>>;
  certifications: string[];
  setCertifications: Dispatch<SetStateAction<string[]>>;
  achievements: string[];
  setAchievements: Dispatch<SetStateAction<string[]>>;
}

export default function SkillsForm({ skills, setSkills, certifications, setCertifications, achievements, setAchievements }: SkillsFormProps) {

  const handleSkillCategoryChange = (
    category: keyof typeof skills,
    index: number,
    value: string
  ) => {
    setSkills((prev) => {
      const updated = { ...prev };
      const arr = [...updated[category]];
      arr[index] = value;
      return { ...updated, [category]: arr };
    });
  };

  const addSkillItem = (category: keyof typeof skills) => {
    setSkills((prev) => ({ ...prev, [category]: [...prev[category], ""] }));
  };

  const removeSkillItem = (category: keyof typeof skills, index: number) => {
    setSkills((prev) => ({ ...prev, [category]: prev[category].filter((_, i) => i !== index) }));
  };

  const handleArrayChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => setter((prev) => [...prev, ""]);

  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => setter((prev) => prev.filter((_, i) => i !== index));

  const handleRegenerate = () => {
    console.log("Regenerate skills/achievements from AI");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold">Step 6: Skills / Certifications / Achievements</h2>

      {/* Skills - Categorized */}
      <div className="space-y-4">
        <h3 className="font-semibold">Skills</h3>
        {([
          { key: "languages", label: "Languages" },
          { key: "frameworks", label: "Frameworks & Libraries" },
          { key: "tools", label: "Technologies & Tools" },
          { key: "core", label: "Core Components" },
        ] as const).map(({ key, label }) => (
          <div key={key} className="space-y-2">
            <label className="block font-medium">{label}</label>
            {skills[key].map((skill, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillCategoryChange(key, index, e.target.value)}
                  className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Add ${label.toLowerCase()}`}
                />
                {skills[key].length > 0 && (
                  <Button variant="destructive" onClick={() => removeSkillItem(key, index)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={() => addSkillItem(key)}>Add {label.split(" ")[0]}</Button>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="space-y-2">
        <h3 className="font-semibold">Certifications</h3>
        {certifications.map((cert, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={cert}
              onChange={(e) => handleArrayChange(setCertifications, index, e.target.value)}
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter certification"
            />
            {certifications.length > 1 && (
              <Button variant="destructive" onClick={() => removeItem(setCertifications, index)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline" onClick={() => addItem(setCertifications)}>Add Certification</Button>
      </div>

      {/* Achievements */}
      <div className="space-y-2">
        <h3 className="font-semibold">Achievements</h3>
        {achievements.map((ach, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={ach}
              onChange={(e) => handleArrayChange(setAchievements, index, e.target.value)}
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter achievement"
            />
            {achievements.length > 1 && (
              <Button variant="destructive" onClick={() => removeItem(setAchievements, index)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline" onClick={() => addItem(setAchievements)}>Add Achievement</Button>
      </div>

      <div className="mt-4">
        <Button variant="outline" onClick={handleRegenerate}>
          Regenerate from AI
        </Button>
      </div>
    </div>
  );
}
