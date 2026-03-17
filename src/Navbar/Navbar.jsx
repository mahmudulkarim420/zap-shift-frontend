'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import logo from '@/app/assets/logo.png';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsRegistered(localStorage.getItem('isRegistered') === 'true');
  }, []);

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    isActive(path)
      ? 'bg-primary text-black font-semibold px-4 py-2 rounded-lg'
      : 'text-gray-600 hover:text-primary px-4 py-2';

  const links = (
    <>
      <li>
        <Link href="/services" className={linkClass('/services')}>
          Services
        </Link>
      </li>
      <li>
        <Link href="/coverage" className={linkClass('/coverage')}>
          Coverage
        </Link>
      </li>
      <li>
        <Link href="/about" className={linkClass('/about')}>
          About Us
        </Link>
      </li>
      <li>
        <Link href="/pricing" className={linkClass('/pricing')}>
          Pricing
        </Link>
      </li>
      <li>
        <Link href="/rider" className={linkClass('/rider')}>
          Be a Rider
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-sm mt-5 rounded-2xl px-5 py-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-end">
          <Image className="w-9 h-9" src={logo} alt="ZapShift Logo" width={36} height={36} />
          <h1 className="font-bold text-3xl -ms-3">ZapShift</h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-5 text-gray-500">{links}</ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-4 items-center">
          {isRegistered ? (
            <Link href="/login" className="border border-gray-300 rounded-xl px-4 py-2 text-gray-500 hover:bg-gray-50 transition">
              Sign In
            </Link>
          ) : (
            <Link href="/register" className="border border-gray-300 rounded-xl px-4 py-2 text-gray-500 hover:bg-gray-50 transition">
              Sign Up
            </Link>
          )}
          <Link
            href="/rider"
            className="bg-primary text-black font-semibold rounded-xl shadow px-4 py-2"
          >
            Be a Rider
          </Link>
          <div className="bg-secondary text-primary p-3 rounded-full -rotate-45">
            <FaArrowRight />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-3 bg-white rounded-2xl shadow p-4">
          <ul className="flex flex-col gap-3 text-gray-500">{links}</ul>
          <div className="flex flex-col gap-3 mt-4">
            <Link
              href="/register"
              className="border border-gray-300 rounded-xl px-4 py-2 text-gray-500 text-center hover:bg-gray-50 transition w-full"
            >
              Sign Up
            </Link>
            <Link href="/rider" className="bg-primary text-black font-semibold rounded-xl shadow px-4 py-2 w-full text-center">
              Be a Rider
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
