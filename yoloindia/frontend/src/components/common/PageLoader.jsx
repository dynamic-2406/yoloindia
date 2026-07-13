import { motion } from 'framer-motion';

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative">
        <div className="w-14 h-14 border-4 border-saffron-100 rounded-full" />
        <div className="w-14 h-14 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin absolute inset-0" />
      </div>
      <p className="font-body text-sm text-gray-400 animate-pulse">Loading............</p>
    </motion.div>
  </div>
);

export default PageLoader;
