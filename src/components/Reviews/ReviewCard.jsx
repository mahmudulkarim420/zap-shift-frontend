import Image from "next/image";
import quoteImg from '@/app/assets/reviewQuote.png';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-10 mb-20">
      {/* Quote Icon */}
      <img src={quoteImg} alt="Quote" className="w-8 h-8 mb-3" />

      {/* Review Text */}
      <p className="text-gray-600 text-sm leading-relaxed mb-5">
        {review.review}
      </p>

      <div className="border-t border-dashed border-gray-300 my-4"></div>

      {/* Author Info */}
      <div className="flex items-center gap-3">
        <img
          src={review.user_photoURL}
          alt={review.userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{review.userName}</h4>
          <p className="text-xs text-gray-500">{review.user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
