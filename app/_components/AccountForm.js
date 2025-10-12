"use client"


import { useState } from "react";
import { updateProfile } from "@/lib/action";
import SubmitButton from "./SubmitButton";



export default function AccountForm({ user }) {
  const [response, setResponse] = useState({ error: null, success: false, message: null });
  console.log(response);

  // Handle form submission response
  const handleSubmit = async (formData) => {
    console.log("Client-side formData:", Object.fromEntries(formData));
    try {
      const result = await updateProfile(formData);
      setResponse(result);
    } catch (error) {
      setResponse({ error: error.message || "Failed to submit form", success: false });
    }
  };

  return (
    <div className="space-y-4">
      {response?.error && <p className="text-red-600 text-sm">{response.error}</p>}
      {response?.success && <p className="text-green-600 text-sm">{response.message}</p>}
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user?.name || ""}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={user?.image || ""}
            placeholder="https://example.com/avatar.png"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            defaultValue={user?.role || "APPLICANT"}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="APPLICANT">Applicant</option>
            <option value="POSTER">Poster</option>
          </select>
        </div>
        <SubmitButton>Save changes</SubmitButton>
      </form>
    </div>
  );
}