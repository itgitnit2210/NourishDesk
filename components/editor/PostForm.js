"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify, readingTime, formatDate } from "@/lib/blog";
import RichTextEditor from "@/components/editor/RichTextEditor";
import Article from "@/components/blog/Article";
import { Eye, Pencil, Loader2, CheckCircle2, UploadCloud } from "lucide-react";

const toArray = (s) =>
  s.split(",").map((x) => x.trim()).filter(Boolean);

export default function PostForm({ initialPost = null, authorName }) {
  const router = useRouter();
  const supabase = createClient();

  const [post, setPost] = useState({
    title: initialPost?.title || "",
    slug: initialPost?.slug || "",
    content: initialPost?.content || "",
    excerpt: initialPost?.excerpt || "",
    featured_image: initialPost?.featured_image || "",
    tags: (initialPost?.tags || []).join(", "),
    categories: (initialPost?.categories || []).join(", "),
    meta_title: initialPost?.meta_title || "",
    meta_description: initialPost?.meta_description || "",
    status: initialPost?.status || "draft",
  });

  const [postId, setPostId] = useState(initialPost?.id || null);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved
  const [preview, setPreview] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost?.slug));
  const saveTimer = useRef(null);

  const set = (field, val) => setPost((p) => ({ ...p, [field]: val }));

  // Auto-generate the slug from the title until the user edits it manually.
  useEffect(() => {
    if (!slugTouched) set("slug", slugify(post.title));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.title, slugTouched]);

  // --- Persistence -----------------------------------------------------
  const persist = useCallback(
    async (overrides = {}) => {
      const payload = {
        ...post,
        tags: toArray(post.tags),
        categories: toArray(post.categories),
        ...overrides,
      };
      setSaveState("saving");

      try {
        if (!postId) {
          const res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const { post: created, error } = await res.json();
          if (error) throw new Error(error);
          setPostId(created.id);
          // Reflect the new id in the URL without a full navigation.
          window.history.replaceState(null, "", `/admin/edit/${created.id}`);
        } else {
          const res = await fetch(`/api/posts/${postId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const { error } = await res.json();
          if (error) throw new Error(error);
        }
        setSaveState("saved");
        // Local backup in case of a crash before the next save.
        localStorage.setItem(`draft:${postId || "new"}`, JSON.stringify(post));
      } catch (e) {
        console.error(e);
        setSaveState("idle");
        alert("Could not save: " + e.message);
      }
    },
    [post, postId]
  );

  // Debounced autosave on any change.
  useEffect(() => {
    if (!post.title && !post.content) return; // nothing worth saving yet
    setSaveState("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => persist(), 1500);
    return () => clearTimeout(saveTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  // --- Image upload ----------------------------------------------------
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const { url, error } = await res.json();
    if (error) {
      alert(error);
      return null;
    }
    return url;
  };

  const onFeaturedUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) set("featured_image", url);
  };

  // --- Publish / unpublish --------------------------------------------
  const publish = async () => {
    await persist({ status: "published" });
    set("status", "published");
    router.push("/admin");
    router.refresh();
  };

  const previewPost = {
    ...post,
    tags: toArray(post.tags),
    categories: toArray(post.categories),
    reading_time: readingTime(post.content),
    published_at: initialPost?.published_at || new Date().toISOString(),
    updated_at: initialPost?.updated_at,
    created_at: initialPost?.created_at || new Date().toISOString(),
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      {/* Main column */}
      <div>
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-ink/50">
            {saveState === "saving" && (
              <><Loader2 size={15} className="animate-spin" /> Saving…</>
            )}
            {saveState === "saved" && (
              <><CheckCircle2 size={15} className="text-brand-600" /> Saved</>
            )}
          </div>
          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className="btn-secondary"
          >
            {preview ? <><Pencil size={15} /> Edit</> : <><Eye size={15} /> Preview</>}
          </button>
        </div>

        {preview ? (
          <div className="rounded-4xl border border-brand-100 bg-white p-6 sm:p-10">
            <Article post={previewPost} authorName={authorName} />
          </div>
        ) : (
          <>
            <textarea
              value={post.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Post title"
              rows={1}
              className="mb-5 w-full resize-none bg-transparent font-serif text-3xl font-semibold text-ink outline-none placeholder:text-ink/30 sm:text-4xl"
            />
            <RichTextEditor
              value={post.content}
              onChange={(html) => set("content", html)}
              onImageUpload={uploadImage}
            />
          </>
        )}
      </div>

      {/* Sidebar: settings */}
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-brand-100 bg-white p-5">
          <p className="text-xs text-ink/50">
            Author: <span className="font-medium text-ink/80">{authorName}</span>
          </p>
          {postId && initialPost?.updated_at && (
            <p className="mt-1 text-xs text-ink/50">
              Last updated {formatDate(initialPost.updated_at)}
            </p>
          )}

          <div className="mt-4 flex flex-col gap-2">
            <button onClick={() => persist()} className="btn-secondary w-full">
              Save draft
            </button>
            <button onClick={publish} className="btn-primary w-full">
              {post.status === "published" ? "Update & republish" : "Publish"}
            </button>
          </div>
        </div>

        <Field label="Featured image">
          {post.featured_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.featured_image} alt="" className="mb-2 w-full rounded-xl object-cover" />
          ) : null}
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-brand-200 px-4 py-3 text-sm text-ink/60 hover:bg-brand-50">
            <UploadCloud size={16} /> Upload image
            <input type="file" accept="image/*" className="hidden" onChange={onFeaturedUpload} />
          </label>
        </Field>

        <Field label="URL slug">
          <input
            value={post.slug}
            onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }}
            className="input"
            placeholder="my-post-url"
          />
          <p className="mt-1 text-xs text-ink/40">/blog/{post.slug || "…"}</p>
        </Field>

        <Field label="Categories (comma separated)">
          <input value={post.categories} onChange={(e) => set("categories", e.target.value)}
            className="input" placeholder="Nutrition, Lifestyle" />
        </Field>

        <Field label="Tags (comma separated)">
          <input value={post.tags} onChange={(e) => set("tags", e.target.value)}
            className="input" placeholder="sugar, cravings, office" />
        </Field>

        <Field label="Meta title (SEO)">
          <input value={post.meta_title} onChange={(e) => set("meta_title", e.target.value)}
            className="input" placeholder="Defaults to post title" />
        </Field>

        <Field label="Meta description (SEO)">
          <textarea value={post.meta_description} onChange={(e) => set("meta_description", e.target.value)}
            rows={3} className="input resize-none" placeholder="Short summary for search engines" />
        </Field>
      </aside>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">
        {label}
      </label>
      {children}
    </div>
  );
}
