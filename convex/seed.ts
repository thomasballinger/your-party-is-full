import { Infer, v } from "convex/values";
import { DatabaseWriter, internalMutation } from "./_generated/server";
import { classValidator } from "./schema";
import { Doc, Id } from "./_generated/dataModel";
import { WithoutSystemFields } from "convex/server";
import { joinPartyInner, partyMembers } from "./party";

const characterValidator = {
  email: v.string(),
  class: classValidator,
  level: v.number(),
  profile: v.string(),
  id: v.string(),
};

// run this every few seconds
// TOMHERE TODO cron schedule this function and make this function
// add a random character to a party if that party isn't full.
// After that the TODO is the Party Is Full! experience.
// Add a notificaiton. Just an upsell? something else?
export const joinParties = internalMutation(async (ctx, args) => {
  // grab the most recent 100 parties
  const parties = await ctx.db.query("events").order("desc").take(100);

  for (const party of parties) {
    await npcJoinInner(ctx, party._id);
  }
});

export const npcJoin = internalMutation(async (ctx, {partyId}: {partyId: Id<"events">}) => {
    await npcJoinInner(ctx, partyId);
})

async function npcJoinInner(ctx: { db: DatabaseWriter }, partyId: Id<"events">) {
  const npcs = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("isNpc"), true))
    .collect();

  const party = await ctx.db.get(partyId);
  if (!party) throw new Error("Part does not exist");

  const { members, formerMembers } = await partyMembers(ctx, party._id);
  for (const npc of npcs) {
    if (
      !members
        .concat(formerMembers)
        .map((m) => m._id)
        .includes(npc._id)
    ) {
      await joinPartyInner(ctx, npc._id, party._id);
      break;
    }
  }
}

export const createNpc = internalMutation({
  args: characterValidator,
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("byId")
      .filter((q) => q.eq(q.field("id"), args.id))
      .unique();

    const user = {
      email: args.email,
      class: args.class,
      level: args.level,
      profile: args.profile,
      id: args.id,
      isNpc: true,
    };

    if (existing) {
      await ctx.db.replace(existing._id, user);
    } else {
      await ctx.db.insert("users", user);
    }
  },
});

export const populate = internalMutation(async (ctx) => {
  await Promise.all(characters.map((character) => createNpc(ctx, character)));
});

const characters: WithoutSystemFields<Doc<"users">>[] = [
  {
    id: "astarion",
    email: "Astarion",
    level: 4,
    class: "Rogue" as const,
    profile: "Very cool dude. Sneaky, slippery, and possibly a vampire.",
  },
  {
    id: "gale",
    email: "Gale",
    level: 6,
    class: "Wizard" as const,
    profile: "Incredibly powerful wizard. Fun to listen to.",
  },
  {
    id: "wyll",
    email: "Wyll",
    level: 3,
    class: "Warlock" as const,
    profile: "Very cool swashbuckler, you could talk for hours.",
  },
  {
    id: "karlach",
    email: "Karlach",
    level: 5,
    class: "Barbarian" as const,
    profile: "Strong and kind, someone you'd hate to let down.",
  },
];
