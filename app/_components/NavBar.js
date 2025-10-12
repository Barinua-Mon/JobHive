
import Link from "next/link";
import Image from "next/image";
import { auth } from '@/app/api/auth/[...nextauth]/route';
import ErrorFallback from "./ErrorFallback";


export default async function NavBar() {
  let session;
  
    session = await auth();
    
    if(!session){
      return <ErrorFallback message="You are not loggedIn or there is a session misconfiguration. Please check your internet connection, or loginIn if you have'nt."/>
    }

  const firstName = session.user?.name.split(' ').at(0);
  console.log(firstName);


  return (
    <nav className="w-full fixed top-0 z-50 bg-white/20 backdrop-blur-md shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Logo and Name */}
      <Link href="/" className="flex items-center gap-2">
        <h1 className=" italic text-2xl font-bold text-amber-800  hover:text-amber-700 transition">JobHive</h1>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link
          href="/jobs"
          className="text-gray-700 hover:text-amber-600 transition"
        >
          Jobs
        </Link>
        <Link
          href="/jobs/postJob"
          className="text-gray-700 hover:text-amber-600 transition"
        >
          PostJob
        </Link>
        <Link
          href="/blog"
          className="text-gray-700 hover:text-amber-600 transition"
        >
          Blog
        </Link>

        {/* Auth */}
        {session?.user ? (
          <Link href="/account" className="flex items-center gap-2 rounded-full">
            <Image
              src={ "/ai.webp"}
              alt={session?.user?.name || "User Profile"}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="text-xl font-bold text-gray-800">{firstName}</span>
          </Link>
        ) : (
          <Link
            href="/signIn"
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
