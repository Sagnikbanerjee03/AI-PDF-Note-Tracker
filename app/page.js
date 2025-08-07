"use client";

import Image from "next/image";
import { Button } from "../components/ui/button"
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
    
export default function Home() {
  const { user } = useUser();
  console.log(user?.id);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Hello World</h1>
      <Button>Click me</Button>
      <UserButton />
    </div>
  );
}
