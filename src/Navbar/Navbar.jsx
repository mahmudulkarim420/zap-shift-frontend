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
  const { user, logout } = useContext(AuthContext);
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
    { href: '/rider', label: 'Be a Rider' },
  ];

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
          <h1 className="-ms-3 text-3xl font-bold">ZapShift</h1>
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName}
                    width={32}
                    height={32}
                    className="rounded-full border border-gray-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center font-bold text-xs">
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-semibold text-gray-700">
                  {user.displayName || user.email.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-gray-300 px-4 py-2 text-gray-500 transition hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-gray-300 px-4 py-2 text-gray-500 transition hover:bg-gray-50"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-gray-300 px-4 py-2 text-gray-500 transition hover:bg-gray-50"
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
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center font-bold">
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      {user.displayName || user.email.split('@')[0]}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 text-center text-gray-500 transition hover:bg-gray-50"
                >
                  Logout
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