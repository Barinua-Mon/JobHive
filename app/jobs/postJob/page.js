import Link from "next/link";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import PostCard from "@/app/_components/PostCard";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await auth();
    if (!session?.user) redirect("/signIn");

    return (
        <div>
            {session.user.role !== "POSTER" ? (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <p className="text-lg text-gray-600 mb-4">You are not an employer, hence not authorized for this page. </p>
                    <Link
                        href="/account"
                        className="px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition-colors duration-200"
                    >
                        Back to Account
                    </Link>
                </div>
            ) : (
                <PostCard />
            )
            }
        </div>
    );
}