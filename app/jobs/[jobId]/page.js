import JobDetails from "@/app/_components/JobDetails";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Map from "@/app/_components/Map";
import { getcachedJobId } from "@/lib/supabase";
import ErrorFallback from "@/app/_components/ErrorFallback";


//Set revalidate time for the page in secs
export const revalidate = 1800;


export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const jobId = parseInt(resolvedParams.jobId);

  if (isNaN(jobId)) {
    return { title: "Job not found" }
  }

  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return { title: "Job not found" };
    }

    return { title: `Apply | ${job.title}` };
  } catch (err) {
    //console.error("Error fetching job for metadata:", err.message);
    return { title: "Job not found" };
  }

};


export async function generateStaticParams() {
  try {
    const jobs = await prisma.job.findMany();
    const ids = jobs.map((job) => ({ jobId: String(job.id) }));
    return ids;
  } catch (err) {
    console.log("generateStaticParams error:", err.message);
    return []; // Allow build to continue
  }
}

export default async function page({ params, searchParams }) {
  const resolvedParams = await params;
  const jobId = parseInt(resolvedParams.jobId);
  if (isNaN(jobId)) {
    return notFound()
  }

  const { job, error } = await getcachedJobId(jobId);
  //console.log(job);

  if (!job || error) {
  return (
    <ErrorFallback
      message="Database could not be reached. Please check your network connection and try again later."
    />
  );
}




  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        {/* Job Details Card */}
        <div className="">
          <JobDetails job={job} searchParams={searchParams} />
        </div>
        {/* Map Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Location</h2>
          <Map jobTitle={job?.location} />
        </div>
      </div>
    </div>
  );
}
