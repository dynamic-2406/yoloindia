import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, Star } from 'lucide-react';
import Section, { SectionHeader, FadeInSection } from '../common/Section';
import { convertInrToUsd, formatPrice } from '../../utils/helpers';
import { useUsdRate } from '../../hooks/useUsdRate';

const intlPackages = [
  { id: 1, name: 'Bali Honeymoon', country: 'Indonesia', duration: '6D/5N', priceInr: 45999, rating: 4.8, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', badge: 'Best Seller' },
  { id: 2, name: 'Thailand Discovery', country: 'Thailand', duration: '7D/6N', priceInr: 38999, rating: 4.7, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80', badge: 'Popular' },
  { id: 3, name: 'Dubai Glam', country: 'UAE', duration: '5D/4N', priceInr: 55000, rating: 4.9, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', badge: 'Luxury' },
  { id: 4, name: 'Singapore & Malaysia', country: 'Singapore', duration: '8D/7N', priceInr: 62000, rating: 4.8, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80', badge: 'Family' },
];

const InternationalPackages = () => {
  const { rate } = useUsdRate();

  return (
    <Section className="bg-dark text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-saffron-900/30 via-transparent to-transparent pointer-events-none" />
      <FadeInSection>
        <SectionHeader
          badge="Go Global"
          title={<>International <span className="text-saffron-400">Packages</span></>}
          subtitle="Explore the world with expertly crafted international tours - seamless visa support included"
        />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {intlPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-saffron-500/40 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {pkg.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-saffron-500 text-white">
                      {pkg.badge}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span className="text-white text-xs font-bold">{pkg.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Globe size={13} className="text-saffron-400" />
                  <span className="text-xs text-gray-400 font-body">{pkg.country}</span>
                </div>
                <h4 className="font-display font-bold text-white text-base mb-1 group-hover:text-saffron-300 transition-colors">
                  {pkg.name}
                </h4>
                <p className="text-xs text-gray-500 font-body mb-4">{pkg.duration}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 font-body block">Starting</span>
                    <span className="font-display font-bold text-saffron-400 text-lg">
                      {formatPrice(convertInrToUsd(pkg.priceInr, rate))}
                    </span>
                  </div>
                  <Link
                    to="/packages"
                    className="flex items-center gap-1 bg-saffron-500 hover:bg-saffron-400 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    View <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeInSection>
      <FadeInSection className="text-center mt-10">
        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-body font-semibold transition-all duration-200"
        >
          Explore International Tours <ArrowRight size={18} />
        </Link>
      </FadeInSection>
    </Section>
  );
};

export default InternationalPackages;
