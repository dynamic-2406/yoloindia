import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const TourCategoriesHome = () => {
  const tourCategories = [
    {
      id: 'north',
      name: 'North Indian Tours',
      description: 'Explore the golden heritage of India',
      image: 'https://ik.imagekit.io/kpm3y5moe/8fc6cfdc-1eb5-4c5b-8964-ec677948d4b4.png?updatedAt=1782106316402',
    },
    {
      id: 'south',
      name: 'South Indian Tours',
      description: 'Discover tropical beauty and backwaters',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
    },
    {
      id: 'himalayan',
      name: 'Himalayan Tours',
      description: 'Adventure in the mighty mountains',
      image: 'https://ik.imagekit.io/kpm3y5moe/shimla.jpeg?updatedAt=1782202843727',
    },
    {
      id: 'spiritual',
      name: 'Spiritual Tours',
      description: 'Find peace and spiritual enlightenment',
      image: 'https://ik.imagekit.io/kpm3y5moe/varansi%20ghat.jpg?updatedAt=1782201467744',
    },
    {
      id: 'adventure',
      name: 'Adventure Tours',
      description: 'Thrill-seeking experiences await',
      image: 'https://ik.imagekit.io/kpm3y5moe/shimla.jpeg?updatedAt=1782202843727',
    },
  ];

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
      y: -8,
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    },
  };

  return (
    <div className="space-y-8">
      {/* Grid of category cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
      >
        {tourCategories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover="hover"
          >
            <Link to="/tour-categories">
              <motion.div
                variants={cardHoverVariants}
                className="relative h-64 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 group cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                  <h3 className="font-display text-lg md:text-xl font-bold mb-1 group-hover:translate-y-0 transform transition-transform">
                    {category.name}
                  </h3>
                  <p className="font-body text-xs md:text-sm opacity-90 group-hover:opacity-100 transition-opacity line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                    <span className="text-xs font-semibold">Explore</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <Link to="/tour-categories" className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-3.5 rounded-xl font-body font-semibold text-sm transition-colors duration-200 shadow-lg shadow-saffron-200">
          Explore All Categories <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
};

export default TourCategoriesHome;
