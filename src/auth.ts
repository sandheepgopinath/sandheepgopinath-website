import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const ADMIN_EMAIL = "sandheepgopinath@gmail.com";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [Google],
  pages: {
    signIn: "/admin",
    error: "/admin",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return false;

      const googleProfile = profile as { email?: string; email_verified?: boolean } | undefined;
      return (
        googleProfile?.email_verified === true &&
        googleProfile.email?.toLowerCase() === ADMIN_EMAIL
      );
    },
    async authorized({ auth: session }) {
      return session?.user?.email?.toLowerCase() === ADMIN_EMAIL;
    },
  },
});
