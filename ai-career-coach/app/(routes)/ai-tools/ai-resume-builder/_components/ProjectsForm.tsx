"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface ProjectEntry {
  title: string;
  link?: string;
  description: string[];
}

interface ProjectsFormProps {
  data: ProjectEntry[];
  setData: Dispatch<SetStateAction<ProjectEntry[]>>;
}

export default function ProjectsForm({ data, setData }: ProjectsFormProps) {
  const handleChange = (
    index: number,
    field: keyof ProjectEntry,
    value: string
  ) => {
    setData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value } as ProjectEntry;
      return updated;
    });
  };

  const handleDescriptionChange = (projIndex: number, descIndex: number, value: string) => {
    setData((prev) => {
      const updated = [...prev];
      const descs = [...(updated[projIndex].description || [])];
      descs[descIndex] = value;
      updated[projIndex] = { ...updated[projIndex], description: descs };
      return updated;
    });
  };

  const addDescription = (projIndex: number) => {
    setData((prev) => {
      const updated = [...prev];
      const descs = [...(updated[projIndex].description || [])];
      descs.push("");
      updated[projIndex] = { ...updated[projIndex], description: descs };
      return updated;
    });
  };

  const removeDescription = (projIndex: number, descIndex: number) => {
    setData((prev) => {
      const updated = [...prev];
      const descs = [...(updated[projIndex].description || [])].filter((_, i) => i !== descIndex);
      updated[projIndex] = { ...updated[projIndex], description: descs };
      return updated;
    });
  };

  const addProject = () => {
    setData((prev) => [...prev, { title: "", link: "", description: [""] }]);
  };

  const removeProject = (index: number) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold">Projects</h2>

      {data.map((project, index) => (
        <div key={index} className="border p-4 rounded-md space-y-3">
          <div>
            <label className="block font-medium mb-1">Project Title</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Project title"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium mb-1">Description (bullet points)</label>
            {(project.description || []).map((desc, dIndex) => (
              <div key={dIndex} className="flex gap-2">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, dIndex, e.target.value)}
                  className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What did you build/achieve?"
                />
                {(project.description?.length || 0) > 1 && (
                  <Button variant="destructive" onClick={() => removeDescription(index, dIndex)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={() => addDescription(index)}>Add point</Button>
          </div>

          <div>
            <label className="block font-medium mb-1">Project Link (optional)</label>
            <input
              type="url"
              value={project.link}
              onChange={(e) => handleChange(index, "link", e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. https://github.com/username/project"
            />
          </div>

          <div className="flex gap-2 mt-2">
            {data.length > 1 && (
              <Button variant="destructive" onClick={() => removeProject(index)}>
                Remove
              </Button>
            )}
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={addProject}>
        Add Another Project
      </Button>

      {/* Navigation handled by parent if needed */}
    </div>
  );
}
