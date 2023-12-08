import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/convex-lucia-auth";
import { v } from "convex/values";
import { classes } from "../lib/dnd"

export const classValidator = v.union(v.literal(classes[0]), v.literal(classes[1]), ...classes.slice(2).map(x => v.literal(x)));

export default defineSchema(
  {
    ...authTables({
      user: {
        email: v.string(),
        profile: v.string(),
        class: classValidator,
        level: v.number()
      },
      session: {},
    }),
    events: defineTable({
      title: v.string(),
      description: v.string(),
      creator: v.id('users'),
    }),
    memberships: defineTable({
      eventId: v.id("events"),
      userId: v.id("users"),
      status: v.union(v.literal('current'), v.literal('former'))
    }).index('by_eventId', ['eventId'])
  },
  { schemaValidation: true }
);
