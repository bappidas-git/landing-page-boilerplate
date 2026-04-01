/* ============================================
   SEO Configuration
   Central configuration for all SEO-related
   settings, schemas, and page metadata.

   TODO: Replace all placeholder values with
   your actual business information.
   See SEO_GUIDE.md for detailed instructions.
   ============================================ */

export const seoConfig = {
  // =========================================
  // Site-level Settings
  // =========================================
  siteName: 'Your Business Name',
  siteUrl: 'https://yourbusiness.com',
  defaultTitle: 'Your Business Name | Tagline',
  titleTemplate: '%s | Your Business Name',
  defaultDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Learn more about our services, plans, and offerings. Get in touch with our team today.',
  defaultImage: 'https://yourbusiness.com/og-image.jpg',
  locale: 'en_IN',
  language: 'en',

  // =========================================
  // Organization Details
  // =========================================
  organization: {
    name: 'Your Company Pvt. Ltd.',
    alternateName: 'Your Business Name',
    url: 'https://yourbusiness.com',
    logo: 'https://yourbusiness.com/logo.png',
    email: 'info@yourbusiness.com',
    phone: '+91-XXXXXXXXXX',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    address: {
      streetAddress: '',
      addressLocality: 'Your City',
      addressRegion: 'Your State',
      postalCode: '',
      addressCountry: 'IN',
    },
    sameAs: [
      // TODO: Add your social media profile URLs
      // 'https://www.facebook.com/yourbusiness',
      // 'https://www.instagram.com/yourbusiness',
      // 'https://www.linkedin.com/company/yourbusiness',
      // 'https://twitter.com/yourbusiness',
      // 'https://www.youtube.com/@yourbusiness',
    ],
    founder: {
      name: '',
      jobTitle: '',
    },
    foundingDate: '',
  },

  // =========================================
  // Page-specific SEO Settings
  // =========================================
  pages: {
    home: {
      title: 'Your Business Name | Tagline',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Learn more about our services, plans, and offerings.',
      keywords: 'your business, services, plans, contact us',
    },
    thankYou: {
      title: 'Thank You | Your Business Name',
      description: 'Thank you for your enquiry. Our team will contact you shortly.',
      robots: 'noindex, nofollow',
    },
    admin: {
      title: 'Admin | Your Business Name',
      robots: 'noindex, nofollow',
    },
  },

  // =========================================
  // FAQ Schema Data
  // TODO: Replace with actual FAQs
  // =========================================
  faqs: [
    {
      question: 'What services do you offer?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. We offer multiple service tiers to fit your needs.',
    },
    {
      question: 'What is the investment required?',
      answer:
        'Lorem ipsum dolor sit amet. We offer flexible investment plans starting from our basic tier up to premium options.',
    },
    {
      question: 'What support do you provide?',
      answer:
        'Lorem ipsum dolor sit amet. We provide comprehensive support including setup, training, technology, and ongoing operational guidance.',
    },
    {
      question: 'Where are you located?',
      answer:
        'Lorem ipsum dolor sit amet. We operate across multiple locations and are expanding to new areas.',
    },
    {
      question: 'How do I get started?',
      answer:
        'Lorem ipsum dolor sit amet. Fill out the enquiry form on our website or call us directly. Our team will guide you through the process.',
    },
  ],

  // =========================================
  // LocalBusiness Schema Settings
  // =========================================
  localBusiness: {
    type: 'LocalBusiness', // Can be: Store, Restaurant, ProfessionalService, etc.
    priceRange: '$$',
    openingHours: {
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '08:00',
      closes: '22:00',
    },
    geo: {
      latitude: '',
      longitude: '',
    },
  },
};
