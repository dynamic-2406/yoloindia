import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PageLoader from '../components/common/PageLoader';

const Home             = lazy(() => import('../pages/Home'));
const Packages         = lazy(() => import('../pages/Packages'));
const PackageDetails   = lazy(() => import('../pages/PackageDetails'));
const TourCategories   = lazy(() => import('../pages/TourCategories'));
const Destinations     = lazy(() => import('../pages/Destinations'));
const DestinationDetails = lazy(() => import('../pages/DestinationDetails'));
const Contact          = lazy(() => import('../pages/Contact'));
const Wishlist         = lazy(() => import('../pages/Wishlist'));
const Terms            = lazy(() => import('../pages/Terms'));
const AboutUs          = lazy(() => import('../pages/AboutUs'));

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream px-4">
    <div className="text-center max-w-md">
      <div className="font-display text-9xl font-bold text-saffron-100 mb-4 leading-none">404</div>
      <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
      <p className="font-body text-gray-500 mb-8 leading-relaxed">
        Looks like this page took a detour. Let's get you back on the right path.
      </p>
      <a href="/"
        className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-3.5 rounded-xl font-body font-semibold transition-colors shadow-lg shadow-saffron-200">
        Back to Home
      </a>
    </div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"                    element={<Home />} />
            <Route path="/packages"            element={<Packages />} />
            <Route path="/package/:id"         element={<PackageDetails />} />
             <Route path="/tour-categories"     element={<TourCategories />} />
            <Route path="/destinations"        element={<Destinations />} />
            <Route path="/destinations/:id"    element={<DestinationDetails />} />
            <Route path="/contact"             element={<Contact />} />
            <Route path="/wishlist"            element={<Wishlist />} />
            <Route path="/aboutus"            element={<AboutUs />} />
            <Route path="/terms"               element={<Terms />} />
            <Route path="*"                    element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  );
};

export default AppRoutes;
