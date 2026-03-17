import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userModel } from "../Models/userModel.js";
import { env } from "./environment.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile?.emails?.[0]?.value;
        if (!email) {
          return done(new Error("Google account email not available"), null);
        }

        let user = await userModel.findUserByEmail(email);

        if (!user) {
          user = await userModel.createUser({
            username: profile.displayName,
            email: email,
            // Match enum in `Models/userModel.js`
            role: "patient",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
