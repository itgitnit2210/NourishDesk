import { ArrowRight } from "lucide-react";

const posts = [
  {
    tag: "Cravings",
    color: "from-clay/80 to-clay",
    title: "Why you crave sugar at 4 PM (and how to beat it)",
    excerpt:
      "That afternoon slump isn't a willpower problem. Here's the simple science behind sugar cravings and three swaps that actually work.",
    read: "5 min read",
  },
  {
    tag: "Office Life",
    color: "from-brand-400 to-brand-600",
    title: "Healthy eating when your desk job runs your day",
    excerpt:
      "Long meetings, skipped lunches, endless tea breaks. A realistic guide to eating well without quitting your job or your chai.",
    read: "6 min read",
  },
  {
    tag: "Diabetes",
    color: "from-brand-500 to-brand-800",
    title: "Managing blood sugar without giving up rice & roti",
    excerpt:
      "You don't have to abandon Indian staples to manage diabetes. Learn how portioning, pairing, and timing change everything.",
    read: "7 min read",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="section">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">From the Blog</span>
            <h2 className="heading-serif mt-5 text-3xl sm:text-4xl">
              Honest, practical nutrition reads
            </h2>
            <p className="mt-4 text-lg text-ink/70">
              No fads or fear-mongering — just clear advice you can use today.
            </p>
          </div>
          <a
            href="#blog"
            className="hidden items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 sm:inline-flex"
          >
            View all posts <ArrowRight size={16} />
          </a>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group flex flex-col overflow-hidden rounded-4xl border border-brand-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image placeholder — swap with <Image src="/blog-1.jpg" .../> */}
              <div
                className={`relative flex h-44 items-end bg-gradient-to-br ${post.color} p-5`}
              >
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
                  {post.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="heading-serif text-lg leading-snug">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-ink/45">{post.read}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-transform group-hover:translate-x-0.5">
                    Read more <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
