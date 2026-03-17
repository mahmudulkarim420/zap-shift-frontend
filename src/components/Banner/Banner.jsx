'use client';

import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '@/app/assets/banner/banner1.png';
import bannerImg2 from '@/app/assets/banner/banner2.png';
import bannerImg3 from '@/app/assets/banner/banner3.png';
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className='relative my-5'>
      <div className="absolute bottom-20 left-[20%] -translate-x-1/2 z-10 flex gap-4">
        <div className='hidden lg:flex gap-4 items-center'>
          <button className="px-6 py-2 bg-primary text-black font-semibold rounded-3xl shadow">
            Track Your Parcel
          </button>
          
          <Link href="/register">
            <button className="px-6 py-2 bg-secondary text-primary font-semibold rounded-3xl shadow">
              Join Now
            </button>
          </Link>

          <div className='bg-secondary text-primary p-3 rounded-full -rotate-45'>
            <FaArrowRight />
          </div>
          <Link href="/rider">
            <button className="px-4 py-2 bg-white text-black btn font-semibold rounded-full shadow">
              Be a Rider
            </button>
          </Link>
        </div>
      </div>
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <div>
          <Image src={bannerImg1} alt="Banner 1" priority />
        </div>
        <div>
          <Image src={bannerImg2} alt="Banner 2" />
        </div>
        <div>
          <Image src={bannerImg3} alt="Banner 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
