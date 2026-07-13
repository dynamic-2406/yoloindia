import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { fetchPackages } from '../../services/api';
import PackageCard from '../packages/PackageCard';

const TABS = ['All','Heritage','Honeymoon','Wildlife','Adventure','Pilgrimage'];

const PackagesByInterest = () => {
  const [active, setActive] = useState('All');
  const { data: packages, loading } = useFetch(fetchPackages);

  const filtered = packages
    ? (active === 'All' ? packages : packages.filter(p => p.category === active)).slice(0, 6)
    : [];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative px-5 py-2.5 rounded-full font-body font-medium text-sm transition-all duration-200 ${
              active === tab
                ? 'bg-saffron-500 text-white shadow-lg shadow-saffron-200'
                : 'bg-white text-gray-600 hover:bg-saffron-50 hover:text-saffron-600 border border-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
              <div className="h-52 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="flex justify-between pt-2">
                  <div className="h-6 bg-gray-200 rounded w-1/4" />
                  <div className="h-9 bg-gray-200 rounded-xl w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default PackagesByInterest;
