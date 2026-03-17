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
    <div className="my-20">
      <h3 className='font-bold text-secondary text-center mb-10 text-lg md:text-xl'>
        We've helped thousands of sales teams
      </h3>
      <Marquee
        gradient={false}     
        speed={100}           
        pauseOnHover={true}  
      >
        {allBrands.map((brand, index) => (
          <div key={index} className='mx-6 md:mx-8 flex items-center'>
            <Image src={brand} alt={`Brand ${index + 1}`} className='h-4 md:h-5 lg:h-6 w-auto object-contain' height={24} />
          </div>
        ))}
      </Marquee>
      <div>
        <hr className=' border-dashed border-secondary mt-20' />
      </div>
    </div>
  );
};

export default BrandLogo;
