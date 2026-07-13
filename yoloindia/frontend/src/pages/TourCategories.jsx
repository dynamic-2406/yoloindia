import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PackageCard from '../components/packages/PackageCard';
import { fetchPackagesByTourType } from '../services/api';

const TourCategories = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define tour categories with images and descriptions
  const tourCategories = [
    {
      id: 'north',
      name: 'North Indian Tours',
      description: 'Explore the golden heritage of India',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'south',
      name: 'South Indian Tours',
      description: 'Discover tropical beauty and backwaters',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'himalayan',
      name: 'Himalayan Tours',
      description: 'Adventure in the mighty mountains',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'spiritual',
      name: 'Spiritual Tours',
      description: 'Find peace and spiritual enlightenment',
      image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'adventure',
      name: 'Adventure Tours',
      description: 'Thrill-seeking experiences await',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
      color: 'from-red-500 to-orange-500'
    }
  ];

  // Handle category selection - fetch packages by tour type
  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    setLoading(true);
    setError(null);

    try {
      const packages = await fetchPackagesByTourType(categoryName);
      setFilteredPackages(packages);
    } catch (err) {
      console.error(`Error fetching packages for ${categoryName}:`, err);
      setError(`Failed to load packages for ${categoryName}`);
      setFilteredPackages([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle back to categories
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setFilteredPackages([]);
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-cream py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Tour Categories
          </h1>
          <p className="font-body text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated tour packages across five unique categories. Click on any category to see our exclusive tour packages.
          </p>
        </motion.div>

        {/* Home Button (always visible) - placed above the Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-2.5 rounded-lg font-body font-semibold transition-colors shadow-sm border border-gray-200"
          >
            Home
          </button>
        </div>

        {/* Back Button - Show when category is selected */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <button
                onClick={handleBackToCategories}
                className="flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-3 rounded-lg font-body font-semibold transition-colors shadow-lg shadow-saffron-200"
              >
                <span>← Back to Categories</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tour Categories Grid - Show when no category is selected */}
        <AnimatePresence>
          {!selectedCategory && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16"
            >
              {tourCategories.map((category) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="cursor-pointer"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <motion.div
                    variants={cardHoverVariants}
                    className="relative h-72 rounded-2xl overflow-hidden shadow-xl bg-white group"
                  >
                    {/* Background Image */}
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="font-display text-2xl font-bold mb-2 group-hover:translate-y-0 transform transition-transform">
                        {category.name}
                      </h3>
                      <p className="font-body text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                        {category.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                        <span className="text-sm font-semibold">Explore</span>
                        <span>→</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Category Title and Packages */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category Title */}
              <div className="mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  {selectedCategory}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-saffron-500 to-orange-500 rounded-full" />
                <p className="text-gray-600 mt-3 font-body">
                  {!loading && filteredPackages.length > 0 ? (
                    <>
                      {filteredPackages.length} amazing tour{' '}
                      {filteredPackages.length === 1 ? 'package' : 'packages'} available
                    </>
                  ) : loading ? (
                    'Loading packages...'
                  ) : (
                    'No packages found'
                  )}
                </p>
              </div>

              {/* Loading State */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center items-center py-20"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-saffron-200 border-t-saffron-500 animate-spin" />
                    <p className="text-gray-600 font-body">Loading tour packages...</p>
                  </div>
                </motion.div>
              )}

              {/* Error State */}
              {error && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
                >
                  <p className="text-red-700 font-body">
                    {error}
                  </p>
                </motion.div>
              )}

              {/* Packages Grid */}
              {!loading && filteredPackages.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredPackages.map((pkg, index) => (
                    <motion.div
                      key={pkg.id}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PackageCard pkg={pkg} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : !loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-gray-500 font-body text-lg">
                    No packages available for this category yet. Please check back soon!
                  </p>
                </motion.div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TourCategories;
