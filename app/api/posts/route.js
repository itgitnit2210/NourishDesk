import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { slugify, readingTime, buildExcerpt, cleanHtml } from "@/lib/blog";

// Make sure a slug is unique by appending -2, -3, ... if needed.
async function uniqueSlug(supabase, base, excludeId = null) {
  let slug = base || "post";
  let n = 1;
  // Loop until we find a free slug.
  // (Cheap: indexed unique lookup, runs a handful of times at most.)
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let query = supabase.from("posts").select("id").eq("slug", slug).limit(1);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query;
    if (!data || data.length === 0) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

// GET /api/posts  → the logged-in author's posts (newest first), for the dashboard.
export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, status, published_at, updated_at, reading_time")
    .eq("author_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

// POST /api/posts  → create a new draft. Returns the created post.
export async function POST(request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const title = (body.title || "Untitled").trim();
  const content = cleanHtml(body.content || "");
  const base = slugify(body.slug || title) || "untitled";
  const slug = await uniqueSlug(supabase, base);

  const { data, error } = await supabase
    .from("posts")
    .insert({
      author_id: user.id,
      title,
      slug,
      content,
      excerpt: body.excerpt || buildExcerpt(content),
      featured_image: body.featured_image || null,
      tags: body.tags || [],
      categories: body.categories || [],
      meta_title: body.meta_title || null,
      meta_description: body.meta_description || null,
      reading_time: readingTime(content),
      status: "draft",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data }, { status: 201 });
}
