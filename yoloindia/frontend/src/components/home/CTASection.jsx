import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import Section, { FadeInSection } from '../common/Section';
import { submitContactForm } from '../../services/api';

const CTASection = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = 'Valid email required';
    if (!form.phone.match(/^\d{10}$/)) e.phone = '10-digit phone required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setSubmitError('');
    try {
      await submitContactForm(form);
      setSuccess(true);
    } catch (error) {
      setSubmitError(error?.message || 'Unable to send inquiry right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="bg-gradient-to-br from-saffron-500 to-saffron-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
        {/* Left */}
        <FadeInSection>
          <span className="inline-block bg-white/20 text-white text-xs font-body font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Start Planning Today
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Your Dream Trip is Just One Call Away
          </h2>
          <p className="font-body text-white/80 text-lg mb-8 leading-relaxed">
            Share your travel wishlist and our expert travel designers will craft a personalized itinerary 
            — completely free of charge, with no obligation to book.
          </p>
          <div className="grid grid-cols-2 gap-5">
            {[
              { val: '100%', label: 'Customizable Trips' },
              { val: '24/7', label: 'Support Available' },
              { val: '0', label: 'Planning Fees' },
              { val: '15+', label: 'Years Experience' },
            ].map((s, i) => (
              <div key={i} className="bg-white/15 backdrop-blur rounded-xl p-4">
                <p className="font-display font-bold text-white text-2xl">{s.val}</p>
                <p className="font-body text-white/70 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Form */}
        <FadeInSection delay={0.2}>
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle size={64} className="text-forest-500 mx-auto mb-4" />
                <h3 className="font-display font-bold text-gray-900 text-2xl mb-2">Inquiry Sent!</h3>
                <p className="font-body text-gray-600">Our travel expert will call you within 24 hours to discuss your perfect trip.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="font-display font-bold text-gray-900 text-2xl mb-6">Get a Free Quote</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: 'name', label: 'Full Name', placeholder: 'Rahul Sharma', type: 'text' },
                    { name: 'email', label: 'Email Address', placeholder: 'rahul@email.com', type: 'email' },
                    { name: 'phone', label: 'Phone Number', placeholder: '9876543210', type: 'tel' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-sm font-body font-medium text-gray-700 mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.name]}
                        onChange={e => { setForm(p => ({ ...p, [field.name]: e.target.value })); setErrors(p => ({ ...p, [field.name]: '' })); }}
                        className={`w-full px-4 py-3 rounded-xl border ${errors[field.name] ? 'border-red-400 bg-red-50' : 'border-gray-200'} font-body text-sm focus:outline-none focus:border-saffron-400 focus:ring-2 focus:ring-saffron-100 transition-all`}
                      />
                      {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-body font-medium text-gray-700 mb-1.5">Destination Interest</label>
                    <select
                      value={form.destination}
                      onChange={e => setForm(p => ({ ...p, destination: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:border-saffron-400 focus:ring-2 focus:ring-saffron-100 transition-all bg-white"
                    >
                      <option value="">Select Destination</option>
                      {['Rajasthan', 'Kerala', 'Ladakh', 'Goa', 'Himachal Pradesh', 'Uttarakhand', 'International'].map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 text-white py-4 rounded-xl font-body font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-saffron-200 mt-2"
                  >
                    {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={18} />Send My Inquiry</>}
                  </button>
                  {submitError && (
                    <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {submitError}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </FadeInSection>
      </div>
    </Section>
  );
};

export default CTASection;
