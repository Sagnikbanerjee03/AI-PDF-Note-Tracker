import React, { useEffect } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import EditorExtension from "./EditiorExtension";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function TextEditor({fileId}){
    const notes = useQuery(api.notes.GetNote, {
        fileId: fileId
    });
    
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3]
                }
            }), 
            Placeholder.configure({
                placeholder: 'Start Taking your notes here...'
            }),
            Highlight,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
        ],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'focus:outline-none p-4 min-h-full prose max-w-none'
            }
        }
    });

    useEffect(() => {
        if (editor && notes) {
            editor.commands.setContent(notes);
        }
    }, [notes, editor]);
      
    return(
        <div className="h-full flex flex-col">
            <EditorExtension editor={editor} fileId={fileId} />
            <div className="flex-1 overflow-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default TextEditor;