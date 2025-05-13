'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { dashboardRoutes, homepageRoutes } from '@/lib/routes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  Footprints,
  Newspaper,
  UtensilsCrossed,
} from 'lucide-react';
import { logoImage } from '@/lib/images';

const items = [
  // {
  //   title: dashboardRoutes.analytics.label,
  //   url: dashboardRoutes.analytics.path,
  //   icon: HomeIcon,
  // },
  {
    title: dashboardRoutes.rentals.label,
    url: dashboardRoutes.rentals.path,
    icon: Building2,
  },
  {
    title: dashboardRoutes.restuarant.label,
    url: dashboardRoutes.restuarant.path,
    icon: UtensilsCrossed,
  },
  {
    title: dashboardRoutes.saunaMassage.label,
    url: dashboardRoutes.saunaMassage.path,
    icon: Footprints,
  },
  {
    title: dashboardRoutes.transactions.label,
    url: dashboardRoutes.transactions.path,
    icon: Newspaper,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState(() => {
    const matchingItem = items.find(
      (item) =>
        pathname.startsWith(item.url) &&
        item.url !== dashboardRoutes.analytics.path
    );
    return matchingItem?.title || items[0].title;
  });

  useEffect(() => {
    const matchingItem = items.find(
      (item) =>
        pathname.startsWith(item.url) &&
        item.url !== dashboardRoutes.analytics.path
    );
    setSelectedItem(matchingItem?.title || items[0].title);
  }, [pathname]);

  return (
    <>
      <Sidebar>
        <SidebarContent className="bg-primary h-full flex flex-col justify-between">
          <SidebarGroup>
            <SidebarGroupLabel className="my-16 mx-auto">
              <Link href={homepageRoutes.home.path}>
                <Image
                  src={logoImage}
                  className="h-32 w-32 rounded-full"
                  alt="Diaspora Lounge Logo"
                />
              </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => {
                  return (
                    <SidebarMenuItem
                      key={index}
                      className={`rounded group py-0 my-1 ${
                        selectedItem === item.title
                          ? 'bg-white text-primary'
                          : 'hover:bg-white hover:text-primary text-white'
                      }`}
                      onClick={() => {
                        setSelectedItem(item.title);
                      }}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center space-x-2 h-11 px-3"
                      >
                        <item.icon className="!h-5 !w-5 transition-colors duration-200" />
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
