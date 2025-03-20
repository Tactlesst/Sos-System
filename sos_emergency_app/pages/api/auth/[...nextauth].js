import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "Enter phone" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("Missing phone or password");
        }

        try {
          const [users] = await pool.execute(
            "SELECT * FROM users WHERE phone = ?",
            [credentials.phone]
          );

          const user = users[0];

          if (!user) {
            throw new Error("User not found");
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            throw new Error("Invalid password");
          }

          // Remove password from returned user data
          const { password: _password, ...userWithoutPassword } = user;
          return userWithoutPassword;

        } catch (error) {
          console.error("Database error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Ensures session is stored as JWT
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure users are redirected to the dashboard after login
      return url === "/setup" ? `${baseUrl}/dashboard` : url;
    },
  },
  pages: {
    signIn: "/setup", // Login page
  },
  debug: false, // Disable debug mode in production
});
