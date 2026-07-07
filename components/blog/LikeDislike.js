"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ThumbsUp, ThumbsDown } from "lucide-react";

// Shared like/dislike counts stored in Supabase (global, no login).
// The visitor's own choice is remembered locally so they can change/undo it,
// but the totals are the same for everyone.
export default function LikeDislike({ slug, initialLikes = 0, initialDislikes = 0 }) {
  const supabase = createClient();
  const [likes, setLikes] = useState(Number(initialLikes) || 0);
  const [dislikes, setDislikes] = useState(Number(initialDislikes) || 0);
  const [choice, setChoice] = useState(null); // this device's vote: "like" | "dislike" | null
  const [busy, setBusy] = useState(false);

  const choiceKey = `vote:${slug}`;

  // Load this device's remembered vote + refresh the live totals
  // (the page itself is cached, so counts there may be a little stale).
  useEffect(() => {
    try {
      setChoice(localStorage.getItem(choiceKey));
    } catch {
      /* ignore */
    }
    supabase
      .from("posts")
      .select("likes, dislikes")
      .eq("slug", slug)
      .single()
      .then(({ data }) => {
        if (data) {
          setLikes(Number(data.likes) || 0);
          setDislikes(Number(data.dislikes) || 0);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Run one or more vote actions, update UI optimistically, then sync to the
  // authoritative totals returned by the database.
  const apply = async (actions, nextChoice, optimistic) => {
    if (busy) return;
    setBusy(true);
    optimistic();
    setChoice(nextChoice);
    try {
      if (nextChoice) localStorage.setItem(choiceKey, nextChoice);
      else localStorage.removeItem(choiceKey);
    } catch {
      /* ignore */
    }

    let last;
    for (const action of actions) {
      const { data } = await supabase.rpc("vote_post", { post_slug: slug, action });
      last = data?.[0];
    }
    if (last) {
      setLikes(Number(last.likes) || 0);
      setDislikes(Number(last.dislikes) || 0);
    }
    setBusy(false);
  };

  const onLike = () => {
    if (choice === "like")
      apply(["unlike"], null, () => setLikes((n) => Math.max(0, n - 1)));
    else if (choice === "dislike")
      apply(["undislike", "like"], "like", () => {
        setDislikes((n) => Math.max(0, n - 1));
        setLikes((n) => n + 1);
      });
    else apply(["like"], "like", () => setLikes((n) => n + 1));
  };

  const onDislike = () => {
    if (choice === "dislike")
      apply(["undislike"], null, () => setDislikes((n) => Math.max(0, n - 1)));
    else if (choice === "like")
      apply(["unlike", "dislike"], "dislike", () => {
        setLikes((n) => Math.max(0, n - 1));
        setDislikes((n) => n + 1);
      });
    else apply(["dislike"], "dislike", () => setDislikes((n) => n + 1));
  };

  return (
    <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center gap-3">
      <span className="text-sm text-ink/50">Was this helpful?</span>
      <button
        type="button"
        onClick={onLike}
        disabled={busy}
        aria-pressed={choice === "like"}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
          choice === "like"
            ? "border-brand-300 bg-brand-50 text-brand-700"
            : "border-brand-100 text-ink/60 hover:bg-brand-50"
        }`}
      >
        <ThumbsUp size={16} /> {likes.toLocaleString("en-IN")}
      </button>
      <button
        type="button"
        onClick={onDislike}
        disabled={busy}
        aria-pressed={choice === "dislike"}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
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
