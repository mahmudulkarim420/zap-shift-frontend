import Image from "next/image";
import quoteImg from '@/app/assets/reviewQuote.png';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-gradient-to-b from-white to-[#f4faf6] border border-border/70 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_60px_-30px_rgba(8,60,64,0.35)] min-h-[320px] flex flex-col justify-between group hover:border-primary/40 transition-all duration-300">
      <div>
        {/* Quote & Stars */}
        <div className="flex justify-between items-start mb-6">
          <Image src={quoteImg} alt="Quote" className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="flex gap-1 text-primary">
            {[...Array(review.rating || 5)].map((_, i) => (
              <FaStar key={i} size={12} />
            ))}
          </div>
        </div>

        {/* Review Text */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 italic">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-t border-dashed border-border"></div>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full"></div>
            <img
              src={review.image || "https://i.ibb.co/mJR9nkv/default-avatar.png"}
              alt={review.name}
              className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-black text-secondary text-base truncate">{review.name}</h4>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
              {review.designation || "Verified Customer"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
