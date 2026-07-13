import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import Section, { SectionHeader, FadeInSection } from '../components/common/Section';
import DestinationCard from '../components/destinations/DestinationCard';
import TourCategoriesHome from '../components/home/TourCategoriesHome';
import TrendingSlider from '../components/home/TrendingSlider';
import PackagesByInterest from '../components/home/PackagesByInterest';
import WeekendGetaways from '../components/home/WeekendGetaways';
import TravelExperiences from '../components/home/TravelExperiences';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import InquiryForm from '../components/home/InquiryForm';
import PackageCard from '../components/packages/PackageCard';
import { useFetch } from '../hooks/useFetch';
import { useUsdRate } from '../hooks/useUsdRate';
import { fetchFeaturedDestinations, fetchPackages } from '../services/api';
import { convertInrToUsd } from '../utils/helpers';

const internationalDests = [
  { id:'i1', name:'Bali, Indonesia', slug:'bali', tagline:'Island of Gods', type:'International', image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80', bestTime:'Apr–Oct' },
  { id:'i2', name:'Thailand', slug:'thailand', tagline:'Land of Smiles', type:'International', image:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=80', bestTime:'Nov–Mar' },
  { id:'i3', name:'Maldives', slug:'maldives', tagline:'Paradise on Earth', type:'International', image:'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=700&q=80', bestTime:'Nov–Apr' },
  { id:'i4', name:'Dubai', slug:'dubai', tagline:'City of Gold & Glamour', type:'International', image:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80', bestTime:'Oct–Apr' },
];
const HomePage = () => {
  const { data: destinations } = useFetch(fetchFeaturedDestinations);
  const { data: packages } = useFetch(fetchPackages);
  const { rate } = useUsdRate();
  const intlPackages = packages ? packages.filter(p => p.price > convertInrToUsd(30000, rate)).slice(0,4) : [];

  return (
    <div className="bg-cream">
      <HeroSection />

      {/* Top Destinations */}
      <Section className="bg-cream">
        <FadeInSection>
          <SectionHeader
            badge="Explore India"
            title={<>Top <span className="text-saffron-500">Destinations</span></>}
            subtitle="From royal deserts to tropical backwaters, discover India's most iconic travel destinations"
          />
        </FadeInSection>
        <FadeInSection delay={0.1}>
          {destinations ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {destinations.filter(d => d.type === 'India').slice(0,4).map(dest => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_,i) => <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse" />)}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/destinations" className="inline-flex items-center gap-2 border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-500 hover:text-white px-8 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200">
              Explore All Destinations <ArrowRight size={16} />
            </Link>
          </div>
        </FadeInSection>
      </Section>

      {/* Tour Categories */}
      <Section className="bg-white">
        <FadeInSection>
          <SectionHeader
            badge="Tour Categories"
            title={<>Explore <span className="text-saffron-500">Tour Categories</span></>}
            subtitle="Discover India through five unique tour experiences — from heritage trails to adventure expeditions"
          />
        </FadeInSection>
        <FadeInSection delay={0.1}><TourCategoriesHome /></FadeInSection>
      </Section>

      {/* Trending Slider */}
      {/* <Section className="bg-white">
        <FadeInSection>
          <SectionHeader
            badge="Trending Now"
            title={<>Trending <span className="text-saffron-500">This Season</span></>}
            subtitle="Handpicked destinations flying off our shelves — book before they fill up"
          />
        </FadeInSection>
        <FadeInSection delay={0.1}><TrendingSlider /></FadeInSection>
      </Section> */}

      {/* Tour Packages by Interest */}
      <Section className="bg-cream">
        <FadeInSection>
          <SectionHeader
            badge="Tour Packages"
            title={<>Find Your Perfect <span className="text-saffron-500">Adventure</span></>}
            subtitle="Curated packages for every interest — from wildlife safaris to romantic honeymoons"
          />
        </FadeInSection>
        <FadeInSection delay={0.1}><PackagesByInterest /></FadeInSection>
        <FadeInSection>
          <div className="text-center mt-12">
            <Link to="/packages" className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-4 rounded-xl font-body font-semibold transition-colors duration-200 shadow-lg shadow-saffron-200">
              View All Packages <ArrowRight size={16} />
            </Link>
          </div>
        </FadeInSection>
      </Section>

      {/* Travel Experiences */}
      {/* <Section className="bg-white">
        <FadeInSection>
          <SectionHeader
            badge="By Experience"
            title={<>Travel by <span className="text-saffron-500">Experience</span></>}
            subtitle="What kind of traveler are you? Choose your vibe"
          />
        </FadeInSection>
        <FadeInSection delay={0.1}><TravelExperiences /></FadeInSection>
      </Section> */}

      {/* Weekend Getaways */}
      {/* <Section className="bg-cream">
        <FadeInSection>
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              badge="Quick Escapes"
              title={<>Weekend <span className="text-saffron-500">Getaways</span></>}
              subtitle="Short on time? Explore these perfect 2–3 day escapes"
              centered={false}
            />
            <Link to="/packages" className="hidden md:flex items-center gap-1.5 text-saffron-500 font-body font-semibold text-sm hover:gap-2.5 transition-all">
              See All <ArrowRight size={15} />
            </Link>
          </div>
        </FadeInSection>
        <FadeInSection delay={0.1}><WeekendGetaways /></FadeInSection>
      </Section> */}

      {/* International Packages */}
      <Section className="bg-white">
        <FadeInSection>
          <SectionHeader
            badge="Go Global"
            title={<>International <span className="text-saffron-500">Packages</span></>}
            subtitle="Explore beyond borders with our expertly crafted international tour packages"
          />
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {internationalDests.map(dest => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </FadeInSection>
        {intlPackages.length > 0 && (
          <FadeInSection delay={0.2}>
            <h3 className="font-display font-bold text-xl text-gray-900 mb-6 text-center">Featured national Packages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {intlPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
            </div>
          </FadeInSection>
        )}
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-cream">
        <FadeInSection>
          <SectionHeader
            badge="Why YoloIndia"
            title={<>Travel with <span className="text-saffron-500">Confidence</span></>}
            subtitle="15 years of crafting perfect journeys — here's why 50,000+ travelers trust us"
          />
        </FadeInSection>
        <FadeInSection delay={0.1}><WhyChooseUs /></FadeInSection>
      </Section>

      {/* About India */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <FadeInSection>
            <span className="inline-block bg-saffron-50 text-saffron-600 text-xs font-body font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-saffron-200 mb-5">
              Incredible India
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              A Civilization That<br /><span className="text-saffron-500">Inspires the World</span>
            </h2>
            <p className="font-body text-gray-600 leading-relaxed mb-4">
              India is not just a destination — it's an emotion. From the snow-capped Himalayas in the north to 
              the palm-fringed beaches of the south, from the Thar Desert's golden dunes to the northeastern's 
              misty hills, India holds 5,000 years of history in every stone.
            </p>
            <p className="font-body text-gray-600 leading-relaxed mb-8">
              With 40 UNESCO World Heritage Sites, 12 different climatic zones, 22 official languages, and 
              thousands of festivals — every trip to India reveals a new facet of this extraordinary subcontinent.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[['40+','UNESCO Heritage Sites'],['12','Climatic Zones'],['30+','Wildlife Sanctuaries'],['600+','Languages & Dialects']].map(([v,l],i) => (
                <div key={i} className="bg-saffron-50 rounded-xl p-4 border border-saffron-100">
                  <p className="font-display font-bold text-2xl text-saffron-600">{v}</p>
                  <p className="font-body text-xs text-gray-600 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
            <Link to="/destinations" className="inline-flex items-center gap-2 bg-dark text-white px-7 py-3.5 rounded-xl font-body font-semibold text-sm hover:bg-gray-900 transition-colors duration-200">
              Explore India <Globe size={16} />
            </Link>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://ik.imagekit.io/kpm3y5moe/WhatsApp%20Image%202026-06-22%20at%2010.38.39%20AM_WGsrQxBUX.jpeg?updatedAt=1782112688386" alt="Taj Mahal" className="rounded-2xl h-56 w-full object-cover shadow-xl" />
                <img src="https://ik.imagekit.io/kpm3y5moe/ChatGPT%20Image%20Jun%2022,%202026,%2010_52_15%20PM.png?updatedAt=1782149172565" alt="Kerala" className="rounded-2xl h-56 w-full object-cover shadow-xl mt-8" />
                <img src="https://ik.imagekit.io/kpm3y5moe/amber%20fort.png?updatedAt=1782150976933" alt="Rajasthan" className="rounded-2xl h-56 w-full object-cover shadow-xl" />
                <img src="https://ik.imagekit.io/kpm3y5moe/8fc6cfdc-1eb5-4c5b-8964-ec677948d4b4.png?updatedAt=1782106316402" alt="Ladakh" className="rounded-2xl h-56 w-full object-cover shadow-xl mt-8" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-saffron-500 text-white px-5 py-3 rounded-xl shadow-xl">
                <p className="font-display font-bold text-xl">4.9★</p>
                <p className="font-body text-xs text-saffron-100">50,000+ happy travelers</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-cream">
        <FadeInSection>
          <SectionHeader
            badge="Traveler Stories"
            title={<>What Our Travelers <span className="text-saffron-500">Say</span></>}
            subtitle="Real experiences from real explorers who trusted us with their dream vacations"
          />
        </FadeInSection>
        <FadeInSection delay={0.1}><TestimonialsSection /></FadeInSection>
      </Section>

      {/* FAQ */}
      <Section className="bg-white">
        <FadeInSection>
          <SectionHeader
            badge="Got Questions?"
            title={<>Frequently Asked <span className="text-saffron-500">Questions</span></>}
            subtitle="Everything you need to know before booking your dream trip"
          />
        </FadeInSection>
        <FadeInSection delay={0.1}><FAQSection /></FadeInSection>
      </Section>

      {/* CTA Inquiry */}
      <Section className="bg-gradient-to-br from-saffron-500 via-orange-500 to-amber-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Ready to Plan Your<br />Dream Trip?
            </h2>
            <p className="font-body text-white/85 text-lg leading-relaxed mb-6">
              Get a free, personalized itinerary from our travel experts within 24 hours. 
              No obligations, just pure inspiration.
            </p>
            <div className="flex flex-wrap gap-3">
              {['✓ Free itinerary','✓ Best price guarantee','✓ 24/7 support','✓ Flexible booking'].map(item => (
                <span key={item} className="font-body text-sm text-white/90 bg-white/15 px-4 py-2 rounded-full">{item}</span>
              ))}
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="bg-white rounded-2xl shadow-2xl p-7">
              <h3 className="font-display font-bold text-gray-900 text-xl mb-6">Get a Free Quote</h3>
              <InquiryForm compact />
            </div>
          </FadeInSection>
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
