'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from 'swiper/modules';
import ReviewCard from './ReviewCard';
import { ArrowRight, ArrowLeft, MessageSquareQuote } from 'lucide-react';
import customerImg from '@/app/assets/customer-top.png';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`);
        if (response.data.success) {
          setReviews(response.data.reviews);
        }
      } catch (err) {
        console.error('Failed to load reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const SkeletonReview = () => (
    <div className="bg-white border border-[#E5E7EB] rounded-3xl p-7 h-[300px] animate-pulse shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="w-9 h-9 bg-[#F3F4F6] rounded-lg mb-5" />
      <div className="h-4 bg-[#F3F4F6] rounded-full w-full mb-2" />
      <div className="h-4 bg-[#F3F4F6] rounded-full w-4/5 mb-2" />
      <div className="h-4 bg-[#F3F4F6] rounded-full w-2/3 mb-6" />
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-11 h-11 rounded-full bg-[#F3F4F6]" />
        <div className="space-y-2">
          <div className="h-3 bg-[#F3F4F6] rounded-full w-24" />
          <div className="h-2.5 bg-[#F3F4F6] rounded-full w-16" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white px-4 py-12 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:px-6 sm:py-16 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/4 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent/4 blur-3xl" />

      {/* Section Header */}
      <div className="relative text-center mb-10 sm:mb-12">
        <div className="flex justify-center mb-4">
          <Image
            src={customerImg}
            alt="Happy customers"
            width={220}
            height={90}
            className="w-44 sm:w-52 lg:w-60 object-contain"
          />
        </div>

        <p className="text-xs sm:text-sm font-semibold tracking-wider text-primary mb-2">
          Customer Reviews
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2937] mb-3 leading-tight">
          What our customers are saying
        </h2>
        <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Thousands of merchants and customers trust ZapShift for fast,
          safe, and reliable delivery across Bangladesh — every single day.
        </p>
      </div>

      {/* Swiper Carousel */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <SkeletonReview key={i} />)}
        </div>
      ) : reviews.length > 0 ? (
        <div className="relative">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            loop={reviews.length >= 3}
            centeredSlides={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 160,
              scale: 0.82,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: '.reviews-pagination',
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="pb-12"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="reviews-pagination flex justify-center gap-2 mt-2" />
        </div>
      ) : (
        <div className="text-center py-16 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E5E7EB]">
          <MessageSquareQuote className="w-8 h-8 text-[#D1D5DB] mx-auto mb-3" />
          <p className="text-[#9CA3AF] font-medium text-sm">No reviews yet</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          ref={prevRef}
          aria-label="Previous review"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#E5E7EB] bg-white
                     text-[#1F2937] flex items-center justify-center
                     hover:border-primary hover:text-primary hover:bg-primary/5
                     active:scale-95 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          ref={nextRef}
          aria-label="Next review"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary text-white
                     flex items-center justify-center shadow-[0_4px_12px_rgba(0,183,149,0.18)]
                     hover:bg-primary-hover active:scale-95
                     transition-all duration-200"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default Reviews;
