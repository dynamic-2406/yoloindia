import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const Home = lazy(() => import('../pages/Home'));
const Packages = lazy(() => import('../pages/Packages'));
const PackageDetails = lazy(() => import('../pages/PackageDetails'));
const Destinations = lazy(() => import('../pages/Destinations'));
const DestinationDetails = lazy(() => import('../pages/DestinationDetails'));
const Contact = lazy(() => import('../pages/Contact'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const AboutUs = lazy(() => import('../pages/AboutUs'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-saffron-200 border-t-saffron-500 rounded-full animate-spin" />
      <p className="font-body text-gray-400 text-sm">Loading...</p>
    </div>
  </div>
);

const AppRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/package/:id" element={<PackageDetails />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/destinations/:id" element={<DestinationDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/aboutus" element={<AboutUs />} />
    </Routes>
  </Suspense>
);

export default AppRouter;
