import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-4xl bg-brand-700 px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-brand-500/40 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-brand-900/50 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to start your nutrition journey?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-50/85">
              Take the first step toward eating well and feeling better — with a
              plan that actually fits your life. Your first consultation is a
              relaxed, no-pressure conversation.
            </p>
            <a
              href="mailto:hello@nourishdesk.com"
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-700 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-50"
            >
              Book Your First Consultation <ArrowRight size={16} />
            </a>
            <p className="mt-4 text-sm text-brand-100/70">
              Replace the email above with your booking link or contact details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
