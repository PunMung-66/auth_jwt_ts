import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { createRequire } from "module";
import User from "../model/user.ts";

// `passport-google-oauth20` is CommonJS; load its runtime export via createRequire
const require = createRequire(import.meta.url);
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

// Env vars
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GOOGLE_CALLBACK_URL =
  (process.env.GOOGLE_CALLBACK_URL as string) || "/api/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        // Mongoose-based user lookups
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            firstname: profile.name?.givenName || profile.displayName || "",
            lastname: profile.name?.familyName || "",
            email: profile.emails?.[0]?.value || null,
            googleId: profile.id,
            profilePhoto: profile.photos?.[0]?.value || null,
            authProvider: "google",
            password: null,
          });
        }

        return done(null, user as any);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error as Error, null);
  }
});

export default passport;