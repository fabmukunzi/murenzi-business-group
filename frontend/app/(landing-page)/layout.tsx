import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import '@/app/globals.css';
import HeaderComponent from '@/components/common/header';
import FooterComponent from '@/components/common/footer';
import { logoImage } from '@/lib/images';

const rubik = Rubik({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Disapora Lounge',
  description: 'Find your favourable apartment, food and sauna massage',
  icons: {
    icon: [{ url: logoImage.src, type: 'image/png' }],
    apple: [{ url: logoImage.src, type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
        <HeaderComponent />
        <main className="my-10">{children}</main>
        <FooterComponent />
      </body>
    </html>
  );
}
