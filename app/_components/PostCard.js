

import { PostJob } from "@/lib/action";

export default function PostCard() {
  
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Post a New Job
          </h1>

          <form action={PostJob} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="e.g., Frontend Developer"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                required
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="Detailed job description..."
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="e.g., Tech Corp"
              />
            </div>

            {/* Location + Remote Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="e.g., Lagos, Nigeria"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Remote Status
                </label>
                <select
                  name="remoteStatus"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            {/* Employment Type + Experience Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Permanent">Permanent</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option value="">Select level</option>
                  <option value="Entry-level">Entry-level</option>
                  <option value="Mid-level">Mid-level</option>
                  <option value="Senior">Senior</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
            </div>

            {/* Salary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="number"
                name="salaryMin"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="Min Salary"
              />
              <input
                type="number"
                name="salaryMax"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="Max Salary"
              />
              <input
                type="text"
                name="currency"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="e.g., USD, NGN"
              />
            </div>

            {/* Skills + Benefits */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Benefits (comma-separated)
              </label>
              <input
                type="text"
                name="benefits"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="e.g., Health Insurance, Remote Work"
              />
            </div>

            {/* Department + Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="department"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="Department (optional)"
              />
              <input
                type="text"
                name="industry"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="Industry (optional)"
              />
            </div>

            {/* Deadline + Contact Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                name="applicationDeadline"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <input
                type="email"
                name="contactEmail"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="Contact email (optional)"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    
  );
}
