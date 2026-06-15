"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

// Invisible component. On mount, records ONE view per browser session per post
// (so refreshes don't inflate the count). Fire-and-forget — never blocks the page.
export default function ViewCounter({ slug }) {
  useEffect(() => {
    if (!slug) return;
    const key = `viewed:${slug}`;
    if (sessionStorage.getItem(key)) return; // already counted this session

    const supabase = createClient();
    supabase
      .rpc("increment_post_views", { post_slug: slug })
      .then(() => sessionStorage.setItem(key, "1"))
      .catch(() => {}); // ignore errors — analytics shouldn't break the page
  }, [slug]);

  return null;
}
