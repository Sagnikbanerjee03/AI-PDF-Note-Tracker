import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        email: v.string(),
        name: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        //if user already exist 
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), args.email)).collect();
        
        //if user does not exist, create a new user
        if(user?.length === 0){
            await ctx.db.insert("users", {
                email: args.email,
                name: args.name,
                imageUrl: args.imageUrl,
            });
            return 'insert new user';
        }
        return 'user already exists';
    }
});