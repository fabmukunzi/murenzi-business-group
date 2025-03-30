import { AppSidebar } from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import '@/app/globals.css';

const rubik = Rubik({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Murenzi Guest House',
  description: 'Find your favourable apartment, booth and sauna massage',
};
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
        <main className={`text-primary overflow-hidden`}>
          <div className="flex h-screen">
            <SidebarProvider>
              <AppSidebar />
              <div className="flex flex-col flex-1">
                <header className="flex items-center justify-end bg-white px-6 py-4 shadow-sm">
                  <SidebarTrigger className="lg:hidden" />

                  <div className="flex justify-end items-end space-x-6">
                    <Button className="w-5 h-5 bg-secondary_bg hover:bg-slate-100 transition-all relative p-5 rounded-full">
                      <Bell className="text-gray-500 hover:text-primary" />
                    </Button>

                    <div className="flex items-center space-x-3">
                      <Image
                        src="https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </header>

                <main className="p-4 flex-1 overflow-y-auto bg-secondary_bg">
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </div>
        </main>
      </body>
    </html>
  );
};

export default DashboardLayout;
