import Link from "next/link";

export default function Thankyou() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🎉 Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your Job has been posted successfully.
        </p>
        <Link
          href="/jobs"
          className="inline-block px-6 py-3  bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition-colors duration-200  font-medium  "
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
