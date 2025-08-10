"use client";
import { useQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '../../convex/_generated/api';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UploadPdf from './_components/UploadPdf';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';

const Dashboard = () => {
   const { user } = useUser();
    
   const fileList = useQuery(api.fileStorage.GetUserFiles, {
       userEmail: user?.primaryEmailAddress?.emailAddress
   });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <div className="md:w-64 w-full h-screen fixed z-10">
          <Sidebar />
        </div>
        <div className="md:ml-64 ml-0 flex-1">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className='font-bold text-3xl text-gray-900'>My Documents</h2>
              <UploadPdf />
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
                {fileList && fileList.length > 0 ? (
                  fileList.map((file, index) => (
                    <Link href={`/wokrspace/${file.fileId}`} key={index}>
                      <div className='flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all bg-white'>
                          <Image src={'/pdf.png'} alt='file' width={70} height={70} />
                          <h2 className='mt-3 font-medium text-lg text-center'>{file?.filename}</h2> 
                      </div>
                    </Link>
                  ))
                ) : (
                  // Loading skeleton
                  Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className='bg-slate-200 rounded-md h-[150px] animate-pulse'></div>
                  ))
                )}
            </div>
            
            {fileList && fileList.length === 0 && (
              <div className="text-center py-12">
                <Image src="/pdf.png" alt="No files" width={100} height={100} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No documents yet</h3>
                <p className="text-gray-500 mb-4">Upload your first PDF to get started</p>
                <UploadPdf />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 