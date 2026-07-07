"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

// Frontend-only reactions. Counts + the visitor's choice are stored in the
// browser (localStorage), so they persist across refreshes but are PER-DEVICE,
// not shared across all readers. No login required.
export default function LikeDislike({ slug }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [choice, setChoice] = useState(null); // "like" | "dislike" | null
  const [ready, setReady] = useState(false);

  const key = `reactions:${slug}`;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "{}");
      setLikes(saved.likes || 0);
      setDislikes(saved.dislikes || 0);
      setChoice(saved.choice || null);
    } catch {
      /* ignore bad/missing data */
    }
    setReady(true);
  }, [key]);

  const save = (l, d, c) => {
    setLikes(l);
    setDislikes(d);
    setChoice(c);
    try {
      localStorage.setItem(key, JSON.stringify({ likes: l, dislikes: d, choice: c }));
    } catch {
      /* storage full/blocked — counts still update on screen */
    }
  };

  const like = () => {
    if (choice === "like") save(likes - 1, dislikes, null);
    else if (choice === "dislike") save(likes + 1, dislikes - 1, "like");
    else save(likes + 1, dislikes, "like");
  };

  const dislike = () => {
    if (choice === "dislike") save(likes, dislikes - 1, null);
    else if (choice === "like") save(likes - 1, dislikes + 1, "dislike");
    else save(likes, dislikes + 1, "dislike");
  };

  if (!ready) return null; // avoid a hydration flash before storage loads

  return (
    <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center gap-3">
      <span className="text-sm text-ink/50">Was this helpful?</span>
      <button
        type="button"
        onClick={like}
        aria-pressed={choice === "like"}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          choice === "like"
            ? "border-brand-300 bg-brand-50 text-brand-700"
            : "border-brand-100 text-ink/60 hover:bg-brand-50"
        }`}
      >
        <ThumbsUp size={16} /> {likes.toLocaleString("en-IN")}
      </button>
      <button
        type="button"
        onClick={dislike}
        aria-pressed={choice === "dislike"}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          choice === "dislike"
            ? "border-red-200 bg-red-50 text-red-600"
            : "border-brand-100 text-ink/60 hover:bg-brand-50"
        }`}
      >
        <ThumbsDown size={16} /> {dislikes.toLocaleString("en-IN")}
      </button>
    </div>
  );
}
