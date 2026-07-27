import Image from 'next/image';
import img1 from '@/app/assets/live-tracking.png';
import img2 from '@/app/assets/safe-delivery.png';

const infoItems = [
  {
    img: img1,
    tag: "Real-Time Updates",
    title: 'Live Parcel Tracking',
    desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    img: img2,
    tag: "Guaranteed Security",
    title: '100% Safe Delivery',
    desc: 'We ensure your parcels are handled with the utmost care, fully insured and delivered securely — every single time.',
  },
  {
    img: img2,
    tag: "Always Available",
    title: '24/7 Call Center Support',
    desc: 'Our dedicated support team is available around the clock to assist you with any query, concern, or update — anytime, anywhere.',
  },
];

const Info = () => {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-border/70 bg-white/80 px-4 py-12 shadow-[0_24px_80px_-48px_rgba(8,60,64,0.45)] backdrop-blur-sm sm:px-6 sm:py-16 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

      {/* Section Header */}
      <div className="relative mb-10 sm:mb-12">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-2">
          Why Choose Us
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary">
          Built for Your Peace of Mind
        </h2>
      </div>

      {/* Info Cards */}
      <div className="space-y-4 sm:space-y-5">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-gradient-to-br from-white to-[#f4faf6] p-6 shadow-[0_12px_30px_-24px_rgba(8,60,64,0.35)]
                       flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 lg:gap-10
                       hover:shadow-[0_24px_50px_-30px_rgba(8,60,64,0.4)] hover:border-primary/30 hover:-translate-y-0.5
                       transition-all duration-300 ease-in-out overflow-hidden relative"
          >
            {/* Step watermark */}
            <span className="absolute top-4 right-5 text-7xl font-black text-secondary/5
                             group-hover:text-primary/10 transition-colors duration-300
                             select-none leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Image */}
            <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32
                            bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/15 rounded-2xl border border-primary/10
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
              <span className="inline-block text-xs font-semibold uppercase tracking-widest
                               text-secondary bg-secondary/5 px-3 py-1 rounded-full mb-3 border border-secondary/10">
                {item.tag}
              </span>
              <h3 className="font-bold text-secondary text-xl sm:text-2xl mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-14 sm:mt-16 lg:mt-20">
        <hr className="border-dashed border-secondary/30" />
      </div>
    </section>
  );
};

export default Info;
