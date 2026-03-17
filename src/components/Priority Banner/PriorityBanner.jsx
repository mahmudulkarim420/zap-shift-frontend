import Image from 'next/image';
import boxImg from '@/app/assets/location-merchant.png';
import topImg from '@/app/assets/be-a-merchant-bg.png';

const PriorityBanner = () => {
  return (
    <div className="bg-[#033C3F] rounded-3xl p-6 md:p-10 mb-20 relative overflow-hidden">
      {/* TOP IMAGE OVERLAY */}
      <Image
        src={topImg}
        alt="top design"
        className="absolute top-0 left-0 w-full h-36 md:h-52 object-cover opacity-90 pointer-events-none"
        fill
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        <div className="text-white max-w-xl mt-20 md:mt-20">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-4">
            Merchant and Customer Satisfaction <br /> is Our First Priority
          </h1>

          <p className="text-gray-200 mb-8 text-sm md:text-base">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. ZapShift courier delivers your
            parcels everywhere in Bangladesh right on time.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-[#C8FF65] px-5 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-black hover:bg-[#B6F055] transition">
              Become a Merchant
            </button>

            <button className="border border-[#C8FF65] px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[#C8FF65] font-semibold hover:bg-[#C8FF65] hover:text-black transition">
              Earn with ZapShift Courier
            </button>
          </div>
        </div>

        <div className="flex justify-center w-full md:w-auto">
          <Image 
            src={boxImg} 
            alt="boxes" 
            className="w-80 md:w-80 lg:w-130 lg:mt-6 opacity-90"
            width={520}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default PriorityBanner;
