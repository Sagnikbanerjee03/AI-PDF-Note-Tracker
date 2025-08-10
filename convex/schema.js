import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    }),

    pdffiles: defineTable({
        fileId: v.string(),
        storageId: v.string(),
        filename: v.string(),
        fileUrl: v.string(),
        createdBy: v.string(),
    }),
    documents: defineTable({
        embedding: v.array(v.number()), // vector storage
        text: v.string(),               // original text
        metadata: v.any(),               // optional metadata
      }).vectorIndex("byEmbedding", {     // vector search index
        vectorField: "embedding",
        dimensions: 768,                 // must match embedding model output
      }),

      notes:defineTable({
         fileId:v.string(),
         notes:v.string(),
         createdBy:v.string()  

      })
})
