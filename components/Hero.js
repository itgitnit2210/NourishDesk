import Image from "next/image";
import { Sparkles, Leaf, HeartPulse, Apple } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Soft background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-sand/70 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />
      </div>

      <div className="container-page grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-2 lg:gap-10 lg:pb-28 lg:pt-24">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <span className="eyebrow">
            <Sparkles size={14} /> Personalized nutrition guidance for real life
          </span>

          <h1 className="heading-serif mt-6 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            Eat well, live better —{" "}
            <span className="text-brand-600">without the crash diets.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            NourishDesk helps busy professionals, students, and families build
            healthy habits with practical, evidence-based nutrition plans made
            for Indian lifestyles — not restrictive fads.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary">
              Book a Consultation
            </a>
            <a href="#services" className="btn-secondary">
              Explore Services
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink/60">
            <span className="flex items-center gap-2">
              <Leaf size={16} className="text-brand-500" /> Evidence-based
            </span>
            <span className="flex items-center gap-2">
              <HeartPulse size={16} className="text-brand-500" /> Habit-focused
            </span>
            <span className="flex items-center gap-2">
              <Apple size={16} className="text-brand-500" /> Real Indian meals
            </span>
          </div>
        </div>

        {/* Right: visual */}
        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="relative mx-auto max-w-md">
            {/* Main card */}
            <div className="rounded-4xl bg-white p-8 shadow-soft ring-1 ring-brand-100">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="NourishDesk"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-2xl object-contain"
                />
                <div>
                  <p className="font-serif text-lg font-semibold text-ink">
                    NourishDesk
                  </p>
                  <p className="text-xs text-ink/50">
                    Nutrition · Diet · Wellness
                  </p>
                </div>
              </div>

              {/* Mock plan list */}
              <div className="mt-6 space-y-3">
                {[
                  { t: "Lifestyle assessment", d: "Understand your routine" },
                  { t: "Personalized plan", d: "Built around your meals" },
                  { t: "Weekly check-ins", d: "Track & adjust" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.t}</p>
                      <p className="text-xs text-ink/50">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating stat chip */}
            <div className="absolute -bottom-6 -left-6 hidden animate-float rounded-2xl bg-brand-600 px-5 py-4 text-white shadow-soft sm:block">
              <p className="font-serif text-2xl font-semibold">500+</p>
              <p className="text-xs text-white/80">happy clients</p>
            </div>

            {/* Floating leaf chip */}
            <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-clay px-4 py-3 text-white shadow-soft sm:flex sm:items-center sm:gap-2">
              <Leaf size={18} />
              <span className="text-sm font-semibold">No crash diets</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
