import React from "react";
import { toast } from "sonner";
import {
  Bold,
  Italic,
  Underline,
  Code,
  List,
  Strikethrough,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkle,
  Save
} from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function EditorToolbar({ editor, fileId }) {
  if (!editor) return null;
  
  const { user } = useUser();
  const saveNotes = useMutation(api.notes.AddNotes);
  const searchAI = useAction(api.myAction.search);

  const handleSave = async () => {
    try {
      const content = editor.getHTML();
      await saveNotes({
        notes: content,
        fileId: fileId,
        createdBy: user?.primaryEmailAddress?.emailAddress
      });
      toast.success("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Failed to save notes");
    }
  };

  const onAIClick = async () => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );

    if (!selectedText.trim()) {
      toast.error("Please select some text to ask AI");
      return;
    }

    try {
      toast("AI is searching...");
      const results = await searchAI({ query: selectedText, fileId });

      let finalAns = "";

      if (Array.isArray(results) && results.length > 0) {
        let combinedText = results
          .map(item => item.pageContent || "")
          .filter(Boolean)
          .join(" ");

        finalAns = combinedText.trim()
          ? `<p><strong>AI Answer:</strong> ${combinedText}</p>`
          : `<p><strong>AI Response:</strong> I couldn't find detailed info about "${selectedText}".</p>`;
      } else {
        finalAns = `<p><strong>AI Response:</strong> No relevant information found for "${selectedText}". Try rephrasing your question.</p>`;
      }

      editor.commands.insertContent(finalAns);
      await handleSave();
      toast.success("AI response added to your notes!");

    } catch (error) {
      console.error("AI Error:", error);
      toast.error("Failed to get AI response");
    }
  };

  const Btn = ({ onClick, isActive, title, children, className = "" }) => (
    <button
      onClick={onClick}
      title={title}
      className={`w-9 h-9 flex items-center justify-center rounded-md border transition
        ${isActive ? "bg-gray-200 border-gray-300" : "bg-white border-transparent hover:bg-gray-50"}
        ${className}
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-white border-b border-gray-200 sticky top-0 z-20">
      {/* Save Button */}
      <Btn
        onClick={handleSave}
        title="Save Notes"
        className="bg-green-50 hover:bg-green-100 border-green-200"
      >
        <Save size={18} className="text-green-600" />
      </Btn>

      {/* Headings */}
      <Btn
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
      >
        <span className="font-bold text-sm">H1</span>
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        <span className="font-bold text-sm">H2</span>
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        <span className="font-bold text-sm">H3</span>
      </Btn>

      {/* Bold, Italic, Underline, Strikethrough, Code */}
      <Btn
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold"
      >
        <Bold size={18} />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic"
      >
        <Italic size={18} />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline"
      >
        <Underline size={18} />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Strikethrough"
      >
        <Strikethrough size={18} />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
        title="Inline Code"
      >
        <Code size={18} />
      </Btn>

      {/* Bullet List */}
      <Btn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <List size={18} />
      </Btn>

      {/* Highlight */}
      <Btn
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        isActive={editor.isActive("highlight")}
        title="Highlight"
      >
        <Highlighter size={18} />
      </Btn>

      {/* Alignment */}
      <Btn
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
        title="Align Right"
      >
        <AlignRight size={18} />
      </Btn>
    
      {/* AI Button */}
      <Btn
        onClick={onAIClick}
        title="Ask AI"
        className="bg-blue-50 hover:bg-blue-100 border-blue-200"
      >
        <Sparkle size={18} className="text-blue-600" />
      </Btn>
    </div>
  );
}
