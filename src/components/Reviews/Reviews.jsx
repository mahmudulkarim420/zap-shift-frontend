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
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
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

  // Loading skeleton matching card shape
  const SkeletonReview = () => (
    <div className="bg-gradient-to-b from-white to-[#f4faf6] border border-border/70 rounded-3xl p-10 h-72 animate-pulse shadow-[0_18px_40px_-28px_rgba(8,60,64,0.35)]">
      <div className="w-8 h-8 bg-primary/15 rounded-lg mb-4" />
      <div className="h-4 bg-slate-100 rounded-full w-full mb-2" />
      <div className="h-4 bg-slate-100 rounded-full w-4/5 mb-2" />
      <div className="h-4 bg-slate-100 rounded-full w-2/3 mb-6" />
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-100" />
        <div className="space-y-2">
          <div className="h-3 bg-slate-100 rounded-full w-24" />
          <div className="h-2 bg-slate-100 rounded-full w-16" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden rounded-[32px] border border-border/70 bg-white/80 px-4 py-12 shadow-[0_24px_80px_-48px_rgba(8,60,64,0.45)] backdrop-blur-sm sm:px-6 sm:py-16 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

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

        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-2">
          Customer Reviews
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-4">
          What Our Customers Are Saying
        </h2>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
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
        <div className="text-center py-20 bg-gradient-to-b from-white to-[#f5fbf6] rounded-3xl border-2 border-dashed border-border">
           <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No reviews found yet</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          ref={prevRef}
          aria-label="Previous review"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border bg-white
                     text-secondary flex items-center justify-center shadow-sm
                     hover:border-primary hover:text-primary hover:bg-primary/5
                     active:scale-95 transition-all duration-200"
        >
          <FaArrowLeft className="text-sm" />
        </button>

        <button
          ref={nextRef}
          aria-label="Next review"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary text-secondary
                     flex items-center justify-center shadow-[0_14px_30px_rgba(184,244,93,0.28)]
                     hover:brightness-105 active:scale-95
                     transition-all duration-200"
        >
          <FaArrowRight className="text-sm" />
        </button>
      </div>
    </section>
  );
};

export default Reviews;
