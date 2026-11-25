export type SocialPlatform =
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | (string & {});

export interface TemplateComponentRef {
  key: string;
  component: string;
}

export interface TemplatePage {
  components: TemplateComponentRef[];
}

export interface TemplateDefinition {
  shared: {
    Header: string;
    Footer: string;
  };
  pages: Record<string, TemplatePage>;
}

export interface TopBarContactInfo {
  address: string;
  addressHref: string;
  email: string;
  emailHref: string;
  followLabel: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  name: string;
  icon: SocialPlatform;
  href: string;
}

export interface NavLink {
  name: string;
  href: string;
  active: boolean;
}

export interface HeaderVariant {
  topBar: TopBarContactInfo;
  logo: string;
  logoAlt: string;
  links: NavLink[];
  button: string;
  buttonHref: string;
}

export interface HeaderSection {
  variants: {
    WedSparkHeader1: HeaderVariant;
  };
}

export interface HeroSlide {
  id: string;
  subtitle: string;
  headingLine1: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface HeroSliderSettings {
  autoplay: boolean;
  autoplayInterval: number;
}

export interface HeroAriaLabels {
  prevSlide: string;
  nextSlide: string;
  goToSlide: string;
}

export interface HeroVariant {
  sliderSettings: HeroSliderSettings;
  ariaLabels: HeroAriaLabels;
  slides: HeroSlide[];
}

export interface HeroSection {
  variants: {
    WedSparkHero1: HeroVariant;
  };
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface StatsVariant {
  items: StatItem[];
}

export interface StatsSection {
  variants: {
    WedSparkStats1: StatsVariant;
  };
}

export interface AboutImageItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface AboutVariant {
  tagline: string;
  heading: string;
  headingPart1: string;
  headingPart2: string;
  description: string;
  images: AboutImageItem[];
}

export interface AboutSection {
  variants: {
    WedSparkAbout1: AboutVariant;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  image: string;
  imageAlt: string;
  description: string;
}

export interface ServiceAriaLabels {
  prevService: string;
  nextService: string;
  selectService: string;
}

export interface ServiceVariant {
  tagline: string;
  headingPart1: string;
  headingHighlight: string;
  headingPart2: string;
  description: string;
  items: ServiceItem[];
  defaultActiveId?: string;
  ariaLabels: ServiceAriaLabels;
}

export interface ServiceSection {
  variants: {
    WedSparkService1: ServiceVariant;
  };
}

export interface WhyChooseUsFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface WhyChooseUsVariant {
  tagline: string;
  heading: string;
  headingPart1: string;
  headingPart2: string;
  description: string;
  image: string;
  imageAlt: string;
  features?: WhyChooseUsFeature[];
}

export interface WhyChooseUsSection {
  variants: {
    WedSparkWhyChooseUs1: WhyChooseUsVariant;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
}

export interface GalleryVariant {
  tagline: string;
  headingPart1: string;
  headingHighlight: string;
  description: string;
  items: GalleryItem[];
}

export interface GallerySection {
  variants: {
    WedSparkGallery1: GalleryVariant;
  };
}

export interface TestimonialItem {
  id: string;
  names: string;
  event: string;
  image: string;
  imageAlt: string;
  quote: string;
}

export interface TestimonialAriaLabels {
  prevTestimonial: string;
  nextTestimonial: string;
  goToTestimonial: string;
}

export interface TestimonialSliderSettings {
  autoplay: boolean;
  autoplayInterval: number;
}

export interface TestimonialVariant {
  tagline: string;
  headingPart1: string;
  headingHighlight: string;
  headingPart2: string;
  description: string;
  ariaLabels: TestimonialAriaLabels;
  sliderSettings: TestimonialSliderSettings;
  items: TestimonialItem[];
}

export interface TestimonialSection {
  variants: {
    WedSparkTestimonial1: TestimonialVariant;
  };
}

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface FaqAriaLabels {
  toggleQuestion: string;
}

export interface FaqVariant {
  tagline: string;
  headingPart1: string;
  headingHighlight: string;
  defaultOpenId?: string;
  ariaLabels: FaqAriaLabels;
  items: FaqItem[];
}

export interface FaqSection {
  variants: {
    WedSparkFaqs1: FaqVariant;
  };
}

export interface ContactFormField {
  name: string;
  placeholder: string;
  type: string;
  icon: string;
  required?: boolean;
}

export interface ContactImageItem {
  src: string;
  alt: string;
}

export interface ContactMessageField {
  name: string;
  placeholder: string;
  icon: string;
  required?: boolean;
}

export interface ContactFormConfig {
  fields: ContactFormField[];
  messageField: ContactMessageField;
  submitButtonText: string;
  successMessage: string;
}

export interface ContactVariant {
  tagline: string;
  headingPart1: string;
  headingHighlight: string;
  descriptionLine1: string;
  descriptionLine2: string;
  images: {
    top: ContactImageItem;
    bottom: ContactImageItem;
  };
  form: ContactFormConfig;
}

export interface ContactSection {
  variants: {
    WedSparkContact1: ContactVariant;
  };
}

export interface FooterLinkItem {
  name: string;
  href: string;
}

export interface FooterSocialItem {
  platform: string;
  href: string;
  label: string;
}

export interface FooterCopyright {
  textPrefix: string;
  brandName: string;
  textSuffix: string;
}

export interface FooterVariant {
  logo: string;
  logoAlt: string;
  links: FooterLinkItem[];
  socialLinks: FooterSocialItem[];
  copyright: FooterCopyright;
}

export interface FooterSection {
  variants: {
    WedSparkFooter1: FooterVariant;
  };
}

export interface WedSparkBrandData {
  templateComponents: {
    "template-1": TemplateDefinition;
  };
  sections: {
    Header: HeaderSection;
    Hero: HeroSection;
    Stats: StatsSection;
    About: AboutSection;
    Service: ServiceSection;
    WhyChooseUs: WhyChooseUsSection;
    Gallery: GallerySection;
    Testimonial: TestimonialSection;
    Faqs: FaqSection;
    Contact: ContactSection;
    Footer: FooterSection;
  };
}

export interface WedSparkContent {
  WedSpark: WedSparkBrandData;
}
