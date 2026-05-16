import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import LayoutClient from "./LayoutClient";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ZapShift – Fast & Reliable Parcel Delivery",
  description:
    "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.",

  icons: {
    icon: [{ url: "/logo.png", sizes: "32x32", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <LayoutClient>{children}</LayoutClient>
        </SessionProvider>
      </body>
    </html>
  );
}