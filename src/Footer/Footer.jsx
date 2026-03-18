import Link from 'next/link';
import { FaLinkedinIn, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] text-white px-5 py-10 sm:px-10 sm:py-14 mb-5 rounded-2xl">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/10">
            <span className="text-secondary font-black text-xl italic">Z</span>
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-white">
            Zap<span className="text-primary">Shift</span>
          </h2>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        {/* Divider */}
        <div className="my-6 border-t border-dashed border-gray-700"></div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm sm:text-base text-gray-300">
          <Link href="/services" className="hover:text-primary transition">
            Services
          </Link>
          <Link href="/coverage" className="hover:text-primary transition">
            Coverage
          </Link>
          <Link href="/about" className="hover:text-primary transition">
            About Us
          </Link>
          <Link href="/pricing" className="hover:text-primary transition">
            Pricing
          </Link>
          <Link href="/blog" className="hover:text-primary transition">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-primary transition">
            Contact
          </Link>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-dashed border-gray-700"></div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4">
          <a className="bg-[#1DA1F2] p-2 rounded-full hover:scale-110 transition">
            <FaLinkedinIn />
          </a>
          <a className="bg-white text-black p-2 rounded-full hover:scale-110 transition">
            <FaXTwitter />
          </a>
          <a className="bg-[#1877F2] p-2 rounded-full hover:scale-110 transition">
            <FaFacebookF />
          </a>
          <a className="bg-[#FF0000] p-2 rounded-full hover:scale-110 transition">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;