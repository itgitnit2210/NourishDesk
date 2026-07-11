"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
// Tiptap v3: TextStyle + Color + FontFamily + FontSize all come from this ONE
// package as NAMED imports (the old @tiptap/extension-color and
// @tiptap/extension-font-family packages were merged into it).
import {
  TextStyle,
  Color,
  FontFamily,
  FontSize,
} from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import Toolbar from "./Toolbar";

export default function RichTextEditor({ value, onChange, onImageUpload }) {
  const editor = useEditor({
    immediatelyRender: false, // avoids SSR hydration mismatch
    shouldRerenderOnTransaction: true, // v3: keep the toolbar in sync with state
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder: "Start writing your story…" }),
      TextStyle, // base mark the three below attach to
      Color,
      FontFamily,
      FontSize,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[420px] px-5 py-6 focus:outline-none prose-headings:font-serif prose-headings:text-ink prose-a:text-brand-700 prose-blockquote:border-brand-300 prose-img:rounded-2xl",
      },
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  // Keep editor content in sync if the parent loads a post asynchronously.
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value]);

  // No "overflow-hidden" here — that would break the toolbar's sticky position.
  return (
    <div className="rounded-2xl border border-brand-100 bg-white shadow-card">
      <Toolbar editor={editor} onImageUpload={onImageUpload} />
      <EditorContent editor={editor} />
    </div>
  );
}
