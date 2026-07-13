import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Star, Quote } from 'lucide-react';
import Section, { SectionHeader, FadeInSection } from '../common/Section';
import { fetchTestimonials } from '../../services/api';

const TestimonialCard = ({ t }) => (
  <div className="bg-white rounded-2xl p-7 shadow-card h-full flex flex-col">
    <div className="flex items-center gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} className={i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
    <Quote size={32} className="text-saffron-100 mb-3 -mt-1" />
    <p className="font-body text-gray-600 text-sm leading-relaxed italic flex-1 mb-6">"{t.review}"</p>
    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
      <div className="w-11 h-11 rounded-full bg-saffron-100 flex items-center justify-center font-display font-bold text-saffron-600 text-lg">
        {t.name[0]}
      </div>
      <div>
        <p className="font-body font-semibold text-gray-900 text-sm">{t.name}</p>
        <p className="font-body text-xs text-gray-400">{t.location} · {t.date}</p>
      </div>
      <div className="ml-auto">
        <span className="text-xs bg-saffron-50 text-saffron-600 px-2.5 py-1 rounded-full font-body font-medium border border-saffron-100">{t.tour.split(' ').slice(0,2).join(' ')}</span>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials().then(setTestimonials);
  }, []);

  return (
    <Section className="bg-gradient-to-br from-saffron-50 to-amber-50">
      <FadeInSection>
        <SectionHeader
          badge="Real Stories"
          title={<>What Our <span className="text-saffron-500">Travelers Say</span></>}
          subtitle="Don't take our word for it — here's what 50,000+ happy travelers have to say about their journeys"
        />
      </FadeInSection>
      <FadeInSection delay={0.15}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="!pb-14"
        >
          {testimonials.map(t => (
            <SwiperSlide key={t.id} className="h-auto">
              <TestimonialCard t={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </FadeInSection>
    </Section>
  );
};

export default Testimonials;
