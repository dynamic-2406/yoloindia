import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Star, Quote } from 'lucide-react';
import Section, { SectionHeader, FadeInSection } from '../common/Section';
import { useFetch } from '../../hooks/useFetch';
import { fetchTestimonials } from '../../services/api';

const TestimonialsSlider = () => {
  const { data: testimonials, loading } = useFetch(fetchTestimonials);

  return (
    <Section className="bg-saffron-50">
      <FadeInSection>
        <SectionHeader
          badge="Happy Travellers"
          title="Stories from Our Adventurers"
          subtitle="Real experiences from real travellers who explored India with us"
        />
      </FadeInSection>

      {!loading && testimonials && (
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="!pb-12"
        >
          {testimonials.map(t => (
            <SwiperSlide key={t.id}>
              <div className="bg-white rounded-2xl p-6 shadow-card h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-saffron-100 flex items-center justify-center text-saffron-600 font-display font-bold text-lg overflow-hidden">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-body font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="font-body text-xs text-gray-400">{t.location}</p>
                    </div>
                  </div>
                  <Quote size={28} className="text-saffron-200 flex-shrink-0" />
                </div>

                <div className="flex items-center gap-0.5 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} className={i <= t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>

                <p className="font-body text-gray-600 text-sm leading-relaxed flex-1 mb-4">"{t.review}"</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-body text-saffron-600 font-medium bg-saffron-50 px-3 py-1 rounded-full">
                    {t.tour}
                  </span>
                  <span className="text-xs font-body text-gray-400">{t.date}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <style>{`.swiper-pagination-bullet{background:#fed7aa!important}.swiper-pagination-bullet-active{background:#ff7a10!important}`}</style>
    </Section>
  );
};

export default TestimonialsSlider;
