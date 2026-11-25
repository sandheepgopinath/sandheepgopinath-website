import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const ADMIN_EMAIL = "sandheepgopinath@gmail.com";

const useSecureCookies = process.env.NODE_ENV === "production" || process.env.AUTH_URL?.startsWith("https://");

export const { handlers, auth, signIn, signOut } = NextAuth({
  basePath: "/api/auth",
  trustHost: true,
  providers: [
    Google({
      checks: ["none"],
    }),
  ],
  cookies: {
    sessionToken: {
      name: "__session",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },
  pages: {
    signIn: "/admin",
    error: "/admin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {
        // fallback
      }
      return `${baseUrl}/admin`;
    },
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
