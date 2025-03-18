//pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
export default NextAuth({
  providers: [
    // Providers here
  ],
  callbacks: {
    async jwt({ token }) {
      //console.log("JWT Token: ", token);
      return token;
    },
    async session({ session, token, user }) {
      //console.log("Session: ", session);
      return session;
    }
  },
  debug: true, // Enable debug logs
})