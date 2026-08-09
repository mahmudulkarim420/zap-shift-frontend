"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wrench,
  Compass,
  Info,
  Tag,
  Zap,
  ArrowRight,
  User,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isLoaded = status !== "loading";
  const isSignedIn = status === "authenticated";
  const user = session?.user;

  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const desktopLinkClass = (path) =>
    isActive(path)
      ? "bg-primary text-white font-medium px-4 py-2 rounded-xl shadow-[0_4px_12px_rgba(0,183,149,0.18)] text-sm"
      : "text-[#6B7280] hover:text-[#1F2937] px-4 py-2 rounded-xl transition-colors duration-200 text-sm font-medium";

  // Core navigation items (shared across desktop & mobile)
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/services", label: "Services", icon: Wrench },
    { href: "/coverage", label: "Coverage", icon: Compass },
    { href: "/about", label: "About Us", icon: Info },
    { href: "/pricing", label: "Pricing", icon: Tag },
  ];

  if (!isLoaded) {
    return (
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
  }

  return (
    <>
      {/* ======================================================== */}
      {/* Top Navbar Header (Desktop + Mobile Header)              */}
      {/* ======================================================== */}
      <nav className="mt-4 sm:mt-5 rounded-2xl border border-[#E5E7EB] bg-white/90 px-4 sm:px-5 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.08)] backdrop-blur-xl relative z-40">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-black text-lg italic">Z</span>
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1F2937]">
              Zap<span className="text-primary">Shift</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={desktopLinkClass(item.href)}>
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
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.name?.charAt(0)?.toUpperCase() ||
                    user?.email?.charAt(0)?.toUpperCase() ||
                    "U"
                  )}
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 w-52">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-2 overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#F3F4F6] mb-1">
                      <p className="text-[11px] font-semibold text-[#9CA3AF] tracking-wide">
                        Welcome back
                      </p>
                      <p className="text-sm font-bold text-[#1F2937] truncate mt-0.5">
                        {user?.name || "User"}
                      </p>
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
                      onClick={() => signOut({ callbackUrl: "/" })}
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

          {/* Mobile Top Header Right Quick Profile/Sign In */}
          <div className="flex items-center gap-2 lg:hidden">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-bold"
              >
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] overflow-hidden">
                  {user?.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>
                <span className="truncate max-w-[70px] sm:max-w-[100px]">{user?.name?.split(" ")[0] || "Account"}</span>
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="px-3 py-1.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition shadow-[0_2px_8px_rgba(0,183,149,0.2)]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ======================================================== */}
      {/* Mobile Bottom Responsive Tab Bar                         */}
      {/* ======================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#E5E7EB] shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-1.5 sm:px-3 pt-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] lg:hidden">
        <div className="flex items-center justify-between max-w-lg mx-auto gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 min-w-0 flex flex-col items-center justify-center transition-all duration-200 py-1 px-0.5 rounded-xl ${
                  active
                    ? "bg-primary/10 text-primary font-bold shadow-xs"
                    : "text-[#6B7280] hover:text-[#1F2937] active:bg-gray-50 font-medium"
                }`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 shrink-0 ${
                    active ? "scale-110 stroke-[2.4] text-primary" : "stroke-[1.8] text-[#6B7280]"
                  }`}
                />
                <span
                  className={`text-[9.5px] sm:text-[10.5px] mt-1 leading-none tracking-tight truncate max-w-full text-center ${
                    active ? "font-bold text-primary" : "text-[#6B7280]"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Action "Be a Rider" / "Dashboard" Button (Responsive Pill) */}
          <Link
            href={isSignedIn ? "/dashboard" : "/rider"}
            className="flex items-center justify-center gap-1 bg-primary hover:bg-primary-hover active:scale-95 text-white font-extrabold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full shadow-[0_3px_12px_rgba(0,183,149,0.35)] text-[11px] sm:text-xs transition-all duration-200 shrink-0 ml-0.5"
          >
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white shrink-0" />
            <span className="font-bold tracking-wide whitespace-nowrap">
              {isSignedIn ? "Dashboard" : "Rider"}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
