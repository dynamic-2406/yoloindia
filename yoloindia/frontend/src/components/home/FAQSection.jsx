import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How do I book a tour package?', a: 'Simply browse our packages, click "View Details", and fill out the inquiry form. Our travel experts will contact you within 24 hours to confirm your booking and process payment.' },
  { q: 'What is your cancellation policy?', a: 'We offer free cancellation up to 30 days before departure. 15–30 days: 25% charge. 7–15 days: 50% charge. Less than 7 days: non-refundable. We recommend travel insurance for peace of mind.' },
  { q: 'What are the extra charges I’ll have to pay during the tour?', a: 'Some of the extra charges which you’ll have to pay during the tour are as follows: - Monument Entrance & Camera Fees. - Charges for Lunch & Dinner. Daily breakfast will be included in your package. - For any extra services not specifically mentioned in the inclusions.' },
  { q: 'Can I customize a tour package?', a: 'Absolutely! Every package can be customized — add destinations, change hotels, extend duration, or add activities. Contact our team and we\'ll design the perfect itinerary just for you.' },
  { q: 'Is travel insurance included?', a: 'Travel insurance is not included by default but is strongly recommended. We partner with leading insurers to offer competitive travel insurance plans. Ask our team for details during booking.' },
  { q: 'Is it possible to upgrade the accommodation?', a: 'Yes, you can upgrade your accommodation to 4 or 5 star after booking the tour as well. Please note that supplement charges will apply.' },
  { q: 'I am a solo Traveller, is there a surcharge?', a: 'Please note that a single supplement will be charged for solo travelers.' },
  { q: 'I am a solo Traveller, is there a surcharge?', a: 'Please note that a single supplement will be charged for solo travelers.' },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-50">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <span className="font-body font-semibold text-gray-900 pr-4 text-sm md:text-base">{faq.q}</span>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={20} className={`flex-shrink-0 ${open === i ? 'text-saffron-500' : 'text-gray-400'}`} />
            </motion.div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5">
                  <div className="h-px bg-gray-100 mb-4" />
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
