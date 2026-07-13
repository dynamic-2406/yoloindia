import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const slides = [
  { name: 'Rajasthan', tagline: 'Land of Kings', image: 'https://images.unsplash.com/photo-1477587458883-47145ed68e33?w=900&q=80', slug: 'rajasthan', badge: '🏆 Most Popular' },
  { name: 'Kerala', tagline: "God's Own Country", image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=80', slug: 'kerala', badge: '💑 Honeymoon Fav' },
  { name: 'Ladakh', tagline: 'Land of High Passes', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80', slug: 'ladakh', badge: '🏔️ Adventure' },
  { name: 'Goa', tagline: 'Sun, Sand & Serenity', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=80', slug: 'goa', badge: '🌊 Beach Vibes' },
  { name: 'Himachal Pradesh', tagline: 'Mountain Paradise', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80', slug: 'himachal-pradesh', badge: '❄️ Snow & Skiing' },
  { name: 'Bali', tagline: 'Island of Gods', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80', slug: 'bali', badge: '🌏 International' },
];

const TrendingSlider = () => (
  <div className="relative">
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{ delay: 3800, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
      className="!pb-12"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <Link to={`/destinations/${slide.slug}`} className="block group">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-card">
              <img src={slide.image} alt={slide.name} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-body font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-1.5 rounded-full">{slide.badge}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display font-bold text-white text-xl">{slide.name}</h3>
                <p className="font-body text-white/70 text-sm">{slide.tagline}</p>
                <div className="flex items-center gap-1 mt-3 text-saffron-400 text-xs font-body font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Explore now <ArrowRight size={12} />
                </div>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
    <style>{`.swiper-pagination-bullet{background:#ff7a10!important}.swiper-button-next,.swiper-button-prev{color:#ff7a10!important;background:white;width:40px!important;height:40px!important;border-radius:50%;box-shadow:0 4px 12px rgba(0,0,0,.15)}.swiper-button-next::after,.swiper-button-prev::after{font-size:14px!important;font-weight:bold}`}</style>
  </div>
);

export default TrendingSlider;
