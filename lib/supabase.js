import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

export const getCachedJobs = unstable_cache(
    async () => {
        try {
            const jobs = await prisma.job.findMany({
                select: {
                    id: true,
                    location: true,
                    title: true,
                    employmentType: true,
                    company: true,
                }
            });
           // console.log(jobs);
            return {jobs, error: null};
        } catch (err) {
            //console.log("⚠️ Error fetching jobs:", err?.message);
            return {jobs: null, error: err.message};
        }
    },
    ["jobs"], // Cache key
    { revalidate: 1800, tags: ["jobs"] } // Cache for 1 hour, tag for invalidation
);


export const getcachedJobId = unstable_cache(
    async (jobId) => {
        try {
            const job = await prisma.job.findUnique({
                where: { id: parseInt(jobId) },
                include: { poster: true, applications: true },
            });
            //console.log("Fetched job:", job);
            return { job, error: null };
        } catch (err) {
            //console.log("⚠️ Error fetching job:", err.message);
            return { job: null, error: err.message };
        }
    },
    ["job"],
    { revalidate: 1800, tags: ["job"] }
);

export const getCachedUser = unstable_cache(
  async (userId) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        include: {
          jobPosting: true,
          applications: { include: { job: true } },
        },
      });
     //console.log(user);
      return {user, error: null};

    } catch (err) {
      //console.log("Auth error in getCachedUser session", err?.message);
      return {user: null, error: err.message};
    }
  },
  ["user"], //cache key
  { revalidate: 1800, tags: ["user"] } //cache after 1 hour 
)