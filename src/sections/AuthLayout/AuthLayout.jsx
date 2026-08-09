import Link from 'next/link';
import NextImage from 'next/image';
import { FaHome } from 'react-icons/fa';
import img from '@/app/assets/authImage.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative">
      {/* === TOP LEFT FIXED LOGO === */}
      <Link href="/" className="absolute top-4 left-4 sm:top-6 sm:left-8 flex items-center gap-2 z-20 hover:opacity-80 transition">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/10">
          <span className="text-secondary font-black text-lg sm:text-xl italic">Z</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-secondary">
          Zap<span className="text-primary">Shift</span>
        </h1>
      </Link>

      {/* === TOP RIGHT HOME BUTTON === */}
      <Link href="/" className="absolute top-4 right-4 sm:top-6 sm:right-8 z-10 hidden sm:block">
        <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm font-semibold text-xs sm:text-sm text-gray-700">
          <FaHome /> Back to Home
        </button>
      </Link>

      {/* LEFT SIDE FORM SECTION */}
      <div className="flex flex-col justify-center px-4 sm:px-12 md:px-20 pt-24 pb-12 sm:py-20">
        {children}
      </div>

      {/* RIGHT SIDE IMAGE SECTION */}
      <div className="hidden lg:flex bg-[#FAFDF0] items-center justify-center">
        <NextImage 
          src={img} 
          alt="Illustration" 
          className="w-[80%] h-auto" 
          width={600} 
          height={600} 
          priority 
        />
      </div>
    </div>
  );
};

export default AuthLayout;
