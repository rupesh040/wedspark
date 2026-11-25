import About from "@/components/About";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import contentData from "@/data/content.json";
import type { WedSparkContent } from "@/data/type";

export default function Home() {
  const content: WedSparkContent = contentData;
  const headerData = content.WedSpark.sections.Header.variants.WedSparkHeader1;
  const heroData = content.WedSpark.sections.Hero.variants.WedSparkHero1;
  const statsData = content.WedSpark.sections.Stats.variants.WedSparkStats1;
  const aboutData = content.WedSpark.sections.About.variants.WedSparkAbout1;
  const servicesData = content.WedSpark.sections.Service.variants.WedSparkService1;
  const whyChooseUsData = content.WedSpark.sections.WhyChooseUs.variants.WedSparkWhyChooseUs1;
  const galleryData = content.WedSpark.sections.Gallery.variants.WedSparkGallery1;
  const testimonialData = content.WedSpark.sections.Testimonial.variants.WedSparkTestimonial1;
  const faqsData = content.WedSpark.sections.Faqs.variants.WedSparkFaqs1;
  const contactData = content.WedSpark.sections.Contact.variants.WedSparkContact1;
  const footerData = content.WedSpark.sections.Footer.variants.WedSparkFooter1;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar data={headerData} />
      <main className="flex-1">
        <Hero data={heroData} />
        <About data={aboutData} />
        <Services data={servicesData} />
        <WhyChooseUs data={whyChooseUsData} />
        <Gallery data={galleryData} />
        <Stats data={statsData} />
        <Testimonials data={testimonialData} />
        <Faq data={faqsData} />
        <Contact data={contactData} />
      </main>
      <Footer data={footerData} />
    </div>
  );
}
