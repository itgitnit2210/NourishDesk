"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeletePostButton({ id }) {
  const router = useRouter();

  const remove = async () => {
    if (!confirm("Delete this post permanently?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Could not delete the post.");
  };

  return (
    <button
      onClick={remove}
      className="text-ink/40 hover:text-red-600"
      aria-label="Delete post"
      title="Delete"
    >
      <Trash2 size={15} />
    </button>
  );
}
