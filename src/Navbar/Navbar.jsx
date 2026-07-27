"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, User, LayoutDashboard, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isLoaded = status !== "loading";
  const isSignedIn = status === "authenticated";
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    isActive(path)
      ? "bg-primary text-white font-medium px-4 py-2 rounded-xl shadow-[0_4px_12px_rgba(0,183,149,0.18)] text-sm"
      : "text-[#6B7280] hover:text-[#1F2937] px-4 py-2 rounded-xl transition-colors duration-200 text-sm font-medium";

  const mobileLinkClass = (path) =>
    isActive(path)
      ? "bg-primary text-white font-medium px-4 py-3 rounded-xl block shadow-[0_4px_12px_rgba(0,183,149,0.15)] text-sm"
      : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F8FAFC] px-4 py-3 rounded-xl block transition-colors duration-200 text-sm font-medium";

  const navItems = [
    { href: "/services", label: "Services" },
    { href: "/coverage", label: "Coverage" },
    { href: "/about", label: "About Us" },
    { href: "/pricing", label: "Pricing" },
  ];

  if (!isLoaded) return (
    <nav className="mt-5 rounded-2xl border border-[#E5E7EB] bg-white/90 px-5 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.08)] backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-black text-lg italic">Z</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#1F2937]">
            Zap<span className="text-primary">Shift</span>
          </span>
        </Link>
        <div className="animate-pulse bg-[#F3F4F6] h-10 w-24 rounded-xl" />
      </div>
    </nav>
  );

  return (
    <nav className="mt-5 rounded-2xl border border-[#E5E7EB] bg-white/90 px-5 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.08)] backdrop-blur-xl relative z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-black text-lg italic">Z</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#1F2937]">
            Zap<span className="text-primary">Shift</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          {isSignedIn ? (
            <div className="relative group">
              <button
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm border-2 border-primary/20 shadow-[0_2px_8px_rgba(0,183,149,0.15)] group-hover:border-primary-hover transition-all duration-200 cursor-pointer overflow-hidden"
                aria-label="Account menu"
              >
                {user?.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'
                )}
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 w-52">
                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-2 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#F3F4F6] mb-1">
                    <p className="text-[11px] font-semibold text-[#9CA3AF] tracking-wide">Welcome back</p>
                    <p className="text-sm font-bold text-[#1F2937] truncate mt-0.5">{user?.name || 'User'}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#6B7280] hover:bg-[#F0FDF9] hover:text-primary rounded-xl transition-colors duration-200"
                  >
                    <LayoutDashboard className="w-4 h-4 text-primary" />
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#6B7280] hover:bg-[#F0FDF9] hover:text-primary rounded-xl transition-colors duration-200"
                  >
                    <User className="w-4 h-4 text-primary" />
                    Profile
                  </Link>

                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200 text-left mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-xl border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-medium text-[#6B7280] transition-colors duration-200 hover:bg-[#F8FAFC] hover:text-[#1F2937]"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-medium text-[#6B7280] transition-colors duration-200 hover:bg-[#F8FAFC] hover:text-[#1F2937]"
              >
                Sign up
              </Link>
            </>
          )}

          <Link
            href="/rider"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,183,149,0.18)] hover:bg-primary-hover transition-colors duration-200"
          >
            Be a Rider
          </Link>

          <Link
            href="/track-order"
            className="-rotate-45 rounded-full bg-[#1F2937] p-2.5 text-white shadow-[0_2px_8px_rgba(31,41,55,0.12)] hover:bg-[#111827] transition-colors duration-200"
            aria-label="Track order"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 transition-colors duration-200 hover:bg-[#F8FAFC] text-[#6B7280]"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] lg:hidden">
          <ul className="flex flex-col gap-1">
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
            {isSignedIn && (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={mobileLinkClass("/dashboard")}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className={mobileLinkClass("/profile")}
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="mt-4 flex flex-col gap-3">
            {isSignedIn ? (
              <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E7EB]">
                <div className="flex flex-col">
                   <span className="text-[11px] font-semibold text-[#9CA3AF] tracking-wide">Account</span>
                   <span className="text-sm font-bold text-[#1F2937]">{user?.name || 'User'}</span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm border-2 border-primary/20"
                  aria-label="Sign out"
                >
                  {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-center text-[#6B7280] transition-colors duration-200 hover:bg-[#F8FAFC] font-medium text-sm"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-center text-[#6B7280] transition-colors duration-200 hover:bg-[#F8FAFC] font-medium text-sm"
                >
                  Sign up
                </Link>
              </>
            )}

            <Link
              href="/rider"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-xl bg-primary px-4 py-2.5 text-center font-semibold text-white text-sm shadow-[0_4px_12px_rgba(0,183,149,0.18)] hover:bg-primary-hover transition-colors duration-200"
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
