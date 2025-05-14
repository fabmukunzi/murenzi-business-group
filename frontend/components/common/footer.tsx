import React from 'react';
import LogoComponent from '@/components/common/logo';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import ContactUs from '../landing-page/ContactUs';
import { homepageRoutes } from '@/lib/routes';

const FooterComponent = () => {
  return (
    <footer>
      <ContactUs />
      <div className='flex flex-col md:flex-row w-full px-6 md:px-14 py-6 gap-6 md:gap-12'>
        <div className='flex-1'>
          <LogoComponent className='!text-3xl' />
          <p className='mt-3 text-sm md:text-base'>
            Murenzi Apartment is your trusted platform for finding and renting
            apartments effortlessly. With a wide selection of listings, we make it
            easy to discover the perfect home. Our user-friendly interface offers
            a seamless experience, from browsing to signing the lease, ensuring
            you find the right rental with ease. Start your search with Murenzi
            Apartment today!
          </p>
          <div className='flex gap-3 mt-3'>
            <Link href='#' className='border rounded-full p-1.5 border-black hover:bg-black hover:text-white transition'>
              <Instagram size={17} />
            </Link>
            <Link href='#' className='border rounded-full p-1.5 border-black hover:bg-black hover:text-white transition'>
              <Twitter size={17} />
            </Link>
            <Link href='#' className='border rounded-full p-1.5 border-black hover:bg-black hover:text-white transition'>
              <Facebook size={16} />
            </Link>
          </div>
        </div>
        <div className='w-full md:w-[20%]'>
          <h3 className='font-semibold text-black'>Help</h3>
          <ul className='mt-2 space-y-2 text-sm'>
            <li>
              <Link href='#contact' className='hover:underline'>Contact Us</Link>
            </li>
            <li>
              <Link href='#' className='hover:underline'>Terms & Conditions</Link>
            </li>
            <li>
              <Link href='#' className='hover:underline'>Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className='w-full md:w-[20%]'>
          <h3 className='font-semibold text-black'>Useful Links</h3>
          <ul className='mt-2 space-y-2 text-sm'>
            <li>
              <Link href='#' className='hover:underline'>Airbnb</Link>
            </li>
            <li>
              <Link href='#' className='hover:underline'>Booking</Link>
            </li>
            <li>
              <Link href={homepageRoutes.rentals.path} className='hover:underline'>Book Now</Link>
            </li>
          </ul>
        </div>

      </div>
      <div className='md:px-14 px-5 text-black/70 my-'>&copy; {new Date().getFullYear()} Murenzi Apartment. All rights reserved</div>
    </footer>
  );
};

export default FooterComponent;