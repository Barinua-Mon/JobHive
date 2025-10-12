import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt", // Use JWT strategy
    //maxAge: 24 * 60 * 60 // 1 day
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
   signIn :"/signin"
  },

  callbacks: {
    async authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        if (!user.email || !account) {
          console.error("Missing user email or account data:", { user, account });
          return false;
        }

        // Check if a user exists with the given email
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // If no user exists, the Prisma adapter will create one automatically
        // If a user exists, ensure the Google account is linked
        if (existingUser && account.provider === "google") {
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          });

          if (!existingAccount) {
            // Link the Google account to the existing user
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                accessTokenExpires: account.expires_at
                  ? new Date(account.expires_at * 1000)
                  : null,
              },
            });
          }
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      // Initial sign-in: Add user data to the JWT
      if (user && account) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    
    async session({ session, token }) {
      // Pass user data from the JWT to the session
      // if (token) {
      //   session.user.id = token.id;
      //   session.user.email = token.email;
      //   session.user.name = token.name;
      //   session.user.role = token.role
      // }

      
      if(token.id){
        const dbUser = await prisma.user.findUnique({
          where: {id: parseInt(token.id)},
          select: {name: true, email: true, image: true, role: true, id: true}
        });

        if(dbUser){
          session.user.id = dbUser.id;
          session.user.role = dbUser.role;
          session.user.name = dbUser.name;
          session.user.email = dbUser.email;
          session.user.image = dbUser.image
        }
      }
       return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

export const { GET, POST } = handlers;