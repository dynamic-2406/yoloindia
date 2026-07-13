# yoloindia 🏞️

A modern, fully-responsive travel and tour booking website built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, and **Swiper.js**.

---

## 🚀 Quick Start

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # Production build
npm run preview   # Preview production build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         Navbar, Footer, Layout
│   ├── home/           HeroSection, TrendingSlider, PackagesByInterest,
│   │                   WeekendGetaways, TravelExperiences, WhyChooseUs,
│   │                   TestimonialsSection, FAQSection, InquiryForm
│   ├── packages/       PackageCard
│   ├── destinations/   DestinationCard
│   ├── common/         Section, ScrollToTop, WhatsAppButton, PageLoader
│   └── ui/             Button, StarRating, Skeleton, Modal, Toast
├── pages/
│   ├── Home.jsx
│   ├── Packages.jsx        (filters, sorting, categories)
│   ├── PackageDetails.jsx  (gallery, itinerary, inclusions)
│   ├── Destinations.jsx
│   ├── DestinationDetails.jsx
│   ├── Contact.jsx
│   └── Wishlist.jsx
├── routes/             AppRoutes.jsx (centralized routing)
├── services/           api.js (Axios-simulated with local JSON)
├── hooks/              useFetch.js
├── context/            WishlistContext.jsx
├── utils/              helpers.js
└── data/               packages.json, destinations.json, testimonials.json
```

---

## ✨ Features

| Feature | Details |
|---|---|
| **Navigation** | Sticky navbar, mega menu, mobile hamburger |
| **Hero** | Full-screen with search (destination / duration / budget) |
| **Packages** | Grid, sidebar filters (price, duration, category), sorting |
| **Package Detail** | Gallery slider, day-wise itinerary, inclusions/exclusions |
| **Destinations** | India & International filter, cards with best-time info |
| **Wishlist** | Heart icon on every card, persists in React context |
| **Inquiry Form** | Reusable, validated, success/loading states |
| **Testimonials** | Auto-playing Swiper slider |
| **FAQ** | Framer Motion accordion |
| **Animations** | Page transitions, scroll fade-ins, hover effects |
| **WhatsApp CTA** | Floating button with pulse animation |
| **Scroll to Top** | Auto-shows after 400px scroll |
| **Toast System** | Reusable toast notifications |
| **Responsive** | Mobile-first, works on all screen sizes |
| **SEO** | Proper H1/H2 hierarchy, meta tags, clean URLs |
| **Performance** | Lazy loading, code splitting, image lazy load |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | Saffron `#ff7a10` |
| Background | Cream `#fdf8f0` |
| Dark | `#1a1209` |
| Display font | Playfair Display |
| Body font | DM Sans |
| Accent font | Cormorant Garamond |

---

## 📦 Tech Stack

- **React 19** + **Vite 6**
- **Tailwind CSS 3**
- **Framer Motion** — page transitions, scroll reveals, hover
- **Swiper.js** — hero slider, testimonials, package gallery
- **React Router DOM v7** — SPA routing with lazy loading
- **Axios** — API service layer (simulated with local JSON)
- **Lucide React** — icon library

---

## 🔌 Extending with a Real API

Replace calls in `src/services/api.js` with real Axios requests:

```js
// Before (mock)
export const fetchPackages = async () => {
  await delay();
  return packagesData;
};

// After (real API)
export const fetchPackages = async (filters) => {
  const { data } = await axios.get('/api/packages', { params: filters });
  return data;
};
```

---

Made with ❤️ for India's travel community.
