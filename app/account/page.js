import { auth } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";
import AccountForm from "@/app/_components/AccountForm";
import { getCachedUser } from "@/lib/supabase";

export const revalidate = 3600;

export default async function AccountPage() {
  const session = await auth();

  // If completely logged out
  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 text-center p-6">
        <Image
          src="/illustrations/login-prompt.svg"
          alt="Login required"
          width={180}
          height={180}
          className="mb-6 opacity-90"
        />
        <p className="text-lg text-gray-700 mb-4 font-medium">
          You need to log in to access your account page.
        </p>
        <Link
          href="/signIn"
          className="px-6 py-3 bg-amber-600 text-white rounded-lg shadow-md hover:bg-amber-700 transition duration-200 font-semibold"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Fetch user data
  const userId = session?.user.id;
  const { user, error } = await getCachedUser(userId);

    
  if (!user || error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Oops! Something went wrong 😕
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Database could not be reached. Please check your network connection and try again later.
          </p>
          <a
            href="/account"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.03]"
          >
            Try Again
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10">
      {/* Profile Section */}
      {user ? (
        <section className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-6">
          <Image
            src={ "/ai.webp"
            }
            alt={user?.name || "user profile image"}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
              {user.role}
            </span>
          </div>
        </section>
      ) : (
        <section className="bg-white shadow-md rounded-2xl p-8 text-center">
          <Image
            src="/illustrations/guest.svg"
            alt="Guest Profile"
            width={100}
            height={100}
            className="mx-auto mb-4 opacity-90"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Guest User
          </h2>
          <p className="text-gray-600 mb-4">
            You are browsing as a guest. Please log in to access your profile and manage your account.
          </p>
          <Link
            href="/login"
            className="inline-block px-5 py-2 bg-amber-600 text-white rounded-lg shadow-md hover:bg-amber-700 transition duration-200"
          >
            Log In
          </Link>
        </section>
      )}

      {/* Edit Profile Form */}
      <section className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
        <AccountForm user={user} />
      </section>

      {/* Jobs Posted */}
      {user.role === "POSTER" && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Jobs You Posted</h2>
          {user.jobPosting.length > 0 ? (
            <ul className="space-y-3">
              {user.jobPosting.map((job) => (
                <li key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800">{job.title}</h3>
                    <p className="text-gray-600 text-sm">{job.company}</p>
                  </div>
                  <Link href={`/jobs/${job.id}`} className="text-amber-600 hover:underline">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You haven’t posted any jobs yet.</p>
          )}
        </section>
      )}

      {/* Applications */}
      {user.role === "APPLICANT" && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Applications</h2>
          {user.applications.length > 0 ? (
            <ul className="space-y-3">
              {user.applications.map((app) => (
                <li key={app.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800">{app.job.title}</h3>
                    <p className="text-gray-600 text-sm">{app.job.company}</p>
                    <p className="text-sm text-gray-500">
                      Applied on {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link href={`/jobs/${app.jobId}`} className="text-amber-600 hover:underline">
                    View Job
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You haven’t applied for any jobs yet.</p>
          )}
        </section>
      )}
    </main>
  );
}
