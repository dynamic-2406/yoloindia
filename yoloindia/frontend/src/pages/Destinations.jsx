import { useState } from 'react';
import { motion } from 'framer-motion';
import Section, { SectionHeader, FadeInSection } from '../components/common/Section';
import DestinationCard from '../components/destinations/DestinationCard';
import { useFetch } from '../hooks/useFetch';
import { fetchDestinations } from '../services/api';

const FILTERS = ['All','India','International'];

const DestinationsPage = () => {
  const [filter, setFilter] = useState('All');
  const { data: destinations, loading } = useFetch(fetchDestinations);

  const filtered = destinations
    ? (filter === 'All' ? destinations : destinations.filter(d => d.type === filter))
    : [];

  return (
    <div className="bg-cream min-h-screen">
      <div className="relative h-56 md:h-72 bg-gradient-to-r from-forest-900 to-dark flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-16">
          <p className="font-body text-saffron-400 text-sm mb-2 uppercase tracking-widest">Discover</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">All Destinations</h1>
          <p className="font-body text-white/70 mt-2">India & International — find your perfect escape</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-3 mb-10 justify-center">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full font-body font-semibold text-sm transition-all duration-200
                ${filter === f ? 'bg-saffron-500 text-white shadow-lg shadow-saffron-200' : 'bg-white text-gray-600 border border-gray-200 hover:border-saffron-300'}`}>
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_,i) => <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(dest => (
              <motion.div key={dest.id} layout initial={{ opacity:0 }} animate={{ opacity:1 }}>
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;
