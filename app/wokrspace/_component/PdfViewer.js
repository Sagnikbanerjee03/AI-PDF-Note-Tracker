import React from "react";

function PdfViewer({ fileUrl }) {
    if (!fileUrl) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                    <p className="text-gray-500 text-lg">No PDF file selected</p>
                    <p className="text-gray-400 text-sm">Upload a PDF to view it here</p>
                </div>
            </div>
        );
    }
   
    return (
        <div className="h-full">
            <iframe 
                src={`${fileUrl}#toolbar=0`} 
                className="w-full h-full border-0"
                title="PDF Viewer"
            />
        </div>
    );
}

export default PdfViewer;