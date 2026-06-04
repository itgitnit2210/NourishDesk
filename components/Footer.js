import Image from "next/image";
import { Instagram, Linkedin, Twitter, Mail } from "lucide-react";

const footerLinks = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Weight Management", href: "#services" },
      { label: "Corporate Wellness", href: "#services" },
      { label: "Diabetes Nutrition", href: "#services" },
      { label: "Meal Planning", href: "#services" },
    ],
  },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@nourishdesk.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="NourishDesk logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl object-contain"
              />
              <span className="font-serif text-xl font-semibold text-ink">
                Nourish<span className="text-brand-600">Desk</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
              Practical, evidence-based nutrition and wellness consulting for
              busy people living modern lives. No crash diets — just real
              guidance that lasts.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-100 text-ink/60 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">
                {col.heading}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink/60 transition-colors hover:text-brand-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-brand-100 pt-7 text-sm text-ink/50 sm:flex-row">
          <p>© {new Date().getFullYear()} NourishDesk. All rights reserved.</p>
          <p>Made with care for healthier everyday living.</p>
        </div>
      </div>
    </footer>
  );
}
