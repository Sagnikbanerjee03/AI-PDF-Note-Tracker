"use client"
import { Layout, Shield } from 'lucide-react'
import React from 'react';
import Image from 'next/image';
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button";
import UploadPdf from './UploadPdf';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Link from 'next/link';

const Sidebar = () => {
  const { user } = useUser();
  const path = usePathname();
    
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
      userEmail: user?.primaryEmailAddress?.emailAddress
  });

  return (
    <div className='shadow-md h-screen p-7 w-full bg-white'>
        <Image src="/logo.svg" alt="logo" width={100} height={40} />
        <div className='mt-10'>
            <UploadPdf isMaxFile={fileList?.length >= 5}>
                <Button className='w-full'>+ Upload PDF</Button>
            </UploadPdf>
            
            <Link href={'/dashboard'}>
                <div className={`flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer ${
                    path === '/dashboard' ? 'bg-slate-200' : ''
                }`}>
                    <Layout size={20} />
                    <h2>Workspace</h2>
                </div>
            </Link>
            
            <Link href={'/dashboard/upgrade'}>
                <div className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer ${
                    path === '/dashboard/upgrade' ? 'bg-slate-200' : ''
                }`}>
                    <Shield size={20} />
                    <h2>Upgrade</h2>
                </div>
            </Link>
        </div>

        <div className='absolute bottom-24 w-[80%]'>
            <Progress value={(fileList?.length || 0) / 5 * 100} />
            <p className='text-sm mt-1'>{fileList?.length || 0} out of 5 PDFs Uploaded</p>
            <p className='text-sm text-gray-400 mt-2'>Upgrade to upload more PDFs</p>
        </div>
    </div>
  );
};       

export default Sidebar;