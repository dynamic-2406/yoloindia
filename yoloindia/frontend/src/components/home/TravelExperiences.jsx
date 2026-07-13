import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const experiences = [
  { icon: '🏕️', label: 'Adventure', count: '45 tours', color: 'from-blue-500 to-blue-600', link: '/packages?category=Adventure' },
  { icon: '🦁', label: 'Safari', count: '18 tours', color: 'from-amber-500 to-orange-500', link: '/packages?category=Wildlife' },
  { icon: '🌊', label: 'Beaches', count: '32 tours', color: 'from-cyan-400 to-ocean-500', link: '/packages' },
  { icon: '🏔️', label: 'Mountains', count: '29 tours', color: 'from-slate-500 to-slate-700', link: '/packages' },
  { icon: '💑', label: 'Honeymoon', count: '24 tours', color: 'from-pink-400 to-rose-500', link: '/packages?category=Honeymoon' },
  { icon: '🛕', label: 'Pilgrimage', count: '21 tours', color: 'from-orange-400 to-saffron-600', link: '/packages?category=Pilgrimage' },
  { icon: '🏰', label: 'Heritage', count: '38 tours', color: 'from-purple-500 to-violet-600', link: '/packages?category=Heritage' },
  { icon: '🌿', label: 'Eco Tours', count: '15 tours', color: 'from-forest-500 to-forest-700', link: '/packages' },
];

const TravelExperiences = () => (
  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
    {experiences.map((exp, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.05 }}
        whileHover={{ y: -4 }}
      >
        <Link to={exp.link} className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-all duration-300 text-center">
          <div className={`w-14 h-14 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
            {exp.icon}
          </div>
          <div>
            <p className="font-body font-semibold text-gray-900 text-sm">{exp.label}</p>
            <p className="font-body text-gray-400 text-xs mt-0.5">{exp.count}</p>
          </div>
        </Link>
      </motion.div>
    ))}
  </div>
);

export default TravelExperiences;
