'use client'

// import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "@/app/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster }  from "sonner";
import { Suspense } from "react";

const rubik = Rubik({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Murenzi Guest House",
//   description: "Find your favourable apartment, booth and sauna massage",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
        <Provider store={store}>
        <Suspense>
          <Toaster richColors />
          {children}
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
