import { Search, ClipboardList, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Understand your lifestyle",
    desc: "We start with a relaxed conversation about your routine, health history, food preferences, and goals — so the plan fits the real you.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Create your nutrition plan",
    desc: "You get a personalized, practical plan built around your meals, schedule, and budget — clear, doable, and genuinely enjoyable.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Track progress & improve",
    desc: "Regular check-ins help us adjust, celebrate wins, and keep you moving forward — building habits that last well beyond our sessions.",
  },
];

export default function Process() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How It Works</span>
          <h2 className="heading-serif mt-5 text-3xl sm:text-4xl">
            Getting started is simple
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            Three easy steps from confused to confident about your nutrition.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden
            className="absolute left-[16%] right-[16%] top-9 hidden h-px bg-brand-100 md:block"
          />

          {steps.map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="relative text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-brand-100 bg-cream shadow-card">
                <Icon size={28} className="text-brand-600" />
              </div>
              <span className="mt-5 inline-block font-serif text-sm font-semibold tracking-widest text-brand-400">
                STEP {step}
              </span>
              <h3 className="heading-serif mt-2 text-xl">{title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-ink/65">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
