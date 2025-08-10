"use client"
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button";
  import { useMutation, useAction } from "convex/react";
  import { api } from "../../../convex/_generated/api";
  import { Loader2Icon } from "lucide-react";
  import { useUser } from "@clerk/nextjs";
  import { v4 as uuidv4 } from "uuid";
  import axios from "axios";

const UploadPdf = ({children, isMaxFile}) => {
   
   const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
   const addFileEntry = useMutation(api.fileStorage.addFileEntryToDb);
   const getFileUrl = useMutation(api.fileStorage.getFileUrl);
   const {user} = useUser();
   const embeddDocument = useAction(api.myAction.ingest);
   const [file, setFile] = useState();
   const [loading, setLoading] = useState(false);
   const [fileName, setFileName] = useState();
   const [open, setOpen] = useState(false);
   
   const onFileSelect = (event) => {
     setFile(event.target.files[0]);
   }
   
   const onUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
        // Step 1: Get a short-lived upload URL
        const postUrl = await generateUploadUrl();

        // Step 2: POST the file to the URL
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file?.type },
            body: file,
        });
        const { storageId } = await result.json();
        const fileId = uuidv4();
        const fileUrl = await getFileUrl({storageId: storageId});
           
        // Step 3: Add file entry to database
        const resp = await addFileEntry({
            fileId: fileId,
            storageId: storageId,
            filename: fileName ?? 'Untitled File',
            fileUrl: fileUrl,
            createdBy: user?.primaryEmailAddress?.emailAddress
        });
        
        // Step 4: Process PDF for embeddings
        try {
            const ApiResp = await axios.get('/api/PDF-loader?pdfUrl=' + fileUrl);
            console.log("PDF processing response:", ApiResp.data);
            console.log("Chunks received:", ApiResp.data.chunks?.length || 0);
            console.log("First chunk sample:", ApiResp.data.chunks?.[0]?.substring(0, 100));
            
            // Use the chunks array if available, otherwise use the result as a single chunk
            const textChunks = ApiResp.data.chunks || [ApiResp.data.result];
            console.log("Text chunks to ingest:", textChunks.length);
            
            console.log("Calling embeddDocument with fileId:", fileId);
            await embeddDocument({
                splitText: textChunks,
                fileId: fileId
            });
            
            console.log("Document ingested successfully for fileId:", fileId);
        } catch (embedError) {
            console.error("Embedding error:", embedError);
            console.error("Embedding error details:", embedError.message);
        }
        
        setLoading(false);
        setFile(null);
        setFileName("");
        setOpen(false);
    } catch (error) {
        console.error("Upload error:", error);
        setLoading(false);
        setOpen(false);
    }
   }
   
   return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)} disabled={isMaxFile}>
                + Upload PDF file
            </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Pdf File</DialogTitle>
            <DialogDescription asChild>
                 <div className="">
                 <h2 className="mt-5">Select a file to Upload </h2>
                     <div className="mt-5 gap-2 p-3 rounded-md border">
                       <input 
                         type="file" 
                         accept=".pdf"
                         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                         onChange={(event) => onFileSelect(event)}
                       /> 
                    </div>
                    <div className="mt-2">
                        <label>File Name *</label>
                        <Input 
                          placeholder="File Name" 
                          value={fileName}
                          onChange={(e) => setFileName(e.target.value)}
                        />
                    </div>
                 </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary"> Close</Button>
          </DialogClose>
          <Button onClick={onUpload} disabled={!file || loading}>
            {loading ? (
                <Loader2Icon className="animate-spin"/>
            ) : (
                'Upload'
            )}
          </Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default UploadPdf;
  