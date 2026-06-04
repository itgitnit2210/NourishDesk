import {
  Scale,
  Building2,
  Activity,
  UtensilsCrossed,
  Flower2,
  Stethoscope,
} from "lucide-react";

const services = [
  {
    icon: Scale,
    title: "Weight Management",
    desc: "Sustainable fat loss or healthy weight gain built on real food and consistent habits — no starvation, no rebound.",
  },
  {
    icon: Building2,
    title: "Corporate Wellness",
    desc: "Practical nutrition workshops and plans for teams and busy employees who eat on the go and sit all day.",
  },
  {
    icon: Activity,
    title: "Diabetes & Lifestyle Nutrition",
    desc: "Blood-sugar-friendly eating for diabetes, prediabetes, PCOS, cholesterol, and other lifestyle conditions.",
  },
  {
    icon: UtensilsCrossed,
    title: "Meal Planning",
    desc: "Customized, balanced Indian meal plans that match your taste, budget, kitchen, and weekly routine.",
  },
  {
    icon: Flower2,
    title: "Women's Health Nutrition",
    desc: "Support across PCOS, pregnancy, postpartum, and menopause with nourishing, body-friendly guidance.",
  },
  {
    icon: Stethoscope,
    title: "General Diet Consultation",
    desc: "Not sure where to start? A clear, personalized assessment and roadmap for better everyday eating.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">What I Offer</span>
          <h2 className="heading-serif mt-5 text-3xl sm:text-4xl">
            Services designed around how you really live
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            Pick a focus area or start with a general consultation — every plan
            is personalized to you.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group rounded-4xl border border-brand-100 bg-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <Icon size={26} />
              </span>
              <h3 className="heading-serif mt-5 text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
