import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sun, Thermometer, MapPin, ArrowRight } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { fetchDestinationById, fetchPackages } from '../services/api';
import PackageCard from '../components/packages/PackageCard';
import InquiryForm from '../components/home/InquiryForm';
import { FadeInSection } from '../components/common/Section';

const DestinationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: dest, loading } = useFetch(() => fetchDestinationById(id), [id]);
  const { data: allPkgs } = useFetch(fetchPackages);

  const relatedPkgs = allPkgs && dest
    ? allPkgs.filter(p => dest.packages.includes(p.id)).slice(0, 3)
    : [];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!dest) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-2xl font-bold mb-4">Destination not found</p>
        <Link to="/destinations" className="text-saffron-500 underline font-body">Browse all destinations</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-cream min-h-screen">
      {/* Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={dest.banner} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button onClick={() => navigate(-1)}
          className="absolute top-24 left-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md z-10">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6">
            <span className={`inline-block text-xs font-body font-bold px-3 py-1 rounded-full mb-3
              ${dest.type === 'International' ? 'bg-ocean-500 text-white' : 'bg-saffron-500 text-white'}`}>
              {dest.type}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">{dest.name}</h1>
            <p className="font-accent text-xl text-white/80 mt-2 italic">{dest.tagline}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <FadeInSection>
              <div className="bg-white rounded-2xl shadow-card p-7">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-4">Overview</h2>
                <p className="font-body text-gray-600 leading-relaxed">{dest.overview}</p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 bg-saffron-50 rounded-xl px-4 py-2.5">
                    <Sun size={18} className="text-saffron-500" />
                    <div>
                      <p className="font-body text-xs text-gray-500">Best Time</p>
                      <p className="font-body font-semibold text-gray-900 text-sm">{dest.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-2.5">
                    <Thermometer size={18} className="text-blue-500" />
                    <div>
                      <p className="font-body text-xs text-gray-500">Temperature</p>
                      <p className="font-body font-semibold text-gray-900 text-sm">{dest.temperature}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Top Attractions */}
            <FadeInSection delay={0.1}>
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-5">Top Attractions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {dest.attractions.map((att, i) => (
                  <motion.div key={i} whileHover={{ y:-4 }}
                    className="group rounded-2xl overflow-hidden shadow-card">
                    <div className="relative h-32 overflow-hidden">
                      <img src={att.image} alt={att.name} loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-2.5 bg-white">
                      <p className="font-body font-semibold text-xs text-gray-900 text-center">{att.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeInSection>

            {/* Gallery */}
            {dest.gallery.length > 0 && (
              <FadeInSection delay={0.15}>
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-5">Photo Gallery</h2>
                <div className="grid grid-cols-3 gap-3">
                  {dest.gallery.map((img, i) => (
                    <div key={i} className={`rounded-xl overflow-hidden ${i === 0 ? 'col-span-3 h-60' : 'h-36'}`}>
                      <img src={img} alt={`${dest.name} ${i+1}`} loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-400" />
                    </div>
                  ))}
                </div>
              </FadeInSection>
            )}

            {/* Related Packages */}
            {relatedPkgs.length > 0 && (
              <FadeInSection delay={0.2}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-2xl text-gray-900">Tour Packages</h2>
                  <Link to="/packages" className="flex items-center gap-1 text-saffron-500 font-body text-sm font-semibold">
                    View all <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {relatedPkgs.map(p => <PackageCard key={p.id} pkg={p} />)}
                </div>
              </FadeInSection>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h3 className="font-display font-bold text-xl text-gray-900 mb-5">Plan Your Trip</h3>
                <InquiryForm compact />
              </div>
              <div className="bg-gradient-to-br from-saffron-500 to-orange-500 rounded-2xl p-5 text-white">
                <p className="font-display font-bold text-lg mb-2">Need a Custom Package?</p>
                <p className="font-body text-sm text-white/85 mb-4">Get a tailor-made itinerary for {dest.name} designed just for you.</p>
                <Link to="/contact"
                  className="block text-center bg-white text-saffron-600 py-2.5 rounded-xl font-body font-bold text-sm hover:bg-saffron-50 transition-colors">
                  Contact an Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
