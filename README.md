# NourishDesk — Nutrition & Wellness Homepage

A clean, modern, single-page homepage for the **NourishDesk** nutrition and diet
consultation brand. Built with **Next.js (App Router)** + **Tailwind CSS**.

---

## 📁 Folder structure

```
nourishdesk/
├── app/
│   ├── globals.css        # Tailwind + base styles + reusable classes
│   ├── layout.js          # Fonts (Fraunces + Plus Jakarta Sans) + SEO metadata
│   └── page.js            # Homepage — assembles all sections
├── components/
│   ├── Header.js          # Logo, nav, mobile menu, CTA  (client component)
│   ├── Hero.js
│   ├── About.js
│   ├── Services.js
│   ├── WhyChoose.js
│   ├── Process.js
│   ├── BlogPreview.js
│   ├── CTA.js
│   └── Footer.js
├── public/
│   └── logo.png           # 👉 REPLACE THIS with your real logo
├── jsconfig.json          # enables the "@/..." import alias
├── next.config.js
├── postcss.config.js
├── tailwind.config.js     # brand colors + fonts live here
└── package.json
```

---

## 🖼️ Where to put your logo

Replace **`public/logo.png`** with your own file (keep the same name `logo.png`).

- Recommended: a square, transparent **PNG**, around **160×160px** or larger.
- It is used automatically in the header, hero card, and footer.
- If you name it something else, update the `src="/logo.png"` lines in
  `Header.js`, `Hero.js`, and `Footer.js`.

To add a real **photo of you**, drop `about.jpg` into `public/` and follow the
commented instructions inside `components/About.js`.

---

## ▶️ Run in GitHub Codespaces

1. Push this project to a GitHub repo (or open your repo in Codespaces).
2. In Codespaces, open the terminal and install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Codespaces will pop up a notification — click **"Open in Browser"** for the
   forwarded port **3000**. You'll see the live site and it auto-refreshes as
   you edit.

> Starting from scratch? You can also scaffold a fresh app with
> `npx create-next-app@latest` and then copy these files in. This project pins
> **Tailwind v3**, so the included `tailwind.config.js` and `postcss.config.js`
> are all you need.

---

## 🚀 Deploy on Vercel

1. Push your project to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project**.
3. Import your GitHub repo.
4. Vercel auto-detects Next.js — just click **Deploy** (no extra settings needed).
5. Your site goes live at `your-project.vercel.app`. Every push to `main`
   redeploys automatically.

> Tip: update the `metadataBase` URL in `app/layout.js` to your real domain for
> correct SEO/social previews.

---

## 🎨 Design choices (colors, fonts, layout)

**Colors** (defined in `tailwind.config.js`, easy to change):
| Token        | Hex       | Use                          |
|--------------|-----------|------------------------------|
| `brand-600`  | `#3c6646` | Primary green (buttons, CTA) |
| `brand-100`  | `#e4efe5` | Soft borders / chips         |
| `cream`      | `#FBF8F2` | Page background              |
| `sand`       | `#F2EBDD` | Warm accents                 |
| `clay`       | `#C97C5D` | Warm pop accent              |
| `ink`        | `#2C3530` | Body text                    |

**Fonts** (loaded via `next/font`, zero config):
- **Fraunces** — warm serif for headings (premium, organic feel)
- **Plus Jakarta Sans** — clean sans for body text

**Layout:** mobile-first, generous whitespace, rounded cards, soft shadows,
and subtle fade/float animations. Section padding and container width are set
by the `.section` and `.container-page` classes in `globals.css`.

---

## ✏️ Editing tips for beginners

- All text lives directly inside each component in `components/` — open a file,
  change the words, save.
- Change brand colors once in `tailwind.config.js` and they update everywhere.
- Navigation and buttons use anchor links (`#about`, `#services`, etc.) that
  smooth-scroll to each section.
- Swap the booking email in `CTA.js` and `Footer.js` for your real booking link.

---

Made for NourishDesk 🌿
