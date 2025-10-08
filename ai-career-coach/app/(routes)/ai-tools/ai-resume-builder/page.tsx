"use client";
import { useState } from "react";

import PersonalInfoForm from "./_components/PersonalInfoForm";
import CareerObjectiveForm from "./_components/CareerObjectiveForm";
import EducationForm from "./_components/EducationForm";
import WorkExperienceForm from "./_components/WorkExperienceForm";
import ProjectsForm from "./_components/ProjectsForm";
import SkillsCertificationsForm from "./_components/SkillsForm";
import PreviewResume from "./_components/PreviewResume";

export default function ResumeBuilderPage() {
  // State for all sections
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: ""
  });

  const [careerObjective, setCareerObjective] = useState("");
  const [education, setEducation] = useState<{ degree: string; institution: string; year: string }[]>([]);
  const [workExperience, setWorkExperience] = useState<{ title: string; company: string; duration: string; description: string }[]>([]);
  const [projects, setProjects] = useState<{ title: string; link?: string; description: string[] }[]>([]);
  // Categorized skills
  const [skills, setSkills] = useState<{
    languages: string[];
    frameworks: string[]; // Frameworks & Libraries
    tools: string[]; // Technologies & Tools
    core: string[]; // Core Components
  }>({ languages: [], frameworks: [], tools: [], core: [] });
  const [certifications, setCertifications] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [includeWorkExperience, setIncludeWorkExperience] = useState<boolean>(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Left side - Forms */}
      <div className="space-y-6">
        <PersonalInfoForm data={personalInfo} setData={setPersonalInfo} />
        <CareerObjectiveForm data={careerObjective} setData={setCareerObjective} />
        <EducationForm data={education} setData={setEducation} />
        {/* Work Experience Toggle */}
        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <h3 className="font-semibold">Include Work Experience</h3>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeWorkExperience}
              onChange={(e) => setIncludeWorkExperience(e.target.checked)}
            />
            {includeWorkExperience ? "Shown in preview" : "Hidden from preview"}
          </label>
        </div>
        {includeWorkExperience && (
          <WorkExperienceForm data={workExperience} setData={setWorkExperience} />
        )}
        <ProjectsForm data={projects} setData={setProjects} />
        <SkillsCertificationsForm
          skills={skills}
          setSkills={setSkills}
          certifications={certifications}
          setCertifications={setCertifications}
          achievements={achievements}
          setAchievements={setAchievements}
        />
      </div>

      {/* Right side - Live Preview */}
      <PreviewResume
        personalInfo={personalInfo}
        careerObjective={careerObjective}
        education={education}
        workExperience={workExperience}
        projects={projects}
        skills={skills}
        certifications={certifications}
        achievements={achievements}
        includeWorkExperience={includeWorkExperience}
      />
    </div>
  );
}
