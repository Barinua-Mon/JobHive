import { SignInAction } from "@/lib/action";
import Image from "next/image";

export default function SignupPage() {
  return (
    <form action={SignInAction}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold mb-6">Create your account</h1>

          {/* Google Signup Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg bg-white border hover:bg-gray-50 transition"
          >
            <Image
              src="https://authjs.dev/img/providers/google.svg" // place google.svg inside /public
              alt="Google"
              width={24}
              height={24}
            />
            <span className="font-medium text-gray-700">Sign up with Google</span>
          </button>
        </div>
      </div>
    </form>
  );
}
