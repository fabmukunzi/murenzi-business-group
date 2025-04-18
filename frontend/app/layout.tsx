import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "@/app/globals.css";

const rubik = Rubik({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Murenzi Guest House",
  description: "Find your favourable apartment, booth and sauna massage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>{children}</body>
    </html>
  );
}
