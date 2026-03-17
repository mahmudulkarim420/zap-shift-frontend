import Image from 'next/image';
import logo from '@/app/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] text-white p-6 sm:p-10 mb-5 rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
        {/* Logo & Description */}
        <aside>
          <div className="flex items-end justify-center sm:justify-start gap-2">
            <Image src={logo} alt="ZapShift Logo" width={40} height={40} />
            <h2 className="font-bold text-2xl -ms-3.5">ZapShift</h2>
          </div>
          <p className="text-sm my-5 sm:text-base max-w-lg">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
            personal packages to business shipments — we deliver on time, every time.
          </p>
          <p className="text-xs sm:text-sm">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
