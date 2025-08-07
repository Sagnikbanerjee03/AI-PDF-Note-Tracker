import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to list all users
export const list = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

// Mutation to create a new user
export const create = mutation({
  args: {
    username: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      username: args.username,
      email: args.email,
      imageUrl: args.imageUrl,
    });
    return userId;
  },
});
