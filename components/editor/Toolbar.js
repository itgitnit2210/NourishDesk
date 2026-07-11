"use client";

import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, Code, Link2, Image as ImageIcon, Undo, Redo,
  AlignLeft, AlignCenter, AlignRight, Highlighter,
} from "lucide-react";

function Btn({ onClick, active, disabled, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()} // keep editor focus
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors disabled:opacity-40 ${
        active
          ? "bg-brand-600 text-white"
          : "text-ink/70 hover:bg-brand-50 hover:text-brand-700"
      }`}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="mx-1 h-6 w-px bg-brand-100" />;

const selectClass =
  "h-9 rounded-lg border border-brand-100 bg-white px-2 text-sm text-ink/70 outline-none focus:border-brand-300";

export default function Toolbar({ editor, onImageUpload }) {
  if (!editor) return null;

  const addLink = () => {
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const url = await onImageUpload(file);
      if (url) editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    };
    input.click();
  };

  const fontFamily = editor.getAttributes("textStyle").fontFamily || "";
  const fontSize = editor.getAttributes("textStyle").fontSize || "";
  const color = editor.getAttributes("textStyle").color || "#2c3530";

  return (
    <div className="sticky top-0 z-20 flex flex-wrap items-center gap-1 rounded-t-2xl border-b border-brand-100 bg-white/95 p-2 backdrop-blur">
      {/* Font family */}
      <select
        className={selectClass}
        value={fontFamily}
        onChange={(e) => {
          const v = e.target.value;
          if (v) editor.chain().focus().setFontFamily(v).run();
          else editor.chain().focus().unsetFontFamily().run();
        }}
        title="Font family"
      >
        <option value="">Font</option>
        <option value="var(--font-sans)">Sans</option>
        <option value="var(--font-serif)">Serif</option>
        <option value="ui-monospace, SFMono-Regular, monospace">Mono</option>
      </select>

      {/* Font size */}
      <select
        className={selectClass}
        value={fontSize}
        onChange={(e) => {
          const v = e.target.value;
          if (v) editor.chain().focus().setFontSize(v).run();
          else editor.chain().focus().unsetFontSize().run();
        }}
        title="Font size"
      >
        <option value="">Size</option>
        <option value="14px">Small</option>
        <option value="18px">Normal</option>
        <option value="24px">Large</option>
        <option value="30px">Huge</option>
      </select>

      <Divider />

      {/* Headings */}
      <Btn title="Heading 1" active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1 size={18} />
      </Btn>
      <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 size={18} />
      </Btn>
      <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 size={18} />
      </Btn>

      <Divider />

      {/* Inline formatting */}
      <Btn title="Bold" active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={18} />
      </Btn>
      <Btn title="Italic" active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={18} />
      </Btn>
      <Btn title="Underline" active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon size={18} />
      </Btn>
      <Btn title="Strikethrough" active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough size={18} />
      </Btn>

      <Divider />

      {/* Text color + highlight */}
      <label
        title="Text color"
        className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg hover:bg-brand-50"
      >
        <span className="text-sm font-semibold leading-none" style={{ color }}>
          A
        </span>
        <input
          type="color"
          value={color}
          onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
      <Btn title="Highlight" active={editor.isActive("highlight")}
        onClick={() => editor.chain().focus().toggleHighlight().run()}>
        <Highlighter size={18} />
      </Btn>

      <Divider />

      {/* Alignment */}
      <Btn title="Align left" active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        <AlignLeft size={18} />
      </Btn>
      <Btn title="Align center" active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}>
        <AlignCenter size={18} />
      </Btn>
      <Btn title="Align right" active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}>
        <AlignRight size={18} />
      </Btn>

      <Divider />

      {/* Lists, quote, code */}
      <Btn title="Bullet list" active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={18} />
      </Btn>
      <Btn title="Numbered list" active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered size={18} />
      </Btn>
      <Btn title="Quote" active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote size={18} />
      </Btn>
      <Btn title="Code block" active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code size={18} />
      </Btn>

      <Divider />

      {/* Link + image */}
      <Btn title="Add link" active={editor.isActive("link")} onClick={addLink}>
        <Link2 size={18} />
      </Btn>
      <Btn title="Insert image" onClick={addImage}>
        <ImageIcon size={18} />
      </Btn>

      <Divider />

      {/* History */}
      <Btn title="Undo" disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}>
        <Undo size={18} />
      </Btn>
      <Btn title="Redo" disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}>
        <Redo size={18} />
      </Btn>
    </div>
  );
}
