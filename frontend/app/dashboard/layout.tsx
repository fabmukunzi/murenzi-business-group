"use client";

import { AppSidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between md:justify-end bg-white px-6 py-4 shadow-sm">
            <SidebarTrigger className="lg:hidden" />

            <div className="flex justify-end items-end space-x-6">
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
  );
}
