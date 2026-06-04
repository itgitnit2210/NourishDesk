import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Display / heading font — warm, premium, organic
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

// Body font — clean, modern, highly readable
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://nourishdesk.vercel.app"),
  title: {
    default: "NourishDesk — Practical Nutrition & Wellness Consulting",
    template: "%s | NourishDesk",
  },
  description:
    "NourishDesk offers personalized, evidence-based nutrition and diet consultation for busy professionals, students, and anyone navigating modern lifestyles. No crash diets — just practical, habit-focused guidance.",
  keywords: [
    "nutritionist",
    "dietician",
    "diet consultation",
    "wellness consultant",
    "Indian meal plans",
    "corporate wellness",
    "weight management",
    "diabetes nutrition",
  ],
  authors: [{ name: "NourishDesk" }],
  openGraph: {
    title: "NourishDesk — Practical Nutrition & Wellness Consulting",
    description:
      "Personalized, evidence-based nutrition guidance for real life. Book a consultation with NourishDesk.",
    url: "https://nourishdesk.vercel.app",
    siteName: "NourishDesk",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "NourishDesk — Practical Nutrition & Wellness Consulting",
    description:
      "Personalized, evidence-based nutrition guidance for real life.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#FBF8F2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
