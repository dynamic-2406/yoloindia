import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

// const HERO_BG = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=90';
const HERO_BG = 'https://ik.imagekit.io/kpm3y5moe/WhatsApp%20Image%202026-06-22%20at%2010.38.39%20AM_WGsrQxBUX.jpeg?updatedAt=1782112688386';

const SEARCH_STATS = [
  { label: 'Happy Travelers', value: '50,000+' },
  { label: 'Destinations', value: '200+' },
  { label: 'Tour Packages', value: '500+' },
  { label: 'Years Experience', value: '15+' },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Incredible India"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Floating decorative orbs */}
      <div className="absolute top-32 right-20 w-72 h-72 bg-saffron-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-orange-400/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-saffron-500/20 backdrop-blur-sm border border-saffron-400/40 text-saffron-300 px-4 py-2 rounded-full text-sm font-body mb-6"
          >
            <span className="w-2 h-2 bg-saffron-400 rounded-full animate-pulse" />
            India's Most Trusted Travel Company
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
          >
            Discover the
            <span className="block text-saffron-400">Soul of India</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-body text-lg text-white/80 mb-10 max-w-xl leading-relaxed"
          >
            Handcrafted journeys through ancient temples, golden deserts, tropical backwaters, 
            and Himalayan peaks. Your perfect India trip starts here.
          </motion.p>

        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SEARCH_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-2xl font-bold text-saffron-400">{stat.value}</p>
                <p className="font-body text-xs text-white/60 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white/50 hidden md:block"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

export default HeroSection;