"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-500">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
