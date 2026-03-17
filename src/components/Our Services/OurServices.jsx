import Image from 'next/image';
import icon from '@/app/assets/service.png';

const services = [
  {
    title: "Express & Standard Delivery",
    desc: "Parcels delivered within 24–72 hours across major cities. Express delivery in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    title: "Nationwide Delivery",
    desc: "Home delivery in every district across Bangladesh — your products reach customers within 48–72 hours, guaranteed.",
  },
  {
    title: "Fulfillment Solution",
    desc: "Inventory management, online order processing, custom packaging, and after-sales support — all under one roof.",
  },
  {
    title: "Cash on Home Delivery",
    desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety and secure handling of every product.",
  },
  {
    title: "Corporate & Contract Logistics",
    desc: "Customized corporate solutions including warehouse management, inventory control, and dedicated logistics contracts.",
  },
  {
    title: "Parcel Return",
    desc: "Reverse logistics made easy — allow end customers to return or exchange products with your online business seamlessly.",
  },
];

const OurServices = () => {
  return (
    <section className="bg-secondary rounded-2xl sm:rounded-3xl px-5 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-3">
          What We Offer
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
          Our Services
        </h2>
        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
          Fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative bg-white/5 border border-white/10 backdrop-blur-sm
                       rounded-2xl p-6 sm:p-7 overflow-hidden
                       hover:bg-primary hover:border-primary
                       transition-all duration-300 ease-in-out hover:shadow-2xl"
          >
            {/* Watermark index */}
            <span className="absolute top-4 right-5 text-6xl font-black text-white/5
                             group-hover:text-black/10 transition-colors duration-300
                             select-none leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <div className="relative w-12 h-12 mb-5 bg-white/10 group-hover:bg-black/10
                            rounded-xl flex items-center justify-center
                            transition-colors duration-300">
              <Image
                src={icon}
                alt={service.title}
                width={26}
                height={26}
                className="object-contain"
              />
            </div>

            {/* Text */}
            <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-black
                           mb-2 leading-snug transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-white/60 group-hover:text-black/70
                          leading-relaxed transition-colors duration-300">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;