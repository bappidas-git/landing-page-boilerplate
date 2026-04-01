# Landing Page Boilerplate

## Overview

A high-converting, mobile-first landing page boilerplate built with React 18, Material UI, and Framer Motion. Designed for lead generation via Google Ads or any paid traffic source.

## Project Structure

- `src/components/sections/` — Page sections (Hero, About, Services, Features, etc.)
- `src/components/common/` — Reusable components (Header, Footer, LeadForm, etc.)
- `src/data/` — Content data files (services, features, stats, locations)
- `src/context/` — React context providers (Modal, Theme)
- `src/utils/` — Utility functions (webhook submit, validators, formatters)
- `src/pages/` — Full pages (ThankYou)
- `public/` — Static assets, index.html, manifest

## Brand Color System (Defaults)

- Primary: #2D3561 (Deep Navy)
- Secondary/Accent: #2EC4B6 (Teal Green)
- Accent Warm: #FF6B35 (Orange — CTAs only)
- Light Teal: #E0F7F5 (Card backgrounds)
- White: #FFFFFF
- Text: #1B2A4A

To customize colors, update `src/theme/muiTheme.js` and the CSS variables in component `.module.css` files.

## Customization Guide

1. **Content**: Update data files in `src/data/` and hardcoded text in section components
2. **Branding**: Replace logo URL in `Header.jsx`, `Footer.jsx`, `MobileDrawer.jsx`, and `public/index.html`
3. **Contact Info**: Update `.env` file and `src/data/locationData.js`
4. **SEO**: Update meta tags, JSON-LD schemas, and sitemap in `public/`
5. **Forms**: Configure webhook URL in `src/utils/webhookSubmit.js`
6. **Analytics**: Update GTM ID in `public/index.html`

## DO NOT MODIFY

- Component structure, layout, animations, form logic, webhookSubmit.js, swalHelper.js, mobile navigation mechanics, drawer/modal behavior, video background system
