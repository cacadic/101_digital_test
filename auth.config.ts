import { AdapterUser } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { User } from "@/types/common";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const tokenResponse = await axios.post(
            process.env.FETCH_APP_ACCESS_TOKEN!,
            {
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
              username: credentials?.username,
              password: credentials?.password,
              grant_type: "password",
              scope: "openid",
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          const tokenData = tokenResponse.data;

          if (tokenData.access_token) {
            const profileResponse = await axios.get(
              process.env.GET_USER_PROFILE!,
              {
                headers: {
                  Authorization: `Bearer ${tokenData.access_token}`,
                },
              }
            );

            const profileData = profileResponse.data.data;

            const user: User = {
              id: profileData.userId,
              name: `${profileData.firstName} ${profileData.lastName}`,
              username: profileData.userName,
              accessToken: tokenData.access_token,
              refreshToken: tokenData.refresh_token,
              expires_in: tokenData.expires_in,
              profile: profileData,
            };

            return user;
          } else {
            return null;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          console.error("Error in authorize:");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User;
      }

      return token;
    },
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user = token.user as AdapterUser & User;
        session.user.id = token.sub;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
