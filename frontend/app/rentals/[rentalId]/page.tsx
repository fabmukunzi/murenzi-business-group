'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import Player from 'next-video/player';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const RoomTour =
  'https://res.cloudinary.com/dagurahkl/video/upload/v1742072373/room-tour_fmfdnt.mp4';

const images = [
  'https://a0.muscache.com/im/pictures/hosting/Hosting-1358734658884634267/original/d0e79b2c-5078-40f1-a98c-7c376c7001f6.jpeg?im_w=1200',
  'https://images.pexels.com/photos/28464720/pexels-photo-28464720/free-photo-of-modern-luxury-bedroom-interior-in-saligao-villa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://a0.muscache.com/im/pictures/hosting/Hosting-1358734658884634267/original/a7a5b09c-5650-498d-8357-7b2612e0079b.jpeg?im_w=1200',
  'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM1ODczNDY1ODg4NDYzNDI2Nw==/original/89c745ba-b49e-48bb-9379-2fef1ad9d416.jpeg?im_w=1200',
  'https://a0.muscache.com/im/pictures/hosting/Hosting-1358734658884634267/original/e999afce-5cf5-4801-be4f-ebf7f37bddfa.jpeg?im_w=1200',
];

export default function RentalPage() {
  const [mainImage, setMainImage] = useState(images[0]);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [extras, setExtras] = useState({ kitchen: false, toilet: false });
  const basePrice = 40;
  const extraCost = (extras.kitchen ? 10 : 0) + (extras.toilet ? 10 : 0);
  const totalPrice = basePrice + extraCost;

  return (
    <div className="md:mx-14 mx-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-3">
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
            <Image
              src={mainImage}
              alt="Main Room"
              width={800}
              height={500}
              className="w-full h-[25rem] object-cover rounded-lg"
            />
          </motion.div>
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {images.map((img, index) => (
              <motion.div key={index} whileTap={{ scale: 0.9 }}>
                <Image
                  src={img}
                  alt="Thumbnail"
                  width={80}
                  height={80}
                  className="w-16 h-16 object-cover cursor-pointer border rounded-md"
                  onClick={() => setMainImage(img)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <Card className="md:col-span-2 p-5">
          <h2 className="md:text-2xl text-xl font-bold">
            Luxury Room ({basePrice}$/per night)
          </h2>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded mt-3"
            />
            <Input
              type="text"
              placeholder="Your Email"
              className="w-full border p-2 rounded mt-3"
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Label>Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between"
                  >
                    {checkIn ? format(checkIn, 'PPP') : 'Pick a date'}
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => {
                      setCheckIn(date);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full">
              <Label>Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between"
                  >
                    {checkOut ? format(checkOut, 'PPP') : 'Pick a date'}
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => {
                      setCheckOut(date);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-1">
            <Checkbox
              checked={extras.kitchen}
              onCheckedChange={() =>
                setExtras({ ...extras, kitchen: !extras.kitchen })
              }
            />{' '}
            Private Kitchen (+$10)
          </div>
          <div className="mt-1">
            <Checkbox
              checked={extras.toilet}
              onCheckedChange={() =>
                setExtras({ ...extras, toilet: !extras.toilet })
              }
            />{' '}
            Private Toilet (+$10)
          </div>

          <motion.div
            className="mt-3 p-3 border rounded-lg leading-10 bg-primary/20"
            animate={{ scale: 1 }}
            initial={{ scale: 0.9 }}
          >
            <p>Per Night: ${basePrice}</p>
            <p>Extras: ${extraCost}</p>
            <p className="font-bold">Total Price: ${totalPrice}</p>
          </motion.div>
          <Button className="mt-5 w-full">Pay Now</Button>
        </Card>
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-semibold">Description</h3>
        <p>
          Located in the heart of Kigali, this modern apartment offers a perfect
          blend of comfort, style, and convenience. Designed with a contemporary
          touch, it features spacious living areas, high-end finishes, and
          stunning views of the city. Ideal for both short-term and long-term
          stays, this apartment caters to digital nomads, professionals, or
          anyone seeking a stylish yet affordable living space. With easy access
          to key amenities and vibrant neighborhoods, it’s the perfect place to
          call home while enjoying the best that Kigali has to offer.
        </p>
      </div>

      <div className="mt-5">
        <Player
          src={RoomTour}
          controls
          className="w-full rounded-lg object-cover bg-none"
          style={{ clipPath: 'inset(0 round 15px)' }}
        />
      </div>
    </div>
  );
}
