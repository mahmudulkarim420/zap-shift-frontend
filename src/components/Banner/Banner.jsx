"use client";

import React, { useEffect, useState, useCallback } from "react";
import bannerImg1 from "@/app/assets/banner/banner1.png";
import bannerImg2 from "@/app/assets/banner/banner2.png";
import bannerImg3 from "@/app/assets/banner/banner3.png";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  { img: bannerImg1, alt: "ZapShift express delivery service" },
  { img: bannerImg2, alt: "Nationwide parcel delivery coverage" },
  { img: bannerImg3, alt: "Real-time parcel tracking dashboard" },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setCurrent((index + slides.length) % slides.length);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mt-4 sm:mt-5 w-full overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[32px] border border-[#E5E7EB] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]">
      {/* Slides */}
      <div className="relative w-full min-h-[240px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[520px] xl:min-h-[600px]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.img}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937]/75 via-[#1F2937]/30 to-transparent" />
          </div>
        ))}

        {/* CTA Content */}
        <div className="absolute inset-0 z-20 flex items-end px-3 pb-3 sm:px-6 sm:pb-7 md:px-10 md:pb-10 lg:px-14 lg:pb-14 xl:px-16">
          <div className="w-full max-w-4xl">
            <div className="mb-1.5 sm:mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[9.5px] font-semibold tracking-wider text-white/90 backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs">
              Fast · Secure · Nationwide
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 md:gap-4">
              <Link
                href="/track-order"
                className="rounded-full bg-primary px-2.5 py-1 text-[10.5px] font-semibold text-white shadow-[0_4px_16px_rgba(0,183,149,0.25)] transition-all duration-200 hover:bg-primary-hover active:scale-[0.97] sm:px-5 sm:py-2.5 md:px-6 md:py-3 sm:text-sm md:text-base"
              >
                Track Your Parcel
              </Link>

              <Link
                href="/sign-up"
                className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 active:scale-[0.97] sm:px-5 sm:py-2.5 md:px-6 md:py-3 sm:text-sm md:text-base"
              >
                Get Started
              </Link>

              <div className="hidden md:flex rounded-full bg-white/10 p-3 text-white backdrop-blur-md -rotate-45">
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>

              <Link
                href="/rider"
                className="rounded-full bg-white px-2.5 py-1 text-[10.5px] font-semibold text-[#1F2937] shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 hover:bg-[#F8FAFC] active:scale-[0.97] sm:px-5 sm:py-2.5 md:px-6 md:py-3 sm:text-sm md:text-base"
              >
                Be a Rider
              </Link>
            </div>
          </div>
        </div>

        {/* Prev Button */}
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 sm:left-4 sm:p-2.5 md:left-5 md:p-3"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => goTo(current + 1)}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 sm:right-4 sm:p-2.5 md:right-5 md:p-3"
        >
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 right-3 z-30 flex gap-1.5 sm:bottom-4 sm:right-5 sm:gap-2 md:bottom-5 md:right-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "h-2 w-6 bg-primary shadow-[0_0_10px_rgba(0,183,149,0.35)] sm:w-7 md:w-8"
                  : "h-2 w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
