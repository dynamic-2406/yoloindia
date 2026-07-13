import { motion } from 'framer-motion';

const EmailButton = () => (
  <motion.a
    href="mailto:yoloindiatour@gmail.com?subject=Tour%20Inquiry%20from%20YoloIndia%20Tours"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 2, type: 'spring', stiffness: 300 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-20 right-6 z-40 w-14 h-14 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center"
    aria-label="Send us an email"
  >
    <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
    <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-30" />
  </motion.a>
);

export default EmailButton;
