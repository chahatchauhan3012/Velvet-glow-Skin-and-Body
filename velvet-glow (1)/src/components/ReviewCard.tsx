import { Review } from '../types';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { handleImageError } from '../utils';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 border border-gold-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full relative"
    >
      <div>
        {/* Stars */}
        <div className="flex text-amber-400 space-x-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 fill-current ${
                i < review.rating ? 'text-amber-400' : 'text-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-gray-600 font-sans text-sm italic leading-relaxed mb-6">
          "{review.comment}"
        </p>
      </div>

      {/* Author details */}
      <div className="flex items-center space-x-3.5 border-t border-gold-50 pt-4 mt-auto">
        <img
          src={review.avatar}
          alt={review.author}
          referrerPolicy="no-referrer"
          onError={(e) => handleImageError(e, 'avatar')}
          className="w-10 h-10 rounded-full object-cover border border-gold-100"
        />
        <div>
          <h4 className="font-sans font-bold text-sm text-velvet-950">
            {review.author}
          </h4>
          <span className="text-[10px] text-gray-400 font-sans">
            Verified Purchase • {review.date}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
