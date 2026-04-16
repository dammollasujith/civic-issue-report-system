import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";

export function configureGoogleAuth() {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.GOOGLE_CALLBACK_URL) return;

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: env.GOOGLE_CALLBACK_URL
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();
          if (!email) return done(new Error("Google account missing email"));

          const existing = await prisma.user.findFirst({
            where: { OR: [{ googleId: profile.id }, { email }] }
          });
          if (existing) {
            if (!existing.googleId) {
              const updated = await prisma.user.update({
                where: { id: existing.id },
                data: { googleId: profile.id }
              });
              return done(null, updated);
            }
            return done(null, existing);
          }

          const user = await prisma.user.create({
            data: {
              name: profile.displayName || "Citizen",
              email,
              googleId: profile.id,
              role: "citizen"
            }
          });
          return done(null, user);
        } catch (e) {
          return done(e as Error);
        }
      }
    )
  );
}

