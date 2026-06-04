import { FlaskConical, Soup, ShieldCheck, UserRound, Repeat } from "lucide-react";

const reasons = [
  {
    icon: FlaskConical,
    title: "Evidence-based guidance",
    desc: "Recommendations grounded in nutrition science — not trends or social media myths.",
  },
  {
    icon: Soup,
    title: "Practical Indian meal plans",
    desc: "Familiar foods, regional flavours, and meals your family can actually cook and enjoy.",
  },
  {
    icon: ShieldCheck,
    title: "No crash diets",
    desc: "No starvation, detox teas, or extreme rules. Just balanced, sustainable eating.",
  },
  {
    icon: UserRound,
    title: "Personalized consultation",
    desc: "Plans tailored to your health, schedule, preferences, and goals — never copy-paste.",
  },
  {
    icon: Repeat,
    title: "Habit-focused approach",
    desc: "Small, lasting changes that compound over time, so results actually stick.",
  },
];

export default function WhyChoose() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Heading */}
          <div className="lg:col-span-4">
            <span className="eyebrow">Why NourishDesk</span>
            <h2 className="heading-serif mt-5 text-3xl sm:text-4xl">
              A calmer, smarter way to get healthy
            </h2>
            <p className="mt-4 text-lg text-ink/70">
              You deserve guidance that respects your time, your culture, and
              your sanity. Here&apos;s what makes working together different.
            </p>
            <a href="#contact" className="btn-primary mt-8">
              Book Consultation
            </a>
          </div>

          {/* Reasons */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 rounded-4xl border border-brand-100 bg-white p-6 transition-shadow hover:shadow-card"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
