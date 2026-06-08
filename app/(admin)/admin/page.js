import Link from "next/link";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { formatDate } from "@/lib/blog";
import { PlusCircle, FileText } from "lucide-react";
import DeletePostButton from "@/components/editor/DeletePostButton";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, status, published_at, updated_at, reading_time")
    .eq("author_id", user.id)
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="heading-serif text-2xl sm:text-3xl">Your posts</h1>
        <Link href="/admin/new" className="btn-primary">
          <PlusCircle size={16} /> New post
        </Link>
      </div>

      {(!posts || posts.length === 0) ? (
        <div className="rounded-4xl border border-dashed border-brand-200 bg-white p-14 text-center">
          <FileText size={32} className="mx-auto text-brand-300" />
          <p className="mt-4 text-ink/60">No posts yet. Write your first one!</p>
          <Link href="/admin/new" className="btn-primary mt-6">
            <PlusCircle size={16} /> New post
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-4xl border border-brand-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-brand-100 text-xs uppercase tracking-wider text-ink/50">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="hidden px-6 py-4 sm:table-cell">Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-brand-50 last:border-0">
                  <td className="px-6 py-4">
                    <Link href={`/admin/edit/${p.id}`} className="font-medium text-ink hover:text-brand-700">
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      p.status === "published"
                        ? "bg-brand-100 text-brand-700"
                        : "bg-sand text-ink/60"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="hidden px-6 py-4 text-ink/50 sm:table-cell">
                    {formatDate(p.updated_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      {p.status === "published" && (
                        <Link href={`/blog/${p.slug}`} className="text-brand-700 hover:underline">
                          View
                        </Link>
                      )}
                      <Link href={`/admin/edit/${p.id}`} className="text-ink/60 hover:text-brand-700">
                        Edit
                      </Link>
                      <DeletePostButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
