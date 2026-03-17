import Image from 'next/image';
import img1 from '@/app/assets/live-tracking.png';
import img2 from '@/app/assets/safe-delivery.png';

const Info = () => {
  return (
    <div className="space-y-6 px-4 sm:px-10 lg:px-6">
      {[
        {
          img: img1,
          title: 'Live Parcel Tracking',
          desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        },
        {
          img: img2,
          title: '100% Safe Delivery',
          desc: 'We ensure your parcels are handled with the utmost care and delivered securely.',
        },
        {
          img: img2,
          title: '24/7 Call Center Support',
          desc: 'Our dedicated support team is available around the clock to assist you anytime.',
        },
      ].map((item, index) => (
        <div key={index}>
          <div className="bg-white flex flex-col md:flex-row items-center p-8 rounded-2xl gap-6 md:gap-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Image src={item.img} alt={item.title} className="w-28 md:w-auto" width={112} height={112} />
            <div className="text-center md:text-left">
              <h2 className="font-bold text-secondary text-2xl mb-3">
                {item.title}
              </h2>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
      <hr className="border-dashed border-secondary my-14" />
    </div>
  );
};

export default Info;
