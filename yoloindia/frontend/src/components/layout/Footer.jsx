import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Share2, Globe2, MessageSquare, Video, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-gray-300">
      {/* Newsletter */}
      <div className="bg-saffron-500">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">Get Exclusive Travel Deals</h3>
            <p className="font-body text-white/80 mt-1">Subscribe to our newsletter and save up to 40% on your next trip</p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/20 backdrop-blur text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white font-body text-sm"
            />
            <button
              type="submit"
              className="bg-dark text-white px-6 py-3 rounded-xl font-body font-semibold text-sm hover:bg-gray-900 transition-colors flex items-center gap-2"
            >
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-saffron-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">Y</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                Yolo<span className="text-saffron-400">India</span>
              </span>
            </Link>
            <p className="font-body text-sm text-gray-400 leading-relaxed mb-6">
              India's most trusted travel company with 15+ years of crafting unforgettable journeys. 
              Your adventure begins with us.
            </p>
            <div className="flex items-center gap-3">
              {[Share2, Globe2, MessageSquare, Video].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-saffron-500 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'All Packages', to: '/packages' },
                { label: 'Destinations', to: '/destinations' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'About Us', to: '/aboutus' },
              
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.to} className="font-body text-sm text-gray-400 hover:text-saffron-400 transition-colors flex items-center gap-2">
                    <ArrowRight size={12} className="text-saffron-500" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="font-display font-semibold text-white text-lg mb-5">Popular Destinations</h4>
            <ul className="space-y-3">
              {['Rajasthan', 'Kerala', 'Ladakh', 'Goa', 'Himachal Pradesh', 'Uttarakhand'].map((dest, i) => (
                <li key={i}>
                  <Link
                    to={`/destinations/${dest.toLowerCase().replace(/\s+/g, '-')}`}
                    className="font-body text-sm text-gray-400 hover:text-saffron-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight size={12} className="text-saffron-500" />
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white text-lg mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-saffron-400 flex-shrink-0 mt-1" />
                <span className="font-body text-sm text-gray-400">
                  Office Address: 34, Millennium Business Center, Corner Market, Malviya Nagar, South Delhi,<br />New Delhi – 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-saffron-400 flex-shrink-0" />
                <a href="tel:+919560235517" className="font-body text-sm text-gray-400 hover:text-saffron-400">
                  +919560235517 (Toll Free)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-saffron-400 flex-shrink-0" />
                <a href="mailto:info@tourmyindia.com" className="font-body text-sm text-gray-400 hover:text-saffron-400">
                  info@yoloindiatours.com 
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="font-body text-xs text-gray-500 mb-1">Mon – Sat: 9AM – 8PM</p>
              <p className="font-body text-xs text-gray-500">Sun: 10AM – 6PM IST</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-gray-500">
            © {currentYear} Yolo India. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="font-body text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/terms" className="font-body text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Refund & Cancellation Policy
            </Link>
            
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
