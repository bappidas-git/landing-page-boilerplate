# Landing Page Boilerplate

A high-converting, mobile-first landing page boilerplate for lead generation. Built with React 18, Material UI v5, and Framer Motion.

## Features

- Responsive, mobile-first design with bottom navigation
- Animated sections with scroll-triggered transitions (Framer Motion)
- Lead capture forms with validation, duplicate prevention, and webhook integration
- SEO-optimized with JSON-LD structured data templates
- PWA-ready with manifest and service worker support
- Google Tag Manager integration
- Swiper-based carousels for mobile
- SweetAlert2 success/error modals
- Legal modals (Privacy Policy, Terms, Disclaimer)
- Thank You page with confetti animation

## Tech Stack

- React 18
- Material UI v5
- Framer Motion
- CSS Modules
- Swiper
- SweetAlert2
- Iconify (MDI icons)
- React Router v6

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Folder Structure

```
├── public/
│   ├── index.html          # HTML template with loader, SEO meta, JSON-LD
│   ├── manifest.json       # PWA manifest
│   └── sitemap.xml         # Sitemap template
├── src/
│   ├── components/
│   │   ├── common/         # Header, Footer, LeadForm, MobileNav, etc.
│   │   └── sections/       # Hero, About, Services, Features, CTA, etc.
│   ├── context/            # ModalContext, ThemeContext
│   ├── data/               # Content data files (edit these first!)
│   ├── hooks/              # Custom hooks (useInView, useMediaQuery, etc.)
│   ├── pages/              # ThankYou page
│   ├── theme/              # MUI theme configuration
│   └── utils/              # Webhook submit, validators, formatters
├── .env                    # Environment variables
├── .env.example            # Environment variables template
└── CLAUDE.md               # AI assistant instructions
```

## Customization Guide

### 1. Content (Start here)

Edit the data files in `src/data/`:
- `servicesData.js` — Service/plan cards
- `serviceDetailsData.js` — Detailed service info
- `featuresData.js` — Feature categories and items
- `statsData.js` — Key statistics/highlights
- `locationData.js` — Location and contact info

Then update hardcoded text in section components under `src/components/sections/`.

### 2. Branding

- Replace logo URLs in `Header.jsx`, `Footer.jsx`, `MobileDrawer.jsx`, and `public/index.html`
- Update brand colors in `src/theme/muiTheme.js`
- Update favicon and PWA icons in `public/`

### 3. Contact & Environment

- Copy `.env.example` to `.env` and fill in your values
- Update contact info in `src/data/locationData.js`

### 4. SEO

- Update meta tags and JSON-LD schemas in `public/index.html`
- Update `public/sitemap.xml` with your domain
- Update `public/manifest.json` with your app name

### 5. Form & Webhook

- Configure your webhook URL in `src/utils/webhookSubmit.js`
- See `PABBLY_INTEGRATION_GUIDE.md` for webhook setup

### 6. Analytics

- Replace GTM ID in `public/index.html` (search for `GTM-XXXXXXX`)

## Deployment

Build the production bundle:

```bash
npm run build
```

The `build/` folder is ready to deploy to any static hosting service (Netlify, Vercel, AWS S3, etc.).

## License

MIT
