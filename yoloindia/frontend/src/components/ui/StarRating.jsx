import { Star } from 'lucide-react';

const StarRating = ({ rating, reviews, size = 'sm', showCount = true }) => {
  const sizes = { sm: 14, md: 16, lg: 20 };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            size={s}
            className={i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
          />
        ))}
      </div>
      <span className={`font-body font-semibold text-gray-800 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {rating}
      </span>
      {showCount && reviews && (
        <span className={`text-gray-400 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          ({reviews})
        </span>
      )}
    </div>
  );
};

export default StarRating;
