// app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to JobHive
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        JobHive is a modern job board where employers can post opportunities
        and job seekers can find their next role in tech. Browse jobs, apply
        easily, and connect with top companies.
      </p>
      <Link
        href="/jobs"
        className="px-6 py-3 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 transition"
      >
        View Jobs
      </Link>
    </main>
  );
}
