import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import AuthService from "../../../src/services/AuthService";
import jwt from 'jsonwebtoken'
import axiosInstance from "../../../src/utils/axios";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const {csrfToken, username, password } = credentials

        // TODO: DEIXAR COMO ENV VAR
        const SECRET_KEY = '89ba8dbb0f1b7d9e60e2dad6d1803a363d6b81024cd7b58da30b1344c18122be9e00c001585c7cd808854b97f5d2b21ce5c99914c1e1558763d15bd47141a6e8'

        let response = await AuthService.signIn(username, password)
          
        if (response) {
          const decoded = jwt.verify(response.token, SECRET_KEY)
          return { ...decoded, accessToken: response.token }
        } else {
          return null;
        }
      }
    }),
    GithubProvider({
      clientId: 'bbd48bd456869d2fa27f',
      clientSecret: '1dd1cefa0f0c332b0ed955114569e57dcb9c1895',
      async authorize(credentials, req) {
        console.log(credentials, req)
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("JWT token", token)
      console.log("JWT account", account)
      console.log("JWT user", user)
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.accessToken = user.accessToken
      }

      return token
    },
    async session({ session, token, user }) {
      console.log("SESSION session", session)
      console.log("SESSION token", token)
      console.log("SESSION user", user)
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  }
}
export default NextAuth(authOptions)