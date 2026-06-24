import { formatDate } from "@/lib/blog";

// Renders a full blog article. `post.content` must already be sanitized HTML.
// Used by the public /blog/[slug] page AND the editor's live preview.
// The `select-none` + touch-callout classes make the text non-selectable.
export default function Article({ post, authorName }) {
  const edited =
    post.updated_at &&
    post.published_at &&
    new Date(post.updated_at).getTime() - new Date(post.published_at).getTime() >
      60 * 1000;

  return (
    <article className="mx-auto w-full max-w-3xl select-none [-webkit-touch-callout:none]">
      {/* Categories */}
      {post.categories?.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {post.categories.map((c) => (
            <span key={c} className="eyebrow">
              {c}
            </span>
          ))}
        </div>
      )}

      <h1 className="heading-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>

      {/* Meta row */}
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/60">
        <span className="font-medium text-ink/80">{authorName || "NourishDesk"}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.published_at || post.created_at}>
          {formatDate(post.published_at || post.created_at)}
        </time>
        <span aria-hidden>·</span>
        <span>{post.reading_time} min read</span>
        {post.views != null && (
          <>
            <span aria-hidden>·</span>
            <span>{post.views.toLocaleString("en-IN")} views</span>
          </>
        )}
        {edited && (
          <>
            <span aria-hidden>·</span>
            <span className="italic">Updated {formatDate(post.updated_at)}</span>
          </>
        )}
      </div>

      {/* Featured image */}
      {post.featured_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.featured_image}
          alt={post.title}
          className="mt-8 aspect-[16/9] w-full rounded-4xl object-cover shadow-card"
        />
      )}

      {/* Body */}
      <div
        className="prose prose-lg mt-10 max-w-none prose-headings:font-serif prose-headings:text-ink prose-a:text-brand-700 prose-blockquote:border-brand-300 prose-img:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: post.content || "<p></p>" }}
      />

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2 border-t border-brand-100 pt-8">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
