"use client";
import { Dispatch, SetStateAction } from "react";

interface Props {
  data: string;
  setData: Dispatch<SetStateAction<string>>;
}

export default function CareerObjectiveForm({ data, setData }: Props) {

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
  <h2 className="text-2xl font-bold">Career Objective</h2>

      <div>
        <label className="block font-medium mb-1">Your Career Objective</label>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Write your career objective..."
          className="w-full border rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
