import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css'; import 'swiper/css/navigation'; import 'swiper/css/pagination';
import { Clock, MapPin, Star, Heart, Check, X, ChevronRight, ChevronDown, Users, ArrowLeft } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { fetchPackageById, fetchPackages } from '../services/api';
import { formatPrice, getDiscount } from '../utils/helpers';
import { useWishlist } from '../context/WishlistContext';
import PackageCard from '../components/packages/PackageCard';
import InquiryForm from '../components/home/InquiryForm';
import BookingModal from '../components/bookings/BookingModal';
import Modal from '../components/ui/Modal';
import FAQSection from '../components/home/FAQSection';

const PackageDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: pkg, loading } = useFetch(() => fetchPackageById(id), [id]);
  const { data: allPkgs } = useFetch(fetchPackages);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [activeTab, setActiveTab] = useState('itinerary');
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [openDay, setOpenDay] = useState(null);

  const similar = allPkgs ? allPkgs.filter(p => p.id !== pkg?.id && p.category === pkg?.category).slice(0,3) : [];

  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-body text-gray-500">Loading package details...</p>
      </div>
    </div>
  );

  if (!pkg) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-2xl font-bold mb-4">Package not found</p>
        <Link to="/packages" className="text-saffron-500 underline font-body">Browse all packages</Link>
      </div>
    </div>
  );

  const discount = getDiscount(pkg.originalPrice, pkg.price);
  const tabs = ['itinerary','highlights','inclusions'];

  return (
    <div className="bg-cream min-h-screen">
      {/* Gallery Header */}
      <div className="relative">
        <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 5000, disableOnInteraction: false }} className="h-[50vh] md:h-[60vh]">
          {pkg.gallery.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full">
                <img src={img} alt={`${pkg.title} ${i+1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={() => navigate(-1)}
          className="absolute top-24 left-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block bg-saffron-500 text-white text-xs font-body font-bold px-3 py-1 rounded-full mb-3">{pkg.category}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-white/80 text-sm font-body"><MapPin size={14} className="text-saffron-400" />{pkg.destination}</div>
              <div className="flex items-center gap-1.5 text-white/80 text-sm font-body"><Clock size={14} className="text-saffron-400" />{pkg.duration}</div>
              <div className="flex items-center gap-1.5 text-sm font-body">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="text-white font-bold">{pkg.rating}</span>
                <span className="text-white/60">({pkg.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
        <style>{`.swiper-button-next,.swiper-button-prev{color:white!important}.swiper-pagination-bullet{background:white!important}`}</style>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-8 border border-gray-100">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-sm font-body font-semibold rounded-lg transition-all capitalize
                    ${activeTab === tab ? 'bg-saffron-500 text-white shadow-sm' : 'text-gray-600 hover:text-saffron-500'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="space-y-3">
                {pkg.itinerary.map((day, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-2xl p-3 shadow-card"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDay(openDay === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 text-left"
                    >
                      <div className="flex items-center gap-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-saffron-50 border-2 border-saffron-200 rounded-xl flex flex-col items-center justify-center">
                          <p className="font-body text-xs text-saffron-500 font-bold uppercase leading-none">Day</p>
                          <p className="font-display font-bold text-saffron-600 text-lg leading-none">{day.day}</p>
                        </div>
                        <div>
                          <h4 className="font-body font-semibold text-gray-900 pr-4 text-sm md:text-base">{day.title}</h4>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: openDay === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown size={20} className="text-saffron-500" />
                      </motion.div>
                    </button>
                    {openDay === i && (
                      <p className="mt-4 font-body text-gray-500 text-sm leading-relaxed">{day.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Highlights */}
            {activeTab === 'highlights' && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-display font-bold text-gray-900 text-xl mb-5">Tour Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-forest-50 rounded-xl">
                      <div className="w-6 h-6 bg-forest-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={13} className="text-white" />
                      </div>
                      <span className="font-body text-gray-700 text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions */}
            {activeTab === 'inclusions' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <h3 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-forest-100 rounded-full flex items-center justify-center"><Check size={13} className="text-forest-600" /></div>
                    Inclusions
                  </h3>
                  <ul className="space-y-3">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-body text-gray-700">
                        <Check size={15} className="text-forest-500 flex-shrink-0" /> {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <h3 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center"><X size={13} className="text-red-500" /></div>
                    Exclusions
                  </h3>
                  <ul className="space-y-3">
                    {pkg.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-body text-gray-600">
                        <X size={15} className="text-red-400 flex-shrink-0" /> {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Similar Packages */}
            {similar.length > 0 && (
              <div className="mt-14">
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-6">Similar Packages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {similar.map(p => <PackageCard key={p.id} pkg={p} />)}
                </div>
              </div>
            )}

             <div className="mt-14">
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <FAQSection />
            </div>
          </div>



          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* Price Card */}
              <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-3xl text-saffron-600">{formatPrice(pkg.price)}</span>
                      {discount > 0 && <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">-{discount}%</span>}
                    </div>
                    <p className="font-body text-xs text-gray-400">per person · all inclusive</p>
                    {pkg.originalPrice > pkg.price && (
                      <p className="font-body text-sm text-gray-400 line-through">{formatPrice(pkg.originalPrice)}</p>
                    )}
                  </div>
                  <button onClick={() => toggleWishlist(pkg)}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-300 transition-colors">
                    <Heart size={18} className={isWishlisted(pkg.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                  </button>
                </div>

                <div className="flex items-center gap-1 mb-5 mt-3">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className={i <= Math.round(pkg.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />)}
                  <span className="font-body text-sm font-semibold text-gray-800 ml-1">{pkg.rating}</span>
                  <span className="font-body text-xs text-gray-400">({pkg.reviews} reviews)</span>
                </div>

                <div className="space-y-3 mb-5 py-4 border-y border-gray-100">
                  {[['Duration', pkg.duration],['Destination', pkg.destination],['Category', pkg.category]].map(([k,v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="font-body text-gray-500">{k}</span>
                      <span className="font-body font-semibold text-gray-900">{v}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => setBookingOpen(true)}
                  className="w-full bg-saffron-500 hover:bg-saffron-600 text-white py-3.5 rounded-xl font-body font-bold text-sm transition-colors duration-200 mb-3">
                  Book This Package
                </button>
                <button onClick={() => setInquiryOpen(true)}
                  className="w-full border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50 py-3 rounded-xl font-body font-semibold text-sm transition-colors duration-200">
                  Send Inquiry
                </button>

                <p className="font-body text-xs text-center text-gray-400 mt-3">Secure booking handled through Razorpay checkout</p>
              </div>

              {/* Quick Info */}
              <div className="bg-saffron-50 border border-saffron-100 rounded-2xl p-5">
                <p className="font-body font-semibold text-saffron-800 text-sm mb-3">🎯 Quick Info</p>
                <ul className="space-y-2 text-xs font-body text-saffron-700">
                  <li className="flex items-center gap-2"><Check size={13} />Free cancellation (30+ days)</li>
                  <li className="flex items-center gap-2"><Check size={13} />Best price guarantee</li>
                  <li className="flex items-center gap-2"><Check size={13} />Experienced certified guide</li>
                  <li className="flex items-center gap-2"><Check size={13} />24/7 on-trip support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialPackage={pkg}
        packages={allPkgs || [pkg]}
      />
      <Modal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} title="Request Custom Quote" size="lg">
        <InquiryForm />
      </Modal>
    </div>
  );
};

export default PackageDetailsPage;
