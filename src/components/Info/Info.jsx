import Image from 'next/image';
import { MapPin, ShieldCheck, Headphones } from 'lucide-react';
import img1 from '@/app/assets/live-tracking.png';
import img2 from '@/app/assets/safe-delivery.png';

const infoItems = [
  {
    img: img1,
    icon: MapPin,
    tag: "Real-time Updates",
    title: 'Live Parcel Tracking',
    desc: "Stay updated in real time with live parcel tracking. From pickup to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    img: img2,
    icon: ShieldCheck,
    tag: "Guaranteed Security",
    title: '100% Safe Delivery',
    desc: 'Every parcel is handled with the utmost care, fully insured and delivered securely — every single time.',
  },
  {
    img: img2,
    icon: Headphones,
    tag: "Always Available",
    title: '24/7 Support Center',
    desc: 'Our dedicated support team is available around the clock to assist you with any query, concern, or update — anytime, anywhere.',
  },
];

const Info = () => {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-12 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:px-6 sm:py-16 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/4 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent/4 blur-3xl" />

      {/* Section Header */}
      <div className="relative mb-10 sm:mb-12">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-primary mb-2">
          Why Choose Us
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2937] leading-tight">
          Built for your peace of mind
        </h2>
      </div>

      {/* Info Cards */}
      <div className="space-y-4 sm:space-y-5">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]
                         flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 lg:gap-10
                         hover:shadow-[0_8px_24px_-8px_rgba(0,183,149,0.1)] hover:border-primary/30 hover:-translate-y-0.5
                         transition-all duration-300 ease-in-out"
            >
              {/* Step watermark */}
              <span className="absolute top-4 right-5 text-7xl font-black text-[#F3F4F6]
                               group-hover:text-primary/8 transition-colors duration-300
                               select-none leading-none pointer-events-none">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Image */}
              <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32
                              bg-primary/6 group-hover:bg-primary/10 rounded-2xl border border-primary/10
                              flex items-center justify-center transition-colors duration-300 p-4">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Text */}
              <div className="text-center sm:text-left flex-1 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider
                                 text-primary bg-primary/8 px-3 py-1 rounded-full mb-3 border border-primary/10">
                  <Icon className="w-3.5 h-3.5" />
                  {item.tag}
                </span>
                <h3 className="font-bold text-[#1F2937] text-xl sm:text-2xl mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed max-w-xl">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mt-14 sm:mt-16 lg:mt-20">
        <hr className="border-dashed border-[#E5E7EB]" />
      </div>
    </section>
  );
};

export default Info;
