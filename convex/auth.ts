import { v } from "convex/values";
import { mutationWithAuth } from "@convex-dev/convex-lucia-auth";
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "@convex-dev/convex-lucia-auth/email";
import { classValidator } from "./schema";

export const signIn = mutationWithAuth({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    const session = await signInWithEmailAndPassword(ctx, email, password);
    return session.sessionId;
  },
});

export const signUp = mutationWithAuth({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    const session = await signUpWithEmailAndPassword(ctx, email, password, {
      user: { class: "Bard", level: 1, profile: "Just your average adventurer. Nobody special." },
      session: {},
    });
    return session.sessionId;
  },
});
