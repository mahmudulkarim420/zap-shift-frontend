'use client';

import Image from 'next/image';
import Marquee from "react-fast-marquee";
import brand1 from '@/app/assets/brands/amazon.png';
import brand2 from '@/app/assets/brands/amazon_vector.png';
import brand3 from '@/app/assets/brands/casio.png';
import brand4 from '@/app/assets/brands/moonstar.png';
import brand5 from '@/app/assets/brands/randstad.png';
import brand6 from '@/app/assets/brands/star.png';
import brand7 from '@/app/assets/brands/start_people.png';

const allBrands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

const BrandLogo = () => {
  return (
    <section>
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-primary mb-2">
          Trusted Partners
        </p>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1F2937] leading-snug">
          Brands that rely on ZapShift
        </h3>
      </div>

      {/* Marquee with fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
        >
          {allBrands.map((brand, index) => (
            <div
              key={index}
              className="mx-8 sm:mx-10 lg:mx-14 flex items-center justify-center
                         opacity-60 grayscale hover:opacity-100 hover:grayscale-0
                         transition-all duration-300"
            >
              <Image
                src={brand}
                alt={`Partner brand ${index + 1}`}
                height={28}
                className="h-5 sm:h-6 lg:h-7 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Divider */}
      <div className="mt-14 sm:mt-16 lg:mt-20">
        <hr className="border-dashed border-[#E5E7EB]" />
      </div>
    </section>
  );
};

export default BrandLogo;