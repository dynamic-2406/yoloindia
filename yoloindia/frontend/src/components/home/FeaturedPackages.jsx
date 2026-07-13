import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section, { SectionHeader, FadeInSection } from '../common/Section';
import PackageCard from '../packages/PackageCard';
import { SkeletonGrid } from '../ui/Skeleton';
import { useFetch } from '../../hooks/useFetch';
import { fetchPackages } from '../../services/api';

const CATEGORIES = ['All', 'Heritage', 'Honeymoon', 'Wildlife', 'Adventure', 'Pilgrimage'];

const FeaturedPackages = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: allPackages, loading } = useFetch(fetchPackages);

  const filtered = activeCategory === 'All'
    ? allPackages?.slice(0, 6)
    : allPackages?.filter(p => p.category === activeCategory).slice(0, 6);

  return (
    <Section className="bg-cream">
      <FadeInSection>
        <SectionHeader
          badge="Tour Packages"
          title="Journeys Crafted for Every Soul"
          subtitle="Curated packages for every kind of traveller — from adrenaline seekers to spiritual explorers"
        />
      </FadeInSection>

      {/* Category Tabs */}
      <FadeInSection delay={0.15}>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 rounded-full font-body font-medium text-sm transition-all duration-200
                ${activeCategory === cat
                  ? 'bg-saffron-500 text-white shadow-lg shadow-saffron-300/40'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-saffron-500 rounded-full -z-10"
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </FadeInSection>

      {/* Package Grid */}
      {loading ? (
        <SkeletonGrid count={6} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered?.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <PackageCard pkg={pkg} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <div className="text-center mt-12">
        <Link
          to="/packages"
          className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-4 rounded-xl font-body font-semibold transition-colors duration-200 shadow-lg shadow-saffron-200"
        >
          Browse All Packages <ArrowRight size={18} />
        </Link>
      </div>
    </Section>
  );
};

export default FeaturedPackages;
