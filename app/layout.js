"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {  Outfit } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Initialize Convex client
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <ConvexProvider client={convex}>
            {children}
          </ConvexProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
