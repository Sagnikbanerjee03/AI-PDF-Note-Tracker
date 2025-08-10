import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function WorkspaceHeader({ fileName }) {
    return (
        <div className="p-4 flex justify-between items-center shadow-md bg-white">
            <div className="flex items-center gap-4">
                <Link href="/dashboard">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="logo" width={140} height={40} />
                </div>
            </div>
            
            <div className="flex-1 flex justify-center">
                <h2 className="font-bold text-lg text-gray-900">{fileName || "Untitled Document"}</h2>
            </div>
            
            <div className="flex items-center gap-4">
                <UserButton />
            </div>
        </div>
    );
}

export default WorkspaceHeader;