import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { convertInrToUsd, formatPrice } from '../../utils/helpers';
import { useUsdRate } from '../../hooks/useUsdRate';

const getaways = [
  { name: 'Rishikesh', from: 'Delhi', duration: '2D/1N', image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=500&q=80', priceInr: 4999 },
  { name: 'Coorg', from: 'Bangalore', duration: '2D/1N', image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=500&q=80', priceInr: 5999 },
  { name: 'Lonavala', from: 'Mumbai', duration: '2D/1N', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&q=80', priceInr: 3999 },
  { name: 'Kasol', from: 'Delhi', duration: '3D/2N', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80', priceInr: 6499 },
  { name: 'Mahabaleshwar', from: 'Pune', duration: '2D/1N', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80', priceInr: 4499 },
  { name: 'Pondicherry', from: 'Chennai', duration: '2D/1N', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', priceInr: 5499 },
];

const WeekendGetaways = () => {
  const { rate } = useUsdRate();

  return (
    <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
      {getaways.map((g, i) => (
        <Link
          key={i}
          to="/packages"
          className="group flex-shrink-0 w-52 snap-start"
        >
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-card">
            <img
              src={g.image}
              alt={g.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute top-3 left-3 bg-saffron-500 text-white text-xs font-body font-semibold px-2.5 py-1 rounded-full">
              From {g.from}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="font-display font-bold text-white text-lg">{g.name}</h4>
              <div className="flex items-center justify-between mt-1.5">
                <div className="flex items-center gap-1 text-white/70 text-xs font-body">
                  <Clock size={11} /> {g.duration}
                </div>
                <span className="text-saffron-300 font-body font-bold text-sm">
                  {formatPrice(convertInrToUsd(g.priceInr, rate))}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <Link
        to="/packages"
        className="flex-shrink-0 w-52 snap-start flex items-center justify-center h-64 rounded-2xl border-2 border-dashed border-saffron-200 bg-saffron-50 hover:bg-saffron-100 transition-colors group"
      >
        <div className="text-center text-saffron-500">
          <div className="w-12 h-12 bg-saffron-100 group-hover:bg-saffron-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
            <ArrowRight size={20} />
          </div>
          <p className="font-body font-semibold text-sm">View All</p>
          <p className="font-body text-xs text-saffron-400">50+ getaways</p>
        </div>
      </Link>
    </div>
  );
};

export default WeekendGetaways;
