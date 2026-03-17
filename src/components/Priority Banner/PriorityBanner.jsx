import Image from 'next/image';
import boxImg from '@/app/assets/location-merchant.png';
import topImg from '@/app/assets/be-a-merchant-bg.png';

const PriorityBanner = () => {
  return (
    <section className="relative rounded-3xl overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[#033C3F]" />

      {/* Top decorative image overlay */}
      <div className="absolute top-0 left-0 w-full h-40 sm:h-52 lg:h-64 pointer-events-none z-0">
        <Image
          src={topImg}
          alt=""
          fill
          className="object-cover object-top opacity-80"
          aria-hidden="true"
        />
        {/* Fade out bottom edge of overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#033C3F]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end
                      justify-between gap-8 lg:gap-12
                      px-6 sm:px-10 lg:px-16
                      pt-24 sm:pt-32 lg:pt-28
                      pb-10 sm:pb-12 lg:pb-0">

        {/* Left — Text */}
        <div className="text-white max-w-xl w-full text-center lg:text-left pb-0 lg:pb-14">

          {/* Eyebrow */}
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Our Commitment
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-4 sm:mb-5">
            Merchant and Customer Satisfaction{' '}
            <span className="text-primary">is Our First Priority</span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-7 sm:mb-8 max-w-lg mx-auto lg:mx-0">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. ZapShift courier delivers your
            parcels everywhere in Bangladesh right on time.
          </p>

          {/* Stats row */}
          <div className="flex justify-center lg:justify-start gap-6 sm:gap-8 mb-8 sm:mb-10">
            {[
              { value: '100%', label: 'Safe Delivery' },
              { value: '48h', label: 'Avg. Delivery' },
              { value: '64+', label: 'Districts' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-bold text-primary leading-none mb-0.5">
                  {stat.value}
                </p>
                <p className="text-xs text-white/50 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
            <button className="bg-primary text-black font-semibold px-5 sm:px-6 py-2.5 sm:py-3
                               rounded-full text-sm sm:text-base
                               hover:brightness-105 active:scale-95 transition-all duration-200 shadow-lg">
              Become a Merchant
            </button>
            <button className="border border-primary text-primary font-semibold
                               px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base
                               hover:bg-primary hover:text-black active:scale-95
                               transition-all duration-200">
              Earn with ZapShift
            </button>
          </div>
        </div>

        {/* Right — Image */}
        <div className="shrink-0 flex justify-center lg:justify-end w-full lg:w-auto">
          <Image
            src={boxImg}
            alt="Merchant delivery illustration"
            width={480}
            height={380}
            className="w-64 sm:w-80 lg:w-[420px] xl:w-[480px] object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default PriorityBanner;