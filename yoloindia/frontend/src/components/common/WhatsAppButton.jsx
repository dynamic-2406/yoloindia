import { motion } from 'framer-motion';

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/9560235517?text=Hi! I'd like to enquire about a tour package."
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 2, type: 'spring', stiffness: 300 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center"
    aria-label="Chat on WhatsApp"
  >
    {/* WhatsApp SVG icon */}
    <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12.004 2C6.477 2 2.004 6.473 2.004 12c0 1.99.583 3.85 1.59 5.412L2 22l4.715-1.557A9.952 9.952 0 0012.004 22C17.531 22 22 17.527 22 12S17.531 2 12.004 2zm0 18.12a8.12 8.12 0 01-4.153-1.14l-.298-.177-3.087 1.02.985-3.059-.194-.31A8.12 8.12 0 013.884 12c0-4.49 3.635-8.12 8.12-8.12 4.487 0 8.12 3.63 8.12 8.12 0 4.488-3.633 8.12-8.12 8.12z"/>
    </svg>

    {/* Pulse ring */}
    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
  </motion.a>
);

export default WhatsAppButton;
