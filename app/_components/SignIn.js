import { signIn } from "@/lib/auth";

export default function SignIn() {
    return (
        <form action={async () => {
            await signIn("google")
        }}>
            <button type="submit">signIn with Google</button>
        </form>
    );
}