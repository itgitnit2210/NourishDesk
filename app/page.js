import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChoose from "@/components/WhyChoose";
import Process from "@/components/Process";
import BlogPreview from "@/components/BlogPreview";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <Process />
        <BlogPreview />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
