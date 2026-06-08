import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { slugify, readingTime, buildExcerpt, cleanHtml } from "@/lib/blog";

async function uniqueSlug(supabase, base, excludeId) {
  let slug = base || "post";
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .neq("id", excludeId)
      .limit(1);
    if (!data || data.length === 0) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

// GET /api/posts/:id → load a single post into the editor.
export async function GET(_request, { params }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ post: data });
}

// PATCH /api/posts/:id → autosave / update / publish.
export async function PATCH(request, { params }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const updates = {};

  if (body.title !== undefined) updates.title = body.title.trim() || "Untitled";
  if (body.content !== undefined) {
    const content = cleanHtml(body.content);
    updates.content = content;
    updates.reading_time = readingTime(content);
    if (body.excerpt === undefined) updates.excerpt = buildExcerpt(content);
  }
  if (body.excerpt !== undefined) updates.excerpt = body.excerpt;
  if (body.featured_image !== undefined) updates.featured_image = body.featured_image;
  if (body.tags !== undefined) updates.tags = body.tags;
  if (body.categories !== undefined) updates.categories = body.categories;
  if (body.meta_title !== undefined) updates.meta_title = body.meta_title;
  if (body.meta_description !== undefined) updates.meta_description = body.meta_description;

  // Slug: only regenerate if explicitly provided.
  if (body.slug !== undefined && body.slug !== "") {
    updates.slug = await uniqueSlug(supabase, slugify(body.slug), params.id);
  }

  // Publishing: stamp published_at the first time it goes live.
  if (body.status !== undefined) {
    updates.status = body.status;
    if (body.status === "published") {
      const { data: existing } = await supabase
        .from("posts")
        .select("published_at")
        .eq("id", params.id)
        .single();
      if (!existing?.published_at) updates.published_at = new Date().toISOString();
    }
  }

  const { data, error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", params.id)
    .eq("author_id", user.id) // belt-and-braces on top of RLS
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data });
}

// DELETE /api/posts/:id
export async function DELETE(_request, { params }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", params.id)
    .eq("author_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
