import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Star, Quote } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { fetchTestimonials } from '../../services/api';

const TestimonialsSection = () => {
  const { data: testimonials, loading } = useFetch(fetchTestimonials);

  if (loading || !testimonials) return null;

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        className="!pb-12"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <div className="bg-white rounded-2xl p-6 shadow-card h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <Quote size={32} className="text-saffron-200 fill-saffron-100" />
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} className={i <= t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
              </div>
              <p className="font-body text-gray-600 text-sm leading-relaxed flex-1 italic mb-5">"{t.review}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-11 h-11 rounded-full bg-saffron-100 flex items-center justify-center font-display font-bold text-saffron-600 text-lg flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-body font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="font-body text-xs text-gray-400">{t.location} · {t.tour}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`.swiper-pagination-bullet{background:#ff7a10!important}`}</style>
    </div>
  );
};

export default TestimonialsSection;
