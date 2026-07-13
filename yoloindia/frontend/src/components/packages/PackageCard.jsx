import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, Heart, Star, ArrowRight, Tag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice, getDiscount } from '../../utils/helpers';

const categoryColors = {
  Heritage: 'bg-amber-50 text-amber-700 border-amber-200',
  Honeymoon: 'bg-pink-50 text-pink-700 border-pink-200',
  Wildlife: 'bg-forest-50 text-forest-700 border-forest-100',
  Adventure: 'bg-blue-50 text-blue-700 border-blue-200',
  Pilgrimage: 'bg-orange-50 text-orange-700 border-orange-200',
};

const PackageCard = ({ pkg, featured = false }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(pkg.id);
  const discount = getDiscount(pkg.originalPrice, pkg.price);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={pkg.image}
          alt={pkg.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-body font-semibold px-3 py-1 rounded-full border backdrop-blur-sm bg-white/90 ${categoryColors[pkg.category] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
            {pkg.category}
          </span>
        </div>

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-12">
            <span className="text-xs font-body font-bold px-2 py-1 rounded-full bg-red-500 text-white">
              -{discount}%
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(pkg); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>

        {/* Rating on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-white text-xs font-bold">{pkg.rating}</span>
          <span className="text-white/70 text-xs">({pkg.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Destination */}
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={13} className="text-saffron-500 flex-shrink-0" />
          <span className="text-xs font-body text-gray-500">{pkg.destination}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-gray-900 text-lg leading-tight mb-3 group-hover:text-saffron-600 transition-colors duration-200">
          {pkg.title}
        </h3>

        {/* Duration */}
        <div className="flex items-center gap-1.5 mb-4">
          <Clock size={13} className="text-gray-400" />
          <span className="text-xs font-body text-gray-500">{pkg.duration}</span>
        </div>

        {/* Highlights */}
        {/* <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
          {pkg.highlights?.slice(0, 3).map((h, i) => (
            <span key={i} className="text-xs font-body text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
              {h}
            </span>
          ))}
        </div> */}

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl text-saffron-600">
                {formatPrice(pkg.price)}
              </span>
              {pkg.originalPrice > pkg.price && (
                <span className="text-sm text-gray-400 line-through font-body">
                  {formatPrice(pkg.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 font-body">per person</p>
          </div>
          <Link
            to={`/package/${pkg.slug}`}
            className="flex items-center gap-1.5 bg-saffron-500 hover:bg-saffron-600 text-white px-4 py-2.5 rounded-xl text-xs font-body font-semibold transition-colors duration-200 group/btn"
          >
            View Details
            <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;
