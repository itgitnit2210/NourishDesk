// Small, dependency-light helpers shared across the blog feature.
import sanitizeHtml from "sanitize-html";

// Turn a title into an SEO-friendly slug: "My First Post!" -> "my-first-post"
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9\s-]/g, "") // remove non-url chars
    .replace(/[\s_-]+/g, "-") // collapse spaces/underscores to single dash
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
}

// Remove HTML tags to get plain text (for word counts / excerpts).
export function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Estimate reading time in minutes (average adult ~200 wpm).
export function readingTime(html = "") {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Build a short excerpt from content if the author didn't write one.
export function buildExcerpt(html = "", maxLength = 160) {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

// Sanitize editor HTML before storing/rendering to prevent XSS.
export function cleanHtml(html = "") {
  return sanitizeHtml(html, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "p", "a", "ul", "ol", "li",
      "blockquote", "strong", "em", "u", "s", "code", "pre",
      "br", "hr", "img", "figure", "figcaption", "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      span: ["class"],
      code: ["class"],
      pre: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      // Make external links safe by default.
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}

// Format a date like "5 June 2026".
export function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
