import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { firstValueFrom } from "rxjs";
import { AuthApi, RegisterTokenDto } from "../../../generated-src/openapi";

// For more  on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    // Providers.Apple({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: {
    //     teamId: process.env.APPLE_TEAM_ID,
    //     privateKey: process.env.APPLE_PRIVATE_KEY,
    //     keyId: process.env.APPLE_KEY_ID,
    //   }
    // })
  ],
  secret: process.env.SECRET,

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
  },

  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (!user) {
        return token;
      }
      console.log("token", token, "user", user, "isNewUser",isNewUser);
      const authApi = new AuthApi();
      const body = {
        body: {
          id: user.id,
          newUser: isNewUser,
          secret: process.env.TK_SECRET,
        } as RegisterTokenDto
      };

      const observable = authApi.registerNewToken(body);
      console.log("authApi")
      let userId = await firstValueFrom(observable);
      console.log("userId", userId);
      token.userId = userId
      console.log("token", token);
      return token;
    }
  },

  // https://next-auth.js.org/configuration/events
  events: {},

  theme: 'auto',

  debug: false,
})
