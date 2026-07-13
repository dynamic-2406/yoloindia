import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Phone, ChevronDown, MapPin, Package, Compass } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import logo from '../../assets/logo.jpeg'


const megaMenuData = {
  Destinations: {
    icon: <MapPin size={16} />,
    columns: [
      {
        title: 'India',
        items: [
          { label: 'Rajasthan', to: '/destinations/rajasthan' },
          { label: 'Kerala', to: '/destinations/kerala' },
          { label: 'Ladakh', to: '/destinations/ladakh' },
          { label: 'Goa', to: '/destinations/goa' },
          { label: 'Himachal Pradesh', to: '/destinations/himachal-pradesh' },
          { label: 'Uttarakhand', to: '/destinations/uttarakhand' },
          { label: 'Delhi', to: '/destinations/delhi' },
        ],
      },
      {
        title: 'International',
        items: [
          { label: 'Bali, Indonesia', to: '/destinations/bali' },
          { label: 'Thailand', to: '/destinations/thailand' },
          
        ],
      },
    ],
  },
  Packages: {
    icon: <Package size={16} />,
    columns: [
      {
        title: 'By Type',
        items: [
          { label: 'Tour Categories', to: '/tour-categories' },
          { label: 'Adventure Tours', to: '/packages?category=Adventure' },
          { label: 'Honeymoon', to: '/packages?category=Honeymoon' },
          { label: 'Wildlife Safari', to: '/packages?category=Wildlife' },
          { label: 'Pilgrimage', to: '/packages?category=Pilgrimage' },
          { label: 'Heritage', to: '/packages?category=Heritage' },
        ],
      },
      {
        title: 'By Theme',
        items: [
          { label: 'Luxury', to: '/packages' },
          { label: 'Budget', to: '/packages' },
          { label: 'Family', to: '/packages' },
          { label: 'Trekking', to: '/packages' },
          { label: 'Weekend Getaways', to: '/packages' },
        ],
      },
    ],
  },
  Themes: {
    icon: <Compass size={16} />,
    columns: [
      {
        title: 'Experiences',
        items: [
          { label: 'Beach Holidays', to: '/packages' },
          { label: 'Mountain Escapes', to: '/packages' },
          { label: 'Cultural Immersion', to: '/packages' },
          { label: 'Spiritual Journeys', to: '/packages' },
          { label: 'Eco Tourism', to: '/packages' },
        ],
      },
    ],
  },
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const megaTimeout = useRef(null);
  const { count } = useWishlist();
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [location.pathname]);

  const navBg = isScrolled || !isHomepage
    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
    : 'bg-transparent';
  const textColor = isScrolled || !isHomepage ? 'text-gray-800' : 'text-white';
  const logoColor = isScrolled || !isHomepage ? 'text-saffron-600' : 'text-white';

  const handleMegaEnter = (key) => {
    clearTimeout(megaTimeout.current);
    setActiveMega(key);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 150);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
              <img
                src={logo}
                alt="Yolo India Tours logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className={`font-display font-bold text-xl leading-none ${logoColor}`}>
                Yolo<span className="text-saffron-500">India</span>
              </span>
              <p className={`text-[10px] font-body tracking-widest uppercase ${isScrolled || !isHomepage ? 'text-gray-400' : 'text-white/70'}`}>
                Explore · Discover · Experience
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {Object.keys(megaMenuData).map(key => (
              <div
                key={key}
                onMouseEnter={() => handleMegaEnter(key)}
                onMouseLeave={handleMegaLeave}
                className="relative"
              >
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-body font-medium text-sm transition-colors duration-200 ${textColor} hover:text-saffron-500`}
                >
                  {megaMenuData[key].icon}
                  {key}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${activeMega === key ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {activeMega === key && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden min-w-max"
                      onMouseEnter={() => handleMegaEnter(key)}
                      onMouseLeave={handleMegaLeave}
                    >
                      <div className="flex gap-0 p-6">
                        {megaMenuData[key].columns.map((col, ci) => (
                          <div key={ci} className={`${ci > 0 ? 'ml-10 pl-10 border-l border-gray-100' : ''}`}>
                            <p className="text-xs font-body font-bold uppercase tracking-widest text-saffron-500 mb-3">
                              {col.title}
                            </p>
                            <ul className="space-y-1">
                              {col.items.map((item, ii) => (
                                <li key={ii}>
                                  <Link
                                    to={item.to}
                                    className="block py-1.5 px-2 text-sm text-gray-700 hover:text-saffron-600 hover:bg-saffron-50 rounded-lg font-body transition-colors duration-150 whitespace-nowrap"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              to="/packages"
              className={`px-4 py-2 font-body font-medium text-sm transition-colors duration-200 ${textColor} hover:text-saffron-500`}
            >
              All Packages
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 font-body font-medium text-sm transition-colors duration-200 ${textColor} hover:text-saffron-500`}
            >
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+91 9560235517"
              className={`flex items-center gap-2 text-sm font-body font-medium ${textColor}`}
            >
              <Phone size={16} className="text-saffron-500" />
              <span>+91 9560235517</span>
            </a>
            <Link
              to="/wishlist"
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Heart size={20} className={textColor} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-saffron-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>
            <Link
              to="/packages"
              className="bg-saffron-500 hover:bg-saffron-600 text-white px-5 py-2.5 rounded-xl font-body font-semibold text-sm transition-colors duration-200"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg ${textColor}`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {Object.keys(megaMenuData).map(key => (
                <div key={key}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 font-body font-medium text-gray-800"
                  >
                    <span className="flex items-center gap-2">{megaMenuData[key].icon}{key}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${mobileExpanded === key ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-6"
                      >
                        {megaMenuData[key].columns.map((col, ci) => (
                          <div key={ci} className="mb-3">
                            <p className="text-xs font-bold text-saffron-500 uppercase tracking-wide mb-2">{col.title}</p>
                            {col.items.map((item, ii) => (
                              <Link
                                key={ii}
                                to={item.to}
                                className="block py-2 text-sm text-gray-600 hover:text-saffron-500"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link to="/packages" className="block py-3 px-4 font-body font-medium text-gray-800 hover:text-saffron-500">All Packages</Link>
              <Link to="/contact" className="block py-3 px-4 font-body font-medium text-gray-800 hover:text-saffron-500">Contact</Link>
              <div className="pt-3 border-t border-gray-100">
                <Link
                  to="/packages"
                  className="block w-full text-center bg-saffron-500 text-white py-3 rounded-xl font-body font-semibold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
