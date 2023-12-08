import { v } from "convex/values";
import { mutationWithAuth, queryWithAuth } from "@convex-dev/convex-lucia-auth";
import { classValidator } from "./schema";

const DEFAULT_DESCRIPTION =
  "Come for the treasure, stay for the prison sentence";

export const getCurrentUser = queryWithAuth({
  args: {},
  handler: async (ctx, _args) => {
    const user = ctx.session?.user;
    return user;
  },
});

export const updateCurrentUser = mutationWithAuth({
  args: { class: v.optional(classValidator) },
  handler: async (ctx, args) => {
    const user = ctx.session?.user;
    if (!user) throw new Error("not authenticated");
    const { sessionId: _, ...update } = args as typeof args & {
      sessionId: string;
    };
    await ctx.db.patch(user._id, update);
  },
});

function notNull<T>(value: T | null): value is T {
  return value !== null;
}

// Can be used with or without auth
export const getEvent = queryWithAuth({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const user = ctx.session?.user;
    const id = ctx.db.normalizeId("events", args.id);
    if (!id) {
      throw new Error("Invalid party id");
    }
    const event = await ctx.db.get(id);
    if (!event) {
      throw new Error("Event does not exist");
    }

    const members = (
      await Promise.all(
        (await ctx.db.query("memberships").withIndex("by_eventId").collect())
          .filter(({ status }) => status === "current")
          .map(({ userId }) => ctx.db.get(userId))
      )
    ).filter(notNull);
    const formerMembers = (
      await Promise.all(
        (await ctx.db.query("memberships").withIndex("by_eventId").collect())
          .filter(({ status }) => status === "current")
          .map(({ userId }) => ctx.db.get(userId))
      )
    ).filter(notNull);

    return {
      ...event,
      members,
      formerMembers,
      createdByViewer: user && event.creator === user._id,
      viewerIsMember: user && members.map((m) => m._id).includes(user._id),
      viewerHasBeenKicked: user && formerMembers.map(m => m._id).includes(user._id),
      loggedIn: !!user,
      isFull: members.length >= 4,
    };
  },
});

export const createAdventure = mutationWithAuth({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.id("_storage")),
  },

  handler: async (ctx, { title, description }) => {
    // TODO use image
    const user = ctx.session?.user;
    if (!user) throw new Error("user not found");
    const id = await ctx.db.insert("events", {
      creator: user._id,
      title,
      description: description || DEFAULT_DESCRIPTION,
    });
    await ctx.db.insert("memberships", {
      userId: user._id,
      eventId: id,
      status: "current",
    });
    return id;
  },
});
