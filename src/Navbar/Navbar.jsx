"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowRight, FaBars, FaTimes, FaUser, FaChartPie, FaSignOutAlt } from "react-icons/fa";
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
      ? "bg-primary text-secondary font-semibold px-4 py-2 rounded-xl shadow-[0_10px_25px_rgba(184,244,93,0.25)]"
      : "text-slate-600 hover:text-secondary px-4 py-2 transition";

  const mobileLinkClass = (path) =>
    isActive(path)
      ? "bg-primary text-secondary font-semibold px-4 py-3 rounded-xl block shadow-[0_10px_25px_rgba(184,244,93,0.2)]"
      : "text-slate-600 hover:text-secondary hover:bg-slate-50 px-4 py-3 rounded-xl block transition";

  const navItems = [
    { href: "/services", label: "Services" },
    { href: "/coverage", label: "Coverage" },
    { href: "/about", label: "About Us" },
    { href: "/pricing", label: "Pricing" },
  ];

  if (!isLoaded) return (
    <nav className="mt-5 rounded-[1.5rem] border border-border/70 bg-white/80 px-5 py-3 shadow-[0_18px_55px_-35px_rgba(8,60,64,0.45)] backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="text-secondary font-black text-lg italic">Z</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-secondary">
            Zap<span className="text-primary">Shift</span>
          </h1>
        </Link>
        <div className="animate-pulse bg-slate-100 h-10 w-24 rounded-xl"></div>
      </div>
    </nav>
  );

  return (
    <nav className="mt-5 rounded-[1.5rem] border border-border/70 bg-white/80 px-5 py-3 shadow-[0_18px_55px_-35px_rgba(8,60,64,0.45)] backdrop-blur-xl relative z-50">
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
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="relative group">
                {/* Profile Icon / Bubble */}
                <button 
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-black text-sm border-2 border-primary/20 shadow-[0_10px_25px_rgba(8,60,64,0.22)] group-hover:border-primary transition cursor-pointer overflow-hidden"
                >
                  {user?.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </button>

                {/* Dropdown Menu (Hover Triggered) */}
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-48">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/60 p-2 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Welcome</p>
                      <p className="text-sm font-extrabold text-secondary truncate">{user?.name || 'User'}</p>
                    </div>
                    
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-primary/10 hover:text-secondary rounded-xl transition-all"
                    >
                      <FaChartPie className="text-primary" />
                      Dashboard
                    </Link>
                    
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-primary/10 hover:text-secondary rounded-xl transition-all"
                    >
                      <FaUser className="text-primary" />
                      Profile
                    </Link>

                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all text-left mt-1"
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-xl border border-border bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-white hover:text-secondary uppercase tracking-widest"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-xl border border-border bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-white hover:text-secondary uppercase tracking-widest"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <Link
            href="/rider"
            className="rounded-xl bg-primary px-4 py-2 font-semibold text-secondary shadow-[0_12px_30px_rgba(184,244,93,0.28)]"
          >
            Be a Rider
          </Link>

          <div className="-rotate-45 rounded-full bg-secondary p-3 text-primary shadow-[0_12px_25px_rgba(8,60,64,0.2)]">
            <FaArrowRight />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-3 rounded-2xl border border-border/60 bg-white/95 backdrop-blur-xl p-4 shadow lg:hidden">
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
              <div className="flex items-center justify-between px-4 py-2 border-t border-border pt-4">
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</span>
                   <span className="text-sm font-extrabold text-secondary">{user?.name || 'User'}</span>
                </div>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-black text-sm border-2 border-primary/20"
                >
                  {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl border border-border px-4 py-2 text-center text-slate-500 transition hover:bg-slate-50 font-bold uppercase text-xs tracking-widest"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-xl border border-border px-4 py-2 text-center text-slate-500 transition hover:bg-slate-50 font-bold uppercase text-xs tracking-widest"
                >
                  Sign Up
                </Link>
              </>
            )}

            <Link
              href="/rider"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-xl bg-primary px-4 py-2 text-center font-semibold text-secondary shadow"
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
