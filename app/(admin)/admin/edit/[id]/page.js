import { notFound } from "next/navigation";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import PostForm from "@/components/editor/PostForm";

export const metadata = { title: "Edit post" };

export default async function EditPostPage({ params }) {
  const user = await getCurrentUser();
  const supabase = createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .eq("author_id", user.id)
    .single();

  if (!post) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  return <PostForm initialPost={post} authorName={profile?.full_name || user.email} />;
}
