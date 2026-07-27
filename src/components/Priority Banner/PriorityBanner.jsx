import Image from 'next/image';
import { ShieldCheck, Clock, MapPinned } from 'lucide-react';
import boxImg from '@/app/assets/location-merchant.png';
import topImg from '@/app/assets/be-a-merchant-bg.png';

const stats = [
  { icon: ShieldCheck, value: '100%', label: 'Safe delivery' },
  { icon: Clock, value: '48h', label: 'Avg. delivery time' },
  { icon: MapPinned, value: '64+', label: 'Districts covered' },
];

const PriorityBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#E5E7EB] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937] via-[#1F2937] to-[#111827]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,183,149,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.08),_transparent_28%)]" />

      {/* Top decorative image overlay */}
      <div className="absolute top-0 left-0 w-full h-40 sm:h-52 lg:h-64 pointer-events-none z-0">
        <Image
          src={topImg}
          alt=""
          fill
          className="object-cover object-top opacity-60"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1F2937]" />
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
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-primary mb-3">
            Our Commitment
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-4 sm:mb-5">
            Merchant & customer satisfaction{' '}
            <span className="text-primary">is our first priority</span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-7 sm:mb-8 max-w-lg mx-auto lg:mx-0">
            We offer the lowest delivery charges with the highest value, along
            with 100% safety of your product. ZapShift delivers your
            parcels everywhere in Bangladesh, right on time.
          </p>

          {/* Stats row */}
          <div className="flex justify-center lg:justify-start gap-6 sm:gap-8 mb-8 sm:mb-10">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1">
                    <Icon className="w-4 h-4 text-primary/70" />
                    <p className="text-xl sm:text-2xl font-bold text-primary leading-none">
                      {stat.value}
                    </p>
                  </div>
                  <p className="text-[11px] sm:text-xs text-white/50 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
            <button className="bg-primary text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3
                               rounded-full text-sm
                               hover:bg-primary-hover active:scale-[0.97] transition-all duration-200 shadow-[0_4px_16px_rgba(0,183,149,0.25)]">
              Become a Merchant
            </button>
            <button className="border border-white/15 bg-white/10 text-white font-semibold
                               px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm
                               hover:bg-white/15 active:scale-[0.97]
                               transition-all duration-200 backdrop-blur-md">
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
