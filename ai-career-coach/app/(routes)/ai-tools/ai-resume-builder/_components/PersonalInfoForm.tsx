// app/resume-builder/components/PersonalInfoForm.tsx
import { Dispatch, SetStateAction } from "react";

export interface PersonalInfoFormProps {
  data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  setData: Dispatch<
    SetStateAction<{
      name: string;
      email: string;
      phone: string;
      address: string;
      linkedin: string;
      github: string;
      portfolio: string;
    }>
  >;
}

export default function PersonalInfoForm({ data, setData }: PersonalInfoFormProps) {
  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg">Personal Information</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        className="w-full border rounded p-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        placeholder="Phone"
        value={data.phone}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        placeholder="Address"
        value={data.address}
        onChange={(e) => setData({ ...data, address: e.target.value })}
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        placeholder="LinkedIn"
        value={data.linkedin}
        onChange={(e) => setData({ ...data, linkedin: e.target.value })}
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        placeholder="GitHub"
        value={data.github}
        onChange={(e) => setData({ ...data, github: e.target.value })}
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        placeholder="Portfolio"
        value={data.portfolio}
        onChange={(e) => setData({ ...data, portfolio: e.target.value })}
        className="w-full border rounded p-2"
      />
    </div>
  );
}
