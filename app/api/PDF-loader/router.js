import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/community/text_splitter";

export async function GET(request) {
    try {
        const reqUrl = request.url;
        const { searchParams } = new URL(reqUrl);
        const pdfUrl = searchParams.get('pdfUrl');
        
        if (!pdfUrl) {
            return NextResponse.json({ error: 'PDF URL is required' }, { status: 400 });
        }

        // 1. LOAD PDF FILE 
        const response = await fetch(pdfUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        }
        
        const data = await response.blob();
        const loader = new WebPDFLoader(data);
        const docs = await loader.load();
    
        let pdfTextContent = '';
        docs.forEach(doc => {
            pdfTextContent = pdfTextContent + doc.pageContent;
        });

        // 2. Split the text into smaller chunks 
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,      // max characters per chunk
            chunkOverlap: 200,    // overlap between chunks for context
        });
        
        const output = await splitter.splitText([pdfTextContent]);
   
        let splitterList = [];
        output.forEach(chunk => {
            splitterList.push(chunk);
        });
   
        return NextResponse.json({ 
            result: pdfTextContent,
            chunks: splitterList 
        });
    } catch (error) {
        console.error('PDF processing error:', error);
        return NextResponse.json({ 
            error: 'Failed to process PDF' 
        }, { status: 500 });
    }
}
