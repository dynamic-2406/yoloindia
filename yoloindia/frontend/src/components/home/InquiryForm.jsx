import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader } from 'lucide-react';
import { submitContactForm } from '../../services/api';

const Field = ({ name, label, type='text', placeholder, half, value, onChange, errors, ...inputProps }) => (
  <div className={half ? 'sm:col-span-1' : 'sm:col-span-2'}>
    <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...inputProps}
      className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all
        ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
    />
    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
  </div>
);

const countryPhoneRules = {
  India: { code: '91', lengths: [10] },
  Australia: { code: '61', lengths: [9] },
  Bangladesh: { code: '880', lengths: [10] },
  Bhutan: { code: '975', lengths: [8] },
  Brazil: { code: '55', lengths: [10, 11] },
  Canada: { code: '1', lengths: [10] },
  China: { code: '86', lengths: [11] },
  France: { code: '33', lengths: [9] },
  Germany: { code: '49', lengths: [10, 11] },
  Indonesia: { code: '62', lengths: [10, 11, 12] },
  Italy: { code: '39', lengths: [9, 10] },
  Japan: { code: '81', lengths: [10] },
  Malaysia: { code: '60', lengths: [9, 10] },
  Maldives: { code: '960', lengths: [7] },
  Nepal: { code: '977', lengths: [10] },
  'New Zealand': { code: '64', lengths: [8, 9, 10] },
  Singapore: { code: '65', lengths: [8] },
  'South Africa': { code: '27', lengths: [9] },
  'South Korea': { code: '82', lengths: [9, 10] },
  Spain: { code: '34', lengths: [9] },
  'Sri Lanka': { code: '94', lengths: [9] },
  Thailand: { code: '66', lengths: [9] },
  'United Arab Emirates': { code: '971', lengths: [9] },
  'United Kingdom': { code: '44', lengths: [10] },
  'United States': { code: '1', lengths: [10] }
};

const countryNames = Object.keys(countryPhoneRules);

const formatLengths = (lengths) => {
  if (lengths.length === 1) return lengths[0];
  if (lengths.length === 2) return lengths.join(' or ');
  return `${lengths.slice(0, -1).join(', ')}, or ${lengths.at(-1)}`;
};

const isValidPhoneForCountry = (phone, country) => {
  const rule = countryPhoneRules[country];
  const digits = phone.replace(/\D/g, '');
  if (!rule || !digits) return false;
  if (rule.lengths.includes(digits.length)) return true;

  const withoutCountryCode = digits.startsWith(rule.code)
    ? digits.slice(rule.code.length)
    : digits;

  return rule.lengths.includes(withoutCountryCode.length);
};

const getTodayDate = () => new Date().toISOString().split('T')[0];

const InquiryForm = ({ compact = false }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    country: '',
    startDate: '',
    duration: '',
    noOfPersons: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.destination.trim()) e.destination = 'Destination is required';
    if (form.country && !countryPhoneRules[form.country]) {
      e.country = 'Please select a valid country';
    }
    if (form.startDate && form.startDate < getTodayDate()) {
      e.startDate = 'Travel start date cannot be in the past';
    }
    if (form.noOfPersons && !/^[1-9]\d*$/.test(form.noOfPersons)) {
      e.noOfPersons = 'Enter at least 1 person';
    }
    if (!form.phone.trim()) {
      e.phone = 'Phone number is required';
    } else if (form.country && !isValidPhoneForCountry(form.phone, form.country)) {
      const { code, lengths } = countryPhoneRules[form.country];
      e.phone = `${form.country} phone number must be ${formatLengths(lengths)} digits. Country code +${code}`;
    } else if (!form.country && !/^[0-9+\-()\s]{7,18}$/.test(form.phone)) {
      e.phone = 'Enter a valid phone number';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setSubmitError('');
    try {
      await submitContactForm(form);
      setStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        destination: '',
        country: '',
        startDate: '',
        duration: '',
        noOfPersons: '',
        message: ''
      });
    } catch {
      setStatus('error');
      setSubmitError('Unable to send inquiry right now. Please try again.');
    }
  };

  if (status === 'success') return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      className="text-center py-10">
      <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={32} className="text-forest-600" />
      </div>
      <h3 className="font-display font-bold text-gray-900 text-xl mb-2">Inquiry Received!</h3>
      <p className="font-body text-gray-500 text-sm">Our travel expert will reach out within 24 hours.</p>
      <button onClick={() => setStatus('idle')} className="mt-5 text-saffron-500 font-body text-sm underline">Submit another</button>
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field name="name" label="Full Name" placeholder="Your full name" half value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} errors={errors} />
      <Field name="email" label="Email" type="email" placeholder="your@email.com" half value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} errors={errors} />
      <Field
        name="phone"
        label="Phone"
        type="tel"
        placeholder={form.country ? `Phone number, +${countryPhoneRules[form.country].code} optional` : 'Phone number'}
        half
        value={form.phone}
        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        errors={errors}
      />
      <div className="sm:col-span-1">
        <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Destination Interest</label>
        <select
          value={form.destination}
          onChange={e => setForm(f => ({...f, destination: e.target.value}))}
          className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300
            ${errors.destination ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
        >
          <option value="">Select destination</option>
          {['Rajasthan','Kerala','Ladakh','Goa','Himachal Pradesh','Uttarakhand','International'].map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
      </div>
      <div className="sm:col-span-1">
        <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Select Country (Optional)</label>
        <select
          value={form.country}
          onChange={e => setForm(f => ({...f, country: e.target.value}))}
          className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300
            ${errors.country ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
        >
          <option value="">Select country</option>
          {countryNames.map(c => (
            <option key={c} value={c}>{c} (+{countryPhoneRules[c].code})</option>
          ))}
        </select>
        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
      </div>
      <div className="sm:col-span-1">
        <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Travel Start Date (Optional)</label>
        <input
          type="date"
          value={form.startDate}
          onChange={e => setForm(f => ({...f, startDate: e.target.value}))}
          min={getTodayDate()}
          className={`w-full px-4 py-3 rounded-xl border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300 hover:border-gray-300 transition-all
            ${errors.startDate ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
        />
        {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
      </div>
      <Field name="duration" label="Duration of the Stay (Optional)" placeholder="e.g. 7 nights" half value={form.duration} onChange={e => setForm(f => ({...f, duration: e.target.value}))} errors={errors} />
      <Field name="noOfPersons" label="No of Person (Optional)" type="number" min="1" step="1" placeholder="Number of people" half value={form.noOfPersons} onChange={e => setForm(f => ({...f, noOfPersons: e.target.value}))} errors={errors} />
      {!compact && (
        <div className="sm:col-span-2">
          <label className="block font-body text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Message (Optional)</label>
          <textarea
            value={form.message}
            onChange={e => setForm(f => ({...f, message: e.target.value}))}
            placeholder="Tell us about your travel plans, group size, budget..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-saffron-300 resize-none"
          />
        </div>
      )}
      <div className="sm:col-span-2">
        {status === 'error' && submitError && (
          <p className="mb-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-100">
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-body font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {status === 'loading' ? <><Loader size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Inquiry</>}
        </button>
      </div>
    </form>
  );
};

export default InquiryForm;
