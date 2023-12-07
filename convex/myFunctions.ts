import { v } from "convex/values";
import { mutationWithAuth, queryWithAuth } from "@convex-dev/convex-lucia-auth";


const DEFAULT_DESCRIPTION = "Come for the treasure, stay for the prison sentence";

export const getCurrentUser = queryWithAuth({
  args: {},
  handler: async (ctx, _args) => {
    const user = ctx.session?.user;
    if (!user) throw new Error("Not logged in");
    
    const {id: _, _id, _creationTime, ...rest} = user;
    return rest;
  },
});

// Can be used with or without auth
export const getEvent = queryWithAuth({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const user = ctx.session?.user;

    console.log('asdf');
    
    const id = ctx.db.normalizeId('events', args.id);
    if (!id) {
      throw new Error("Invalid party id");
    }
    const event = await ctx.db.get(id);
    if (!event) {
      throw new Error("Event does not exist");
    }

    // TODO include lots more info
    return event;
  },
});

export const createAdventure = mutationWithAuth({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.id('_storage')),
  },

  handler: async (ctx, {title, description}) => {
    // TODO use image
    return await ctx.db.insert("events", { title, description: description || DEFAULT_DESCRIPTION });
  },
});