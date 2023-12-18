import Features from "../../../components/Features";
import Testimonials from "../../../components/Testimonials";
import Pricing from "../../../components/Pricing";
import Email from "../../../components/Email";
import Hero from "@/components/Hero";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} heroSection={section} />;
    case "sections.feature-rows-group":
      return <Features key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    default:
      return null;
  }
}
