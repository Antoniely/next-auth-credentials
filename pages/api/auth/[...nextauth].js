import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "Custom Provider",
      async authorize(credentials, req) {
        try {
          const URL = "https://61da90164593510017aff598.mockapi.io/login";
          const response = await axios.get(URL);

          if (response) {
            console.log(credentials.email, credentials.password);
            return response.data[0];
          }

          // login failed
          return null;
        } catch (e) {
          const errorMessage = e.response.data.message;
          // Redirecting to the login page with error message          in the URL
          throw new Error(errorMessage + "&email=" + credentials.email);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
  secret: process.env.JWT_SIGNING_PRIVATE_KEY,
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // first time jwt callback is run, user object is available

      if (account && user) {
        return {
          ...token,
          name: "Juan",
          email: user.email,
        };
      }
    },
    async session({ session, token }) {
      return session;
    },
  },
});
