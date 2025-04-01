"use client";
import '@/app/globals.css';
import { SessionProvider } from "next-auth/react";
import { Rubik } from 'next/font/google';

const rubik = Rubik({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${rubik.className} antialiased`}>{children}</body>
      </html>
    </SessionProvider>
  );
}
