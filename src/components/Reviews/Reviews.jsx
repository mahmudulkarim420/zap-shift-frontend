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
    <div className="relative w-full max-w-6xl mx-auto py-10">
      <div className="text-center">
        <Image className="w-60 mx-auto" src={customerImg} alt="Customer Top" width={240} height={100} />
        <div>
          <h2 className="font-bold text-secondary mb-5 mt-3 text-3xl">
            What our customers are sayings
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>
      </div>
      
      {reviews.length > 0 && (
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          loop={true}
          centeredSlides={true}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            scale: 0.75,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-6 md:-translate-y-10 z-10 relative">
        <button
          ref={prevRef}
          className="bg-white text-black w-10 h-10 rounded-full shadow flex items-center justify-center transition hover:bg-gray-50"
          aria-label="Previous review"
        >
          <FaArrowLeft />
        </button>
        <button
          ref={nextRef}
          className="bg-primary text-black w-10 h-10 rounded-full shadow flex items-center justify-center transition hover:bg-lime-400"
          aria-label="Next review"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Reviews;
