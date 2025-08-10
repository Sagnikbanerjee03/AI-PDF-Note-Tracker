"use client"
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_component/WorkspaceHeader";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import TextEditor from "../_component/textEditor";
import PdfViewer from "../_component/PdfViewer";

function Workspace() {
   const {fileId} = useParams();
   const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
        fileId: fileId
   });

   useEffect(() => {
         console.log(fileInfo);
   }, [fileInfo]);
      
    return (
     <div className="h-screen flex flex-col">
        <WorkspaceHeader fileName={fileInfo?.filename} />   
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            <div className="border rounded-lg overflow-hidden">
                <TextEditor fileId={fileId}/>
            </div>
            <div className="border rounded-lg overflow-hidden">
                <PdfViewer fileUrl={fileInfo?.fileUrl}/>
            </div>
        </div>
     </div>
 )
}

export default Workspace;