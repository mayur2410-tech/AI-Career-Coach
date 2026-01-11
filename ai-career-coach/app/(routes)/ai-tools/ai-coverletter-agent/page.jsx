// "use client"
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { useState } from "react";
// export default function CoverLetterGenerator() {

// const [jobTitle, setJobTitle] = useState('');
// const [companyName, setCompanyName] = useState('');
// const [jobDescription, setJobDescription] = useState('');
// const [resumeFile, setResumeFile] = useState()
// const [loading, setLoading] = useState(false);

// const onFileChange = (e) => {
//         const file = e.target.files?.[0];
//         if(file){
//             console.log("file:",file.name)
//             setResumeFile(file)
//         }
//     }



// const generateCoverLetter = async () => {
//   if(!resumeFile || !jobTitle || !companyName || !jobDescription) return;

//   setLoading(true);

//   const formData = new FormData();
//   formData.append('resumeFile', resumeFile);
//   formData.append('jobTitle', jobTitle);
//   formData.append('companyName', companyName);
//   formData.append('jobDescription', jobDescription);

//   try {
//     const result = await axios.post('/api/ai-coverletter-agent', formData);
//     console.log("Full response:", result.data); // { coverLetter: "...", success: true }
// console.log("Cover Letter:", result.data.coverLetter); 
// if (result.data.coverLetter) {
//   console.log("Cover letter generated successfully.");
// } else {
//   console.log("Cover letter is still generating, please wait...");
// }

//     // You can update the preview pane with result.data.coverLetter
//   } catch(err) {
//     console.error("Error generating cover letter:", err);
//   } finally {
//     setLoading(false);
//   }
// }


//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
//       {/* Left Side - Form */}
//       <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
//         <h1 className="text-2xl font-bold">AI Cover Letter Generator</h1>

//         <div className="space-y-4">
//           <div>
//             <label className="block font-medium mb-1">Job Title</label>
//             <input 
//               type="text" 
//               value={jobTitle}
//               placeholder="e.g Frontend Developer" 
//               className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={e => setJobTitle(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">Company Name</label>
//             <input 
//               type="text" 
//               value={companyName}
//               placeholder="e.g Google" 
//               className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={e => setCompanyName(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">Job Description</label>
//             <textarea
//               placeholder="Paste the job description here..."
//               value={jobDescription}
//               className="w-full border rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={e => setJobDescription(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">Upload Resume</label>
// <input 
//   type="file" 
//   className="w-full border rounded-md p-2 cursor-pointer"
//   accept='application/pdf'
//   onChange={onFileChange}
// />

//           </div>

//           <Button className="w-full text-base" onClick={generateCoverLetter} disabled={loading || !resumeFile || !jobTitle || !companyName || !jobDescription}>
//             {loading ? <Loader2 className="animate-spin" /> : "Generate Cover Letter"}
//           </Button>
//         </div>
//       </div>

//       {/* Right Side - Preview */}
//       <div className="bg-gray-50 p-6 rounded-xl shadow-md h-[80vh] overflow-y-auto space-y-4">
//         <h2 className="text-2xl font-bold mb-4">Cover Letter Preview</h2>

//         <div className="bg-white p-4 rounded-lg border space-y-4">
//           <p>Dear Hiring Manager,</p>
//           <p>
//             I am excited to apply for the [Job Title] position at [Company Name]. With hands-on experience in React.js and full-stack development, I have built responsive, high-performing interfaces aligned with modern web standards...
//           </p>
//           <p>Sincerely,</p>
//           <p>[Candidate Name]</p>
//         </div>

//         <div className="flex gap-4 mt-4">
//                     <Button  className="w-full text-base"> Download as PDF</Button>
//                  <Button variant="outline" className="w-full text-base"> Copy to Clipboard</Button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function CoverLetterGenerator() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState();
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  }

  const generateCoverLetter = async () => {
    if (!resumeFile || !jobTitle || !companyName || !jobDescription) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('resumeFile', resumeFile);
    formData.append('jobTitle', jobTitle);
    formData.append('companyName', companyName);
    formData.append('jobDescription', jobDescription);

    try {
      await axios.post('/api/ai-coverletter-agent', formData);
      // After POST, fetch the latest saved cover letter
      fetchLatestCoverLetter();
    } catch (err) {
      console.error("Error generating cover letter:", err);
    } finally {
      setLoading(false);
    }
  }

  // Fetch latest saved cover letter from DB
  const fetchLatestCoverLetter = async () => {
    try {
      const res = await axios.get('/api/coverletter/latest');
      if (res.data && res.data.length > 0) {
        setCoverLetter(res.data[0].coverLetter_Text);
      }
    } catch (err) {
      console.error("Error fetching latest cover letter:", err);
    }
  }

  // Fetch on initial load
  useEffect(() => {
    fetchLatestCoverLetter();
  }, []);

  const handleCopy = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Left Side - Form */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold">AI Cover Letter Generator</h1>

        <div className="space-y-4">
          <input
            type="text"
            value={jobTitle}
            placeholder="Job Title"
            className="w-full border rounded-md p-2"
            onChange={e => setJobTitle(e.target.value)}
          />
          <input
            type="text"
            value={companyName}
            placeholder="Company Name"
            className="w-full border rounded-md p-2"
            onChange={e => setCompanyName(e.target.value)}
          />
          <textarea
            value={jobDescription}
            placeholder="Job Description"
            className="w-full border rounded-md p-2 h-32"
            onChange={e => setJobDescription(e.target.value)}
          />
          <input
            type="file"
            accept="application/pdf"
            className="w-full border rounded-md p-2"
            onChange={onFileChange}
          />
          <Button
            onClick={generateCoverLetter}
            className="w-full"
            disabled={loading || !resumeFile || !jobTitle || !companyName || !jobDescription}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Generate Cover Letter"}
          </Button>
        </div>
      </div>

      {/* Right Side - Preview */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Cover Letter Preview</h2>
        <div className="bg-white p-4 rounded-lg border space-y-4 min-h-[300px] flex flex-col justify-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center w-full h-full p-10">
              <Loader2 className="animate-spin h-10 w-10 text-primary mb-2" />
              <p className="text-gray-500 font-medium">Generating Cover Letter...</p>
            </div>
          ) : coverLetter ? (
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{coverLetter}</pre>
          ) : (
            <p className="text-center text-gray-400">No cover letter available yet.</p>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <Button className="w-full text-base">Download as PDF</Button>
          <Button
            variant="outline"
            className="w-full text-base"
            onClick={handleCopy}
            disabled={!coverLetter || loading}
          >
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </div>
      </div>
    </div>
  );
}
