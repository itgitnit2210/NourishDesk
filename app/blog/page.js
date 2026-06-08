import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createPublicClient } from "@/lib/supabase/public";
import { formatDate } from "@/lib/blog";

export const revalidate = 60; // ISR: refresh the list at most once a minute

export const metadata = {
  title: "Blog — Practical Nutrition Reads",
  description:
    "Honest, evidence-based nutrition articles from NourishDesk — sugar cravings, office eating, diabetes, and building habits that last.",
};

export default async function BlogIndexPage() {
  const supabase = createPublicClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, featured_image, categories, reading_time, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <>
      <Header />
      <main className="container-page section">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The NourishDesk Blog</span>
          <h1 className="heading-serif mt-5 text-4xl sm:text-5xl">
            Honest, practical nutrition reads
          </h1>
          <p className="mt-4 text-lg text-ink/70">
            No fads or fear-mongering — just clear advice you can use today.
          </p>
        </div>

        {(!posts || posts.length === 0) ? (
          <p className="mt-16 text-center text-ink/50">No posts published yet — check back soon.</p>
        ) : (
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-4xl border border-brand-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-44 overflow-hidden bg-brand-100">
                  {post.featured_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-400 to-brand-600 font-serif text-3xl text-white">
                      N
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {post.categories?.[0] && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                      {post.categories[0]}
                    </span>
                  )}
                  <h2 className="heading-serif mt-2 text-lg leading-snug">{post.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 text-xs text-ink/45">
                    {formatDate(post.published_at)} · {post.reading_time} min read
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
