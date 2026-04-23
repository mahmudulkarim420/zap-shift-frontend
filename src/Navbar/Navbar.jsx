'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();

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

  return (
    <nav className="mt-5 rounded-2xl bg-white px-5 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="text-secondary font-black text-lg italic">Z</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-secondary">
            Zap<span className="text-primary">Shift</span>
          </h1>
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
          {isLoaded && (
            <>
              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="text-xs font-bold text-gray-500 hover:text-secondary uppercase tracking-widest transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="text-xs font-bold text-gray-500 hover:text-secondary uppercase tracking-widest transition"
                  >
                    Profile
                  </Link>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10 shadow-md",
                      }
                    }}
                  />
                </div>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-2.5 text-xs font-bold text-gray-500 transition hover:bg-gray-100 hover:text-secondary uppercase tracking-widest"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-2.5 text-xs font-bold text-gray-500 transition hover:bg-gray-100 hover:text-secondary uppercase tracking-widest"
                  >
                    Sign Up
                  </Link>
                </>
              )}
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
            {isLoaded && (
              <>
                {isSignedIn ? (
                  <div className="flex justify-center p-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setIsOpen(false)}
                      className="w-full rounded-xl border border-gray-300 px-4 py-2 text-center text-gray-500 transition hover:bg-gray-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setIsOpen(false)}
                      className="w-full rounded-xl border border-gray-300 px-4 py-2 text-center text-gray-500 transition hover:bg-gray-50"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
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