'use client';

import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import logo from '@/app/assets/logo.png';
import Image from 'next/image';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userRole, logout } = useContext(AuthContext);
  const pathname = usePathname();

  const handleLogout = () => {
    logout()
      .then(() => {
        console.log('Logged out successfully');
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
      });
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    isActive(path)
      ? 'bg-primary text-black font-semibold px-4 py-2 rounded-lg'
      : 'text-gray-600 hover:text-primary px-4 py-2 transition';

  const mobileLinkClass = (path) =>
    isActive(path)
      ? 'bg-primary text-black font-semibold px-4 py-3 rounded-lg block'
      : 'text-gray-600 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg block transition';

  const navItems = [
    { href: '/services', label: 'Services' },
    { href: '/coverage', label: 'Coverage' },
    { href: '/about', label: 'About Us' },
    { href: '/pricing', label: 'Pricing' },
  ];

  const dropdownLinks = {
    user: [
      { href: '/profile', label: 'Profile' },
      { href: '/track-order', label: 'Track Order' },
    ],
    rider: [
      { href: '/dashboard/rider', label: 'Rider Dashboard' },
      { href: '/profile', label: 'Profile' },
    ],
    admin: [
      { href: '/profile', label: 'Profile' },
      { href: '/dashboard/admin', label: 'Full Dashboard' },
      { href: '/track-order', label: 'Track Order' },
    ],
  };

  return (
    <nav className="mt-5 rounded-2xl bg-white px-5 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-end">
          <Image
            className="h-9 w-9"
            src={logo}
            alt="ZapShift Logo"
            width={36}
            height={36}
          />
          <h1 className="-ms-3 text-3xl font-bold text-secondary">ZapShift</h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <div className="relative group">
              <div className="flex items-center gap-2 py-2 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center font-extrabold text-sm shadow-md transition group-hover:scale-105">
                  {user.name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-secondary uppercase tracking-widest leading-none">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">
                    {userRole}
                  </span>
                </div>
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-black/5 overflow-hidden backdrop-blur-sm">
                  <div className="py-2">
                    {dropdownLinks[userRole]?.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-5 py-3 text-xs font-bold text-gray-600 hover:bg-primary hover:text-black transition uppercase tracking-widest"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-50 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-3 text-xs font-bold text-red-500 hover:bg-red-50 transition uppercase tracking-widest"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-2.5 text-xs font-bold text-gray-500 transition hover:bg-gray-100 hover:text-secondary uppercase tracking-widest"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-2.5 text-xs font-bold text-gray-500 transition hover:bg-gray-100 hover:text-secondary uppercase tracking-widest"
              >
                Sign Up
              </Link>
            </>
          )}

          <Link
            href="/rider"
            className="rounded-xl bg-primary px-4 py-2 font-semibold text-black shadow"
          >
            Be a Rider
          </Link>

          <div className="-rotate-45 rounded-full bg-secondary p-3 text-primary">
            <FaArrowRight />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-3 rounded-2xl bg-white p-4 shadow lg:hidden">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={mobileLinkClass(item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center font-bold shadow-sm">
                    {user.name?.charAt(0) || user.email?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-secondary tracking-tight">
                      {user.name || user.email.split('@')[0]}
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium truncate max-w-[150px]">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-center text-xs font-bold text-gray-500 transition hover:bg-gray-100 hover:text-secondary uppercase tracking-widest"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 text-center text-gray-500 transition hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 text-center text-gray-500 transition hover:bg-gray-50"
                >
                  Sign Up
                </Link>
              </>
            )}

            <Link
              href="/rider"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-xl bg-primary px-4 py-2 text-center font-semibold text-black shadow"
            >
              Be a Rider
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;