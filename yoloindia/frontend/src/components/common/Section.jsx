import { motion } from 'framer-motion';

export const SectionHeader = ({ badge, title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    {badge && (
      <span className="inline-block bg-saffron-50 text-saffron-600 text-xs font-body font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-saffron-200 mb-4">
        {badge}
      </span>
    )}
    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="font-body text-gray-500 mt-4 text-base md:text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

export const FadeInSection = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Section = ({ children, className = '', id }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {children}
    </div>
  </section>
);

export default Section;
