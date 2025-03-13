'use client';

import { Fragment, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { routes } from '@/lib/routes';
import LogoComponent from './logo';

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navbarItems = [
    { name: routes.home.label, path: routes.home.path },
    {
      name: routes.rentals.label,
      path: routes.rentals.path,
    },
    {
      name: routes.booth.label,
      path: routes.booth.path,
    },
    { name: routes.saunaMassage.label, path: routes.saunaMassage.path },
    { name: routes.contact.label, path: routes.contact.path },
  ];

  return (
    <Fragment>
      <header className="w-full fixed top-0 left-0 bg-white py-3 z-50">
        <div className="mx-auto flex items-center justify-between md:px-6 lg:px-14 2xl:px-20 py-4">
          <div className="flex items-center ml-5">
            <LogoComponent />
          </div>

          <nav className="hidden lg:flex flex-1 justify-center space-x-14">
            {navbarItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <a
                  key={index}
                  href={item.path}
                  className={`transition-colors ${
                    isActive ? 'text-primary underline underline-offset-8' : 'text-black hover:text-primary'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button>
              Book Now
            </Button>
          </div>

          <div className="block lg:hidden">
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black focus:outline-none border p-2 rounded-md mr-4"
            >
              {isMenuOpen ? (
                <X size={24} className="text-primary" />
              ) : (
                <Menu className="text-primary" size={24} />
              )}
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'lg:hidden bg-white shadow-lg overflow-hidden transition-all duration-500 ease-in-out',
            {
              'max-h-screen opacity-100': isMenuOpen,
              'max-h-0 opacity-0': !isMenuOpen,
            }
          )}
        >
          <nav className="flex flex-col space-y-4 px-6 py-4">
            {navbarItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <a
                  key={index}
                  href={item.path}
                  className={`font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-black hover:text-primary'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>
          <div className="px-6 pb-4">
            <Button>Book Now</Button>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default HeaderComponent;
