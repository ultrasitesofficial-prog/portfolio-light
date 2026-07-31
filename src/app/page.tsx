import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Studio from "@/components/sections/Studio";
import Voices from "@/components/sections/Voices";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import { faqs } from "@/data/voices";

/* FAQPage structured data — mirrors the FAQ section for rich results. */
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Work />
      <Services />
      <Process />
      <Studio />
      <Voices />
      <Faq />
      <Contact />
    </>
  );
}
