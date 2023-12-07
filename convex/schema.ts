import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/convex-lucia-auth";
import { v } from "convex/values";

const classes = ["bard", "barbarian", 'cleric', 'druid'] as const;

export default defineSchema(
  {
    ...authTables({
      user: {
        email: v.string(),
        profile: v.string(),
        class: v.union(v.literal(classes[0]), v.literal(classes[1]), ...classes.slice(2).map(x => v.literal(x))),
        level: v.number()
      },
      session: {},
    }),
    events: defineTable({
      title: v.string(),
      description: v.string(),
    })
  },
  { schemaValidation: true }
);
