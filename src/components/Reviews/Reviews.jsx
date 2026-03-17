'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
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
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    fetch('/reviews.json')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error('Failed to load reviews:', err));
  }, []);

  return (
    <section className="relative w-full">

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12">

        {/* Decorative customer image */}
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
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Thousands of merchants and customers trust ZapShift for fast,
          safe, and reliable delivery across Bangladesh — every single day.
        </p>
      </div>

      {/* Swiper Carousel */}
      {reviews.length > 0 ? (
        <div className="relative">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            loop={true}
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
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Dots */}
          <div className="reviews-pagination flex justify-center gap-2 mt-2" />
        </div>
      ) : (
        /* Loading skeleton */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-100 animate-pulse rounded-2xl h-48 w-full"
            />
          ))}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          ref={prevRef}
          aria-label="Previous review"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-200 bg-white
                     text-secondary flex items-center justify-center shadow-sm
                     hover:border-primary hover:text-primary
                     active:scale-95 transition-all duration-200"
        >
          <FaArrowLeft className="text-sm" />
        </button>

        <button
          ref={nextRef}
          aria-label="Next review"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary text-black
                     flex items-center justify-center shadow-md
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