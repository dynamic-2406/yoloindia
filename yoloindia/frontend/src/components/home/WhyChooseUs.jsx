import { motion } from 'framer-motion';
import { Shield, Headphones, Star, Users, CreditCard, Map } from 'lucide-react';

const features = [
  { icon: <Shield size={28} />, title: 'Safe & Secure', desc: 'Verified hotels, licensed vehicles, and 24/7 emergency support across all trips.' },
  { icon: <Headphones size={28} />, title: '24/7 Support', desc: 'Round-the-clock assistance so you\'re never alone, wherever you travel.' },
  { icon: <Star size={28} />, title: 'Best Price Guarantee', desc: 'Find a lower price? We\'ll match it. Guaranteed best deals every time.' },
  { icon: <Users size={28} />, title: 'Expert Guides', desc: 'Local guides with deep knowledge, certified by the Ministry of Tourism.' },
  { icon: <CreditCard size={28} />, title: 'Flexible Payment', desc: 'Pay in easy EMIs with zero-cost options. Book now, pay later available.' },
  { icon: <Map size={28} />, title: 'Custom Itineraries', desc: 'Tailor-made trips designed around your schedule, group size, and interests.' },
];

const WhyChooseUs = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {features.map((f, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="group p-6 bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-gray-50"
      >
        <div className="w-14 h-14 bg-saffron-50 rounded-2xl flex items-center justify-center text-saffron-500 mb-5 group-hover:bg-saffron-500 group-hover:text-white transition-colors duration-300">
          {f.icon}
        </div>
        <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
        <p className="font-body text-gray-500 text-sm leading-relaxed">{f.desc}</p>
      </motion.div>
    ))}
  </div>
);

export default WhyChooseUs;
