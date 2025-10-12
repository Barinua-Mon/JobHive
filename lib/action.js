'use server';

import { auth, signIn } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from 'next/cache';



export async function SignInAction() {
   try {
      await signIn('google', { redirectTo: '/jobs' });
   } catch (error) {
      console.error('Sign-in action error:', error);
      throw error;
   }
}

export async function PostJob(formData) {
   console.log(Object.fromEntries(formData))
   const session = await auth();
   if (!session) throw new Error("You are not logged in. Please login to have access");

   const posterId = parseInt(session.user.id);
   console.log(posterId, formData);

   const title = formData.get("title");
   const company = formData.get("company");
   const location = formData.get("location");
   const description = formData.get("description");
   const remoteStatus = formData.get("remoteStatus");
   const employmentType = formData.get("employmentType");
   const experienceLevel = formData.get("experienceLevel");
   const salaryMax = Number(formData.get("salaryMax")) || null;
   const salaryMin = Number(formData.get("salaryMin")) || null;
   const currency = formData.get("currency");
   //const skills = formData.getAll("skills") || [];
   const skills = formData.get("skills") ? formData.get("skills").split(",").map((s) => s.trim()) : [];
   const benefits = formData.get("benefits") ? formData.get("benefits").split(",").map((b) => b.trim()) : [];
   const department = formData.get("department") || null;
   const industry = formData.get("industry") || null;
   const applicationDeadline = formData.get("applicationDeadline") ? new Date(formData.get("applicationDeadline")) : null;
   const contactEmail = formData.get("contactEmail") || null;


   const job = await prisma.job.create({
      data: {
         title,
         company,
         location,
         posterId,
         description,
         remoteStatus,
         employmentType,
         experienceLevel,
         salaryMax,
         salaryMin,
         currency,
         skills,
         benefits,
         department,
         industry,
         applicationDeadline,
         contactEmail
      }
   })
   console.log(job, "job posted");

   redirect("/jobs/postJob/thankyou");
};

export async function applyToJob(formData) {
   const session = await auth();
   if (!session?.user) {
      redirect("/signIn")
   }
   const jobId = parseInt(formData.get("jobId"));
   const applicantId = parseInt(session?.user?.id);

   if (isNaN(jobId) || isNaN(applicantId)) {
      return { error: "invalid job ID or user ID" }
   };


   // Verify job exists
   const job = await prisma.job.findUnique({
      where: { id: jobId },
   });
   if (!job) {
      return { error: "Job not found" };
   }

   // Check for existing application
   const existingApplication = await prisma.application.findFirst({
      where: { jobId, applicantId },
   });
   if (existingApplication) {
      return { error: "You have already applied to this job" };
   }

   const application = await prisma.application.create({
      data: {
         jobId,
         applicantId
      }
   })
   console.log(application);

   redirect(`/jobs/${jobId}?applied=success`)
}

export async function updateProfile(formData) {

   //Check if the user is authenticated
   const session = await auth();
   if (!session?.user) {
      return null;
   }
   // Get the user ID
   const userId = parseInt(session.user.id);
   if (isNaN(userId)) {
      return { error: "Invalid user ID" }
   }

   if (formData === undefined || formData === null) {
      console.error("formData is undefined or null");
      return { error: "No form data received. Please ensure all fields are filled and try again." };
   }

   const name = formData.get("name")?.toString() || null;
   const image = formData.get("image")?.toString() || null;
   const role = formData.get("role")?.toString();

   //Validate Role
   const ValidateRoles = ["APPLICANT", "POSTER"];
   if (role && !ValidateRoles.includes(role)) {
      return { error: "Invalid role. Must be 'APPLICANT' or 'POSTER'" }
   }

   try {
      //Update user in DataBase
      const updatedUser = await prisma.user.update({
         where: { id: userId },
         data: {
            name: name || undefined,
            image: image || undefined,
            role: role || undefined
         }
      });

      if (!updatedUser) {
         console.error("No user updated for ID:", userId);
         return { error: "Failed to update profile" };
      }

      console.log("Updated user:", updatedUser);
      //Revalidating the user tag, account page and the root layout page to reflect the updated data
      revalidatePath("/account");
      revalidatePath("/")
      revalidateTag(`${session?.user.name}`);
      return { success: true, user: updatedUser, message: "Profile successfully updated." };


   } catch (error) {
      console.error("updateProfile error:", error);
      return { error: error.message || "Failed to update profile" };
   }
}