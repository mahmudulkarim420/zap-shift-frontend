import Image from 'next/image';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import logo from '@/app/assets/logo.png';
import img from '@/app/assets/authImage.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative">
      {/* === TOP LEFT FIXED LOGO === */}
      <Link href="/" className="absolute top-6 left-8 flex items-end z-10 hover:opacity-80 transition">
        <Image className="w-10 h-10" src={logo} alt="ZapShift Logo" width={40} height={40} />
        <h1 className="font-bold text-3xl -ms-3">ZapShift</h1>
      </Link>

      {/* === TOP RIGHT HOME BUTTON === */}
      <Link href="/" className="absolute top-6 right-8 z-10 hidden sm:block">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm font-semibold text-gray-700">
          <FaHome /> Back to Home
        </button>
      </Link>
      
      {/* LEFT SIDE FORM SECTION */}
      <div className="flex flex-col justify-center px-6 sm:px-12 md:px-20 py-20">
        {children}
      </div>

      {/* RIGHT SIDE IMAGE SECTION */}
      <div className="hidden lg:flex bg-[#FAFDF0] items-center justify-center">
        <Image src={img} alt="Illustration" className="w-[80%] h-auto" width={600} height={600} priority />
      </div>
    </div>
  );
};

export default AuthLayout;
