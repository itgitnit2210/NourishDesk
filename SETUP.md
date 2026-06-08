# NourishDesk Blog — Setup Guide

A production-ready blogging system for your existing NourishDesk Next.js site:
Supabase (Postgres + Auth + Storage) · Tiptap editor · Tailwind CSS.
Features: auth, autosave, live preview, rich text, images, tags/categories,
auto slugs, reading time, full SEO, and ISR caching that scales to thousands
of posts.

---

## 1. Drop the files in

Copy the contents of this folder into your existing `nourishdesk` project,
keeping the same paths. New files only — nothing here overwrites your homepage.

```
lib/blog.js
lib/supabase/client.js
lib/supabase/server.js
lib/supabase/public.js
middleware.js                      ← project root
supabase/schema.sql                ← run once in Supabase (step 3)
components/editor/RichTextEditor.js
components/editor/Toolbar.js
components/editor/PostForm.js
components/editor/LogoutButton.js
components/editor/DeletePostButton.js
components/blog/Article.js
app/login/page.js
app/(admin)/admin/layout.js
app/(admin)/admin/page.js
app/(admin)/admin/new/page.js
app/(admin)/admin/edit/[id]/page.js
app/api/posts/route.js
app/api/posts/[id]/route.js
app/api/upload/route.js
app/blog/page.js
app/blog/[slug]/page.js
app/sitemap.js
```

## 2. Install dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr @tiptap/react @tiptap/pm \
  @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-link \
  @tiptap/extension-image @tiptap/extension-placeholder sanitize-html

npm install -D @tailwindcss/typography
```

Then enable the typography plugin in **tailwind.config.js**:

```js
plugins: [require("@tailwindcss/typography")],
```

And add the `.input` class + editor styles from **globals-additions.css** into
your `app/globals.css` (instructions are inside that file).

## 3. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project** (free tier is fine).
2. Open **SQL Editor → New query**, paste all of `supabase/schema.sql`, click **Run**.
   This creates the tables, security rules, triggers, and image storage bucket.
3. **Authentication → Providers → Email**: keep it on, and turn **OFF**
   "Allow new users to sign up" (this is a private, owner-only blog).
4. **Authentication → Users → Add user**: create your own account with an email
   + password. The schema auto-creates a matching profile row.
5. (Optional) Set your display name: **Table Editor → profiles →** edit your row's
   `full_name`. This is the author name shown on posts.

## 4. Add environment variables

Copy `.env.local.example` to `.env.local` and fill in values from
**Supabase → Project Settings → API** (Project URL + anon public key).

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

> Never put the `service_role` key in this app — everything uses the safe
> anon key plus Row Level Security.

## 5. Run it

```bash
npm run dev
```

- Visit **/login**, sign in with the user you created.
- You land on **/admin** → click **New post**, write, watch it autosave,
  hit **Preview**, then **Publish**.
- Public posts appear at **/blog** and **/blog/your-slug**.

> Tip: your homepage already links to `#blog`. Point the nav "Blog" link to
> `/blog` instead (in `components/Header.js`) so visitors reach the real blog.

## 6. Deploy on Vercel

1. Commit and push to GitHub as usual.
2. In Vercel → your project → **Settings → Environment Variables**, add the same
   three variables from `.env.local` (for Production + Preview).
3. Redeploy. Done — autosave, auth, images, and SEO all work in production.

---

## How authorization works

- Only logged-in users can reach `/admin` (enforced by `middleware.js`).
- The database enforces the real rules via Row Level Security: anyone can read
  **published** posts; only the author can read their drafts or create/edit/
  delete their own posts. Even if someone called the API directly, Postgres
  refuses unauthorized writes.
- `author_id` is always set server-side from the session — never trusted from
  the browser.

## Scaling notes

- Public pages use `revalidate = 60` (ISR): they're served from cache and
  regenerate in the background, so traffic doesn't hammer the database.
- Indexes on status/date, tags, and categories keep queries fast at thousands
  of rows. Add pagination to `/blog` (`.range(from, to)`) when you have many posts.
