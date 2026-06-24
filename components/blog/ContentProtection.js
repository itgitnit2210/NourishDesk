"use client";

import { useEffect } from "react";

// Deterrent against casual copying. Mounted only on the public post page,
// so it never affects your nav, admin editor, or other routes.
// NOTE: This stops honest/casual copying — it cannot stop a determined person
// (screenshots, view-source, disabling JS all remain possible). It does NOT
// affect SEO: the HTML is unchanged and crawlers don't use these UI actions.
export default function ContentProtection() {
  useEffect(() => {
    const block = (e) => e.preventDefault();

    const blockKeys = (e) => {
      const k = (e.key || "").toLowerCase();
      // Ctrl/Cmd + C (copy), X (cut), S (save), U (view-source)
      if ((e.ctrlKey || e.metaKey) && ["c", "x", "s", "u"].includes(k)) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", block); // right-click menu
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("dragstart", block); // dragging images/text out
    document.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return null;
}
