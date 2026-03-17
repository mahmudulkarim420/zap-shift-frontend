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
    <section>

      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
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
            className="group bg-white border border-gray-100 rounded-2xl p-6 sm:p-8
                       flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 lg:gap-10
                       hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5
                       transition-all duration-300 ease-in-out overflow-hidden relative"
          >
            {/* Step watermark */}
            <span className="absolute top-4 right-5 text-7xl font-black text-gray-50
                             group-hover:text-primary/5 transition-colors duration-300
                             select-none leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Image */}
            <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32
                            bg-primary/5 group-hover:bg-primary/10 rounded-2xl
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
                               text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                {item.tag}
              </span>
              <h3 className="font-bold text-secondary text-xl sm:text-2xl mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl">
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