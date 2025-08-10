import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    embedding: v.array(v.number()), // vector storage
    text: v.string(),               // original text
    metadata: v.any(),               // optional metadata
  }).vectorIndex("byEmbedding", {     // vector search index
    vectorField: "embedding",
    dimensions: 1536,                 // must match embedding model output
  }),
});
