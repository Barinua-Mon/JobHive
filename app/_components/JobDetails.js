

import { applyToJob } from "@/lib/action";
import { auth } from "../api/auth/[...nextauth]/route";
import SubmitButton from "./SubmitButton";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Zap,
  ListChecks,
  Mail,
  User,
  Calendar,
  Award,
} from "lucide-react";


export default async function JobDetails({ job, searchParams }) {
  const resolvedSearchParams = await searchParams;
  const applied = resolvedSearchParams?.applied;
  const session = await auth();
  const userId = session?.user?.id ? parseInt(session.user.id) : null;
  const hasApplied = userId
    ? (job.applications || []).some((app) => app.applicantId === userId)
    : false;

  const DetailItem = ({ icon: Icon, title, value }) => (
    <div className="flex items-center space-x-2 text-gray-700">
      <Icon className="w-5 h-5 text-amber-500 flex-shrink-0" />
      <span className="font-medium">{title}:</span>
      <span>{value}</span>
    </div>
  );

  const ApplicationForm = () => (
    <section className="p-6 bg-white border border-gray-100 rounded-2xl shadow-md sticky top-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Ready to Apply?</h2>

      {hasApplied ? (
        <p className="text-lg font-semibold text-amber-600 p-3 bg-amber-50 rounded-lg border border-amber-200">
          You have already applied for this job.
        </p>
      ) : applied === "success" ? (
        <p className="text-lg font-semibold text-green-600 p-3 bg-green-50 rounded-lg border border-green-200">
          ✅ Your application has been submitted!
        </p>
      ) : (
        <form action={applyToJob} className="space-y-5">
          <input type="hidden" name="jobId" value={job.id} />

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Cover Letter (optional)
            </label>
            <textarea
              name="coverLetter"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              placeholder="Write a brief cover letter highlighting your fit..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Resume (PDF or DOCX, optional)
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="block w-full text-gray-700 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 transition duration-150"
            />
          </div>

         <SubmitButton>Submit Application</SubmitButton>
        </form>
      )}
    </section>
  );

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-10">
          {/* Job Header */}
          <div className="border-b pb-4 sm:pb-6 mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 leading-snug">
              {job.title}
            </h1>
            <p className="text-lg sm:text-xl text-amber-600 font-semibold">
              {job.company}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
            <span className="flex items-center space-x-1 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium border border-amber-200">
              <Briefcase className="w-4 h-4" />
              <span>{job.employmentType}</span>
            </span>
            <span className="flex items-center space-x-1 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
              <Award className="w-4 h-4" />
              <span>{job.experienceLevel}</span>
            </span>
            <span className="flex items-center space-x-1 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200">
              <Zap className="w-4 h-4" />
              <span>{job.remoteStatus}</span>
            </span>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
            {/* Left Column */}
            <div className="flex flex-col gap-10">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
                  Job Description
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </section>

              {(job.salaryMin || job.salaryMax) && (
                <section className="p-5 bg-green-50 rounded-xl border border-green-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <DollarSign className="w-6 h-6 text-green-600 mr-2" />
                    Compensation Range
                  </h2>
                  <p className="text-2xl font-extrabold text-green-700">
                    {job.salaryMin && `${job.salaryMin} ${job.currency}`}
                    {job.salaryMax &&
                      (job.salaryMin
                        ? ` - ${job.salaryMax} ${job.currency}`
                        : `${job.salaryMax} ${job.currency}`)}
                  </p>
                </section>
              )}

              {job.benefits?.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
                    What We Offer
                  </h2>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start text-gray-700 leading-relaxed"
                      >
                        <ListChecks className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {job.skills?.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-amber-100 hover:text-amber-700 transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column (Sidebar) */}
            <div className="flex flex-col gap-8">

              <section className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                  Job Details
                </h2>
                <DetailItem icon={MapPin} title="Location" value={job.location} />
                <DetailItem icon={Clock} title="Status" value={job.status} />
                <DetailItem
                  icon={Briefcase}
                  title="Department"
                  value={job.department || "N/A"}
                />
                <DetailItem
                  icon={Zap}
                  title="Industry"
                  value={job.industry || "N/A"}
                />
                {job.applicationDeadline && (
                  <DetailItem
                    icon={Calendar}
                    title="Deadline"
                    value={new Date(
                      job.applicationDeadline
                    ).toLocaleDateString()}
                  />
                )}
              </section>

              <section className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <User className="w-5 h-5 text-gray-500 mr-2" />
                  Posted By
                </h2>
                <p className="text-lg font-medium text-gray-800">
                  {job.poster?.name || "Unknown"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Posted on {new Date(job.createdAt).toLocaleDateString()}
                </p>
                {job.contactEmail && (
                  <div className="mt-4 flex items-center">
                    <Mail className="w-4 h-4 text-amber-500 mr-2" />
                    <a
                      href={`mailto:${job.contactEmail}`}
                      className="text-amber-600 font-medium hover:underline text-sm"
                    >
                      {job.contactEmail}
                    </a>
                  </div>
                )}
              </section>
              <ApplicationForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
