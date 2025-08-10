import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { TaskType } from "@google/generative-ai";

export const ingest = action({
  args: {
     splitText: v.any(),
     fileId: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("=== INGESTION START ===");
    console.log("FileId:", args.fileId);
    console.log("Text chunks received:", args.splitText.length);
    
    if (!args.splitText || args.splitText.length === 0) {
      console.error("No text chunks provided for ingestion");
      throw new Error("No text chunks provided");
    }
    
    try {
      const apiKey = process.env.GOOGLE_AI_API_KEY || 'AIzaSyDTB4OiNJFe7S6hElY1706P_L45j-7opEY';
      if (!apiKey) {
        throw new Error("GOOGLE_AI_API_KEY environment variable is not set");
      }

      const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: apiKey,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      });
      
      console.log("Embeddings model created successfully");
      
      const metadata = args.splitText.map(() => ({ fileId: args.fileId }));
      console.log("Metadata created for", metadata.length, "chunks");
      
      await ConvexVectorStore.fromTexts(
          args.splitText,
          metadata,
          embeddings,
          { ctx }
      );
      
      console.log("=== INGESTION COMPLETE ===");
      console.log("Successfully ingested", args.splitText.length, "chunks for fileId:", args.fileId);
    } catch (error) {
      console.error("=== INGESTION ERROR ===");
      console.error("Error details:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      throw error;
    }
  },
});

export const search = action({
    args: {
      query: v.string(),
      fileId: v.string(),
    },
    handler: async (ctx, args) => {
      console.log("=== SEARCH START ===");
      console.log("Query:", args.query);
      console.log("FileId:", args.fileId);
      
      if (!args.query?.trim()) {
        console.log("Empty query provided");
        return [];
      }

      try {
        const apiKey = process.env.GOOGLE_AI_API_KEY || 'AIzaSyDTB4OiNJFe7S6hElY1706P_L45j-7opEY';
        if (!apiKey) {
          console.error("GOOGLE_AI_API_KEY environment variable is not set");
          return [];
        }

        const embeddings = new GoogleGenerativeAIEmbeddings({
          apiKey: apiKey,
          model: "text-embedding-004",
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title",
        });
        
        console.log("Embeddings model created for search");
        
        const vectorStore = new ConvexVectorStore(
          embeddings,
          { ctx }
        );
    
        console.log("Vector store created, performing similarity search...");
        const resultOne = await vectorStore.similaritySearch(args.query, 10);
        console.log("Raw search results count:", resultOne.length);
        
        if (resultOne.length > 0) {
          console.log("First result metadata:", resultOne[0].metadata);
          console.log("First result content preview:", resultOne[0].pageContent?.substring(0, 100));
        }
        
        const filteredResults = resultOne.filter(q => q.metadata && q.metadata.fileId === args.fileId);
        console.log("Filtered results for fileId:", filteredResults.length);
        
        if (filteredResults.length > 0) {
          console.log("First filtered result metadata:", filteredResults[0].metadata);
        }

        console.log("=== SEARCH COMPLETE ===");
        return filteredResults;
      } catch (error) {
        console.error("=== SEARCH ERROR ===");
        console.error("Error details:", error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        return [];
      }
    },
});
