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
// Allows the inline styling the editor produces (font, size, color, highlight,
// alignment) but restricts style values to a safe, fixed set of properties.
export function cleanHtml(html = "") {
  return sanitizeHtml(html, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "p", "a", "ul", "ol", "li",
      "blockquote", "strong", "em", "u", "s", "code", "pre",
      "br", "hr", "img", "figure", "figcaption", "span", "mark",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      span: ["class", "style"],
      mark: ["style", "data-color"],
      code: ["class"],
      pre: ["class"],
      h1: ["style"],
      h2: ["style"],
      h3: ["style"],
      h4: ["style"],
      p: ["style"],
      li: ["style"],
      blockquote: ["style"],
    },
    allowedStyles: {
      "*": {
        color: [
          /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
          /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/,
          /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(?:0|1|0?\.\d+)\s*\)$/,
          /^[a-zA-Z]+$/,
        ],
        "background-color": [
          /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
          /^rgb\(/,
          /^rgba\(/,
          /^[a-zA-Z]+$/,
        ],
        "font-family": [/^[\w\s,'"()-]+$/],
        "font-size": [/^\d+(?:\.\d+)?(?:px|em|rem|%)$/],
        "text-align": [/^(?:left|right|center|justify)$/],
      },
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
