"use client"


import { useFormStatus } from "react-dom";

export default function SubmitButton({children}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full bg-amber-600 text-white px-5 py-2 rounded-lg shadow-md transition ${
        pending ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-700"
      }`}
    >
      {pending ? "Saving..." : children}
    </button>
  );
}