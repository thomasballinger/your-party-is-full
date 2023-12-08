import { v } from "convex/values";
import { mutationWithAuth, queryWithAuth } from "@convex-dev/convex-lucia-auth";
import { classValidator } from "./schema";
import { Id } from "./_generated/dataModel";
import {
  DatabaseReader,
  DatabaseWriter,
  QueryCtx,
  internalMutation,
  mutation,
} from "./_generated/server";
import { npcJoin } from "./seed";
import { api, internal } from "./_generated/api"

const DEFAULT_DESCRIPTION =
  "Come for the treasure, stay for the prison sentence.";

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

    const { members, formerMembers } = await partyMembers(ctx, id);

    return {
      ...event,
      members,
      formerMembers,
      createdByViewer: user && event.creator === user._id,
      viewerIsMember: user && members.map((m) => m._id).includes(user._id),
      viewerHasBeenKicked:
        user && formerMembers.map((m) => m._id).includes(user._id),
      loggedIn: !!user,
      isFull: members.length >= 4,
    };
  },
});

export const joinParty = mutationWithAuth({
  args: { eventId: v.string() },
  handler: async (ctx, args) => {
    const eventId = ctx.db.normalizeId("events", args.eventId);
    if (!eventId) throw new Error("bad ID");
    const event = await ctx.db.get(eventId);
    if (!event) throw new Error("event not found");
    const user = ctx.session?.user;
    if (!user) throw new Error("user not found");

    await joinPartyInner(ctx, user._id, eventId);
  },
});

export const joinPartyInner = async (
  ctx: { db: DatabaseWriter },
  userId: Id<"users">,
  eventId: Id<"events">
) => {
  const { members, formerMembers } = await partyMembers(ctx, eventId);
  const alreadyMember = members.map((m) => m._id).includes(userId);
  if (alreadyMember) throw new Error("Already a member");

  const formerlyMember = formerMembers.some((m) => m._id === userId);

  if (formerlyMember) {
    const membership = (
      await ctx.db
        .query("memberships")
        .withIndex("by_eventId")
        .filter((q) => q.eq(q.field("eventId"), eventId))
        .collect()
    ).filter((m) => m.userId === userId)[0];
    return await ctx.db.patch(membership._id, { status: "current" });
  }
  await ctx.db.insert("memberships", {
    eventId,
    userId,
    status: "current",
  });
};

export const leaveParty = mutationWithAuth({
  args: { eventId: v.string() },
  handler: async (ctx, args) => {
    const eventId = ctx.db.normalizeId("events", args.eventId);
    if (!eventId) throw new Error("bad ID");
    const event = await ctx.db.get(eventId);
    if (!event) throw new Error("event not found");
    const user = ctx.session?.user;
    if (!user) throw new Error("user not found");

    const { members } = await partyMembers(ctx, eventId);
    const isMember = members.map((m) => m._id).includes(user._id);
    if (!isMember) throw new Error("not a member");

    const membership = await ctx.db
      .query("memberships")
      .filter((q) =>
        q.and(
          q.eq(q.field("eventId"), args.eventId),
          q.eq(q.field("userId"), user._id)
        )
      )
      .unique();
    if (!membership) throw new Error("not a member");

    if (membership.status === "current") {
      await ctx.db.patch(membership._id, { status: "former" });
    }
  },
});

export async function partyMembers(
  ctx: { db: DatabaseReader },
  id: Id<"events">
) {
  console.log("partyMembers called with", id);
  const members = (
    await Promise.all(
      (
        await ctx.db
          .query("memberships")
          .withIndex("by_eventId")
          .filter((q) => q.eq(q.field("eventId"), id))
          .collect()
      )
        .filter(({ status }) => status === "current")
        .map(({ userId }) => ctx.db.get(userId))
    )
  ).filter(notNull);
  const formerMembers = (
    await Promise.all(
      (
        await ctx.db
          .query("memberships")
          .withIndex("by_eventId")
          .filter((q) => q.eq(q.field("eventId"), id))
          .collect()
      )
        .filter(({ status }) => status === "former")
        .map(({ userId }) => ctx.db.get(userId))
    )
  ).filter(notNull);
  return { members, formerMembers };
}

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

    await ctx.scheduler.runAfter(5000, internal.seed.npcJoin, {partyId: id});
    await ctx.scheduler.runAfter(8000, internal.seed.npcJoin, {partyId: id});
    await ctx.scheduler.runAfter(10000, internal.seed.npcJoin, {partyId: id});

    return id;
  },
});
