import { FadeInSection } from '../components/common/Section';
import InquiryForm from '../components/home/InquiryForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => (
  <div className="bg-cream min-h-screen">
    <div className="relative h-56 md:h-64 bg-gradient-to-r from-dark to-saffron-900 flex items-center">
      <div className="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&q=80" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 pt-16">
        <p className="font-body text-saffron-400 text-sm mb-2 uppercase tracking-widest">Get In Touch</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info */}
        <div className="space-y-5">
          <FadeInSection>
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">Let's Plan Your Journey</h2>
          </FadeInSection>
          {[
            { icon: <Phone size={22} />, title:'Call Us', lines:['+91 9560235517',  '+91-9971 69 9663 (Toll Free)','Mon-Sat: 9AM–8PM, Sun: 10AM–6PM'] },
            { icon: <Mail size={22} />, title:'Email Us', lines:['yoloindiatour@gmail.com',' info@yoloindiatours.com'] },
            { icon: <MapPin size={22} />, title:'Visit Us', lines:['Office Address: 34, Millennium Business Center, Corner Market, Malviya Nagar, South Delhi','New Delhi – 110001, India, Asia'] },
            { icon: <Clock size={22} />, title:'Office Hours', lines:['Monday–Saturday: 9:00 AM – 8:00 PM','Sunday: 10:00 AM – 6:00 PM'] },
          ].map((item, i) => (
            <FadeInSection key={i} delay={i*0.1}>
              <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-card">
                <div className="w-12 h-12 bg-saffron-50 rounded-xl flex items-center justify-center text-saffron-500 flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="font-display font-bold text-gray-900 mb-1">{item.title}</p>
                  {item.lines.map((line, j) => <p key={j} className="font-body text-sm text-gray-500">{line}</p>)}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <FadeInSection delay={0.2}>
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">Send Us an Inquiry</h3>
              <p className="font-body text-gray-500 text-sm mb-7">Fill in the form and our travel experts will get back to you within 24 hours.</p>
              <InquiryForm />
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Map */}
      <FadeInSection delay={0.3}>
        <div className="mt-16 bg-white rounded-2xl shadow-card overflow-hidden h-72">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0!2d77.2197!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zConnaught Place!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"
            title="TourMyIndia Location"
          />
        </div>
      </FadeInSection>
    </div>
  </div>
);

export default ContactPage;
