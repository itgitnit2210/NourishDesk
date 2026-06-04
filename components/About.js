import { Check } from "lucide-react";

const highlights = [
  "Practical, real-life guidance",
  "Habit-based nutrition",
  "Sustainable lifestyle support",
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        {/* Visual */}
        <div className="relative order-last lg:order-first">
          <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-brand-100 via-sand to-brand-50 p-1 shadow-card">
            {/*
              👉 To use a real portrait, drop your photo at /public/about.jpg
              and replace this block with:
              <Image src="/about.jpg" alt="Your name, Nutritionist" width={640} height={720}
                className="h-full w-full rounded-[1.9rem] object-cover" />
            */}
            <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-[1.9rem] bg-brand-600/95 text-center text-white">
              <span className="font-serif text-6xl">N</span>
              <p className="mt-4 font-serif text-2xl font-semibold">
                Mayuri Singh
              </p>
              <p className="mt-1 text-sm text-white/80">
                Nutritionist & Dietician
              </p>
              <p className="mt-6 max-w-[14rem] text-xs text-white/60">
                Profile Photo
              </p>
            </div>
          </div>
          {/* Accent badge */}
          <div className="absolute -bottom-5 right-6 rounded-2xl bg-white px-5 py-3 shadow-soft ring-1 ring-brand-100">
            <p className="font-serif text-lg font-semibold text-brand-700">
              8+ years
            </p>
            <p className="text-xs text-ink/50">helping people eat better</p>
          </div>
        </div>

        {/* Copy */}
        <div>
          <span className="eyebrow">About NourishDesk</span>
          <h2 className="heading-serif mt-5 text-3xl sm:text-4xl">
            Nutrition that fits your life — not the other way around.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Hi, I&apos;m a qualified nutritionist, dietician, and wellness
            consultant. I started NourishDesk because I kept meeting smart,
            hard-working people who were tired of confusing diet advice, guilt,
            and plans that never lasted past week two.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            My approach is simple and human: understand how you actually live,
            then build small, doable changes around your real meals, work
            schedule, and culture. No shame, no extreme rules — just steady
            progress you can keep.
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Check size={14} />
                </span>
                <span className="text-ink/80">{item}</span>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-primary mt-9">
            Work with me
          </a>
        </div>
      </div>
    </section>
  );
}
