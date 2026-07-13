import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { submitContactForm } from '../../services/api';
import Button from '../ui/Button';

const InquiryForm = ({ defaultDestination = '', onSuccess }) => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    destination: defaultDestination, message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit Indian mobile required';
    if (!form.destination.trim()) e.destination = 'Please mention a destination';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  const errs = validate();

  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setLoading(true);

  try {
    await submitContactForm({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      destination: form.destination.trim(),
      message: form.message.trim()
    });

    setSubmitted(true);

    setForm({
      name: '',
      email: '',
      phone: '',
      destination: '',
      message: ''
    });

    onSuccess?.();

  } catch (err) {
    console.error(err);

    setErrors({
      submit:
        err?.message ||
        err?.response?.data?.message ||
        'Unable to send inquiry.'
    });

  } finally {
    setLoading(false);
  }
};

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="w-16 h-16 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-forest-600" />
        </div>
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="font-body text-gray-500">
          Your inquiry has been received. Our travel expert will contact you within 24 hours.
        </p>
      </motion.div>
    );
  }

  const fields = [
    { name: 'name', label: 'Full Name', placeholder: 'Your full name', icon: User, type: 'text' },
    { name: 'email', label: 'Email Address', placeholder: 'email@example.com', icon: Mail, type: 'email' },
    { name: 'phone', label: 'Phone Number', placeholder: '10-digit mobile number', icon: Phone, type: 'tel' },
    { name: 'destination', label: 'Destination Interest', placeholder: 'e.g. Kerala, Rajasthan, Bali...', icon: MapPin, type: 'text' },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(field => {
          const Icon = field.icon;
          return (
            <div key={field.name}>
              <label className="block text-sm font-body font-medium text-gray-700 mb-1.5">{field.label}</label>
              <div className="relative">
                <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`w-full pl-9 pr-4 py-3 rounded-xl border font-body text-sm text-gray-900 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all
                    ${errors[field.name] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                />
              </div>
              {errors[field.name] && (
                <p className="text-xs text-red-500 mt-1 font-body">{errors[field.name]}</p>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <label className="block text-sm font-body font-medium text-gray-700 mb-1.5">Message (Optional)</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your travel plans, number of travelers, special requirements..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white font-body text-sm text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all resize-none hover:border-gray-300"
        />
      </div>

      {errors.submit && (
        <p className="text-sm text-red-500 font-body bg-red-50 px-4 py-3 rounded-xl">{errors.submit}</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        icon={<Send size={18} />}
        iconPosition="right"
        className="w-full"
      >
        {loading ? 'Sending...' : 'Send Inquiry'}
      </Button>

      <p className="text-xs text-gray-400 text-center font-body">
        🔒 Your information is safe with us. No spam, ever.
      </p>
    </form>
  );
};

export default InquiryForm;
