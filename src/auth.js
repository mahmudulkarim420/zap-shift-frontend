import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("AUTH_DEBUG: Attempting login for", credentials.email);
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (res.data && res.data.success) {
            const backendData = res.data.data;
            const token = res.data.token || backendData?.token;
            const user = backendData?.user || backendData;

            if (user && token) {
              return {
                id: user._id || user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image,
                phone: user.phone || "",
                accessToken: token
              };
            }
          }
          return null;
        } catch (error) {
          console.error("AUTH_DEBUG: Error during authorize", error.response?.data || error.message);
          throw new Error(error.response?.data?.message || "Invalid credentials");
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const idToken = account.id_token;
          if (!idToken) {
            console.error("Google sign-in error: No id_token provided by Google account");
            return false;
          }

          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google-login`, {
            idToken,
          });

          if (response.data && response.data.success) {
            const backendData = response.data.data;
            user.accessToken = response.data.token || backendData?.token;
            user.id = backendData?.id || backendData?._id || backendData?.user?.id || backendData?.user?._id;
            user.role = backendData?.role || backendData?.user?.role || "user";
            user.image = backendData?.image || backendData?.user?.image || user.image;
            user.phone = backendData?.phone || backendData?.user?.phone || "";
            return true;
          }
          return false;
        } catch (error) {
          console.error("Express backend Google sync failed:", error.response?.data?.message || error.message);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      // On initial sign-in: persist user fields into the token
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.id = user.id;
        token.image = user.image;
        token.phone = user.phone || "";
      }
      // Handle session.update() calls from the client
      if (trigger === "update" && session) {
        if (session.name)  token.name  = session.name;
        if (session.image !== undefined) token.image = session.image;
        if (session.phone !== undefined) token.phone = session.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken   = token.accessToken;
        session.user.role     = token.role;
        session.user.id       = token.id;
        session.user.image    = token.image;
        session.user.phone    = token.phone;
        // Sync name if updated
        if (token.name) session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
});
