import Image from "next/image";
import { Quote, Star } from "lucide-react";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] min-h-[260px] sm:min-h-[300px] flex flex-col justify-between group hover:border-primary/30 hover:shadow-[0_8px_24px_-8px_rgba(0,183,149,0.1)] transition-all duration-300">
      <div>
        {/* Quote & Stars */}
        <div className="flex justify-between items-start mb-5">
          <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center">
            <Quote className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex gap-0.5 text-primary">
            {[...Array(review.rating || 5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-primary" />
            ))}
          </div>
        </div>

        {/* Review Text */}
        <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-6">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      <div className="space-y-5">
        <div className="border-t border-dashed border-[#E5E7EB]" />

        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-primary/10 blur-md rounded-full" />
            <img
              src={review.image || "https://i.ibb.co/mJR9nkv/default-avatar.png"}
              alt={review.name}
              className="relative w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-[#1F2937] text-sm truncate">{review.name}</h4>
            <p className="text-[11px] font-medium text-primary tracking-wide">
              {review.designation || "Verified Customer"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
