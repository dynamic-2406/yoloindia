import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import PackageCard from '../components/packages/PackageCard';

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="bg-cream min-h-screen">
      <div className="relative h-56 bg-gradient-to-r from-rose-900 to-dark flex items-center">
        <div className="relative max-w-7xl mx-auto px-6 pt-16">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={20} className="text-rose-400 fill-rose-400" />
            <p className="font-body text-rose-400 text-sm uppercase tracking-widest">Saved</p>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">My Wishlist</h1>
          <p className="font-body text-white/60 mt-1">{wishlist.length} package{wishlist.length !== 1 ? 's' : ''} saved</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <AnimatePresence>
          {wishlist.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-24">
              <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={40} className="text-rose-300" />
              </div>
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-3">Your wishlist is empty</h2>
              <p className="font-body text-gray-500 mb-8">Start exploring and save your favourite tour packages here.</p>
              <Link to="/packages"
                className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-3.5 rounded-xl font-body font-semibold transition-colors">
                <ShoppingBag size={18} /> Browse Packages
              </Link>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((pkg) => (
                <motion.div key={pkg.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <PackageCard pkg={pkg} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistPage;
