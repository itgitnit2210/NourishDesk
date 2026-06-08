import { createClient, getCurrentUser } from "@/lib/supabase/server";
import PostForm from "@/components/editor/PostForm";

export const metadata = { title: "New post" };

export default async function NewPostPage() {
  const user = await getCurrentUser();
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  return <PostForm authorName={profile?.full_name || user.email} />;
}
