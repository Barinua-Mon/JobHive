'use client';

export default function ErrorFallback({ message }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="bg-gray-200 shadow-lg rounded-xl p-8 text-center max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Oops! Something went wrong 😕
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message || "We couldn’t connect to the database. Please check your network connection and try again later."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.03]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
