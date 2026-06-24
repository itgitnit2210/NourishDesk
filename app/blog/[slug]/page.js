import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Article from "@/components/blog/Article";
import ViewCounter from "@/components/blog/ViewCounter";
import ContentProtection from "@/components/blog/ContentProtection";
import { createPublicClient } from "@/lib/supabase/public";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

async function getPost(slug) {
  const supabase = createPublicClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*, profiles(full_name)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return post;
}

// Dynamic, per-post SEO metadata.
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found" };

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || "";
  const url = `/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      images: post.featured_image ? [{ url: post.featured_image }] : [],
    },
    twitter: {
      card: post.featured_image ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const authorName = post.profiles?.full_name || "NourishDesk";

  // Article structured data for rich search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.featured_image ? [post.featured_image] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "NourishDesk" },
  };

  return (
    <>
      <Header />
      <main className="container-page section">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          <ArrowLeft size={16} /> All posts
        </Link>
        <Article post={post} authorName={authorName} />
        <ViewCounter slug={post.slug} />
        <ContentProtection />
      </main>
      <Footer />
    </>
  );
}
