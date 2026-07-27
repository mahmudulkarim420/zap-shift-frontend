import Link from 'next/link';
import { Linkedin, Facebook, Youtube } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/coverage", label: "Coverage" },
  { href: "/about", label: "About Us" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", className: "bg-white/10 text-white border border-white/10 hover:bg-white/20" },
  { icon: FaXTwitter, label: "X (Twitter)", className: "bg-white text-[#1F2937] hover:bg-white/90" },
  { icon: Facebook, label: "Facebook", className: "bg-[#1877F2] text-white hover:brightness-110" },
  { icon: Youtube, label: "YouTube", className: "bg-[#FF0000] text-white hover:brightness-110" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-gradient-to-b from-[#1F2937] to-[#111827] px-5 py-10 text-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)] mb-5 sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent/6 blur-3xl" />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,183,149,0.2)]">
            <span className="text-white font-black text-xl italic">Z</span>
          </div>
          <span className="text-3xl font-black tracking-tighter text-white">
            Zap<span className="text-primary">Shift</span>
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        {/* Divider */}
        <div className="my-6 border-t border-dashed border-white/10" />

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-dashed border-white/10" />

        {/* Social Icons */}
        <div className="flex justify-center gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className={`p-2.5 rounded-full transition-all duration-200 hover:scale-105 ${social.className}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} ZapShift. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
