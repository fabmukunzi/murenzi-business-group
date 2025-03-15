'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { SaunaImg1 } from '@/lib/images';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { format } from 'date-fns';

const SaunaMassage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>('');
  const pricePerPerson = 20;
  const totalPrice = guests * pricePerPerson;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row justify-center gap-10 mx-6 md:mx-14 items-center my-16 md:my-32"
    >
      <div className="w-full md:w-[55%]">
        <p className="text-primary">Sauna massage</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 mt-2">
          Book a <span className="text-primary">sauna massage</span> session
        </h2>

        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Relax Your Body and Mind
          </h2>
          <p className="text-gray-700 mt-2 text-sm sm:text-base">
            Take a break from your busy day and enjoy a soothing sauna massage.
            The warm steam helps relax your muscles, improve blood flow, and
            release stress. Our trained therapists ensure your comfort and
            relaxation.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
            A Peaceful and Comfortable Space
          </h2>
          <p className="text-gray-700 mt-2 text-sm sm:text-base">
            Step into a calm and cozy environment designed for your relaxation.
            The soft music, gentle lighting, and natural oils create the perfect
            setting for deep relaxation. Whether you want a quick massage or a
            full sauna session, we have the right option for you.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Book Your Session Today
          </h2>
          <p className="text-gray-700 mt-2 text-sm sm:text-base">
            Give yourself the care you deserve! Booking a session is easy, and
            our friendly team is ready to help. Reserve your spot now and enjoy
            a moment of pure comfort and peace.
          </p>
        </div>

        <Button
          className="mt-8 h-12 w-full sm:w-auto"
          onClick={() => setIsOpen(true)}
        >
          Book session now
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-[50%]"
      >
        <Image
          src={SaunaImg1}
          alt="Sauna massage Image"
          className="object-cover h-80 w-full rounded-2xl"
        />
        <div className="flex gap-3 flex-wrap mt-5 justify-center">
          <Image
            src={SaunaImg1}
            alt="Sauna massage Image"
            className="object-cover md:h-40 h-20 md:w-44 w-24 rounded-2xl"
          />
          <Image
            src={SaunaImg1}
            alt="Sauna massage Image"
            className="object-cover md:h-40 h-20 md:w-44 w-24 rounded-2xl"
          />
          <Image
            src={SaunaImg1}
            alt="Sauna massage Image"
            className="object-cover md:h-40 h-20 md:w-44 w-24 rounded-2xl"
          />
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Book Your Sauna Session</DialogTitle>
            <DialogDescription>
              Fill in your details to reserve your session.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </div>

            <div>
              <Label>Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full font-normal">
                    {date ? format(date, 'PPP') : 'Select Date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Preferred Time</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full font-normal">
                    {time || 'Select Time'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="grid grid-cols-3 gap-2 p-2">
                    {[
                      '10:00 AM',
                      '11:00 AM',
                      '12:00 PM',
                      '1:00 PM',
                      '2:00 PM',
                      '3:00 PM',
                      '4:00 PM',
                      '5:00 PM',
                    ].map((t) => (
                      <Button
                        key={t}
                        variant="ghost"
                        onClick={() => setTime(t)}
                        className="text-sm"
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-semibold">Total Price:</p>
            <p className="text-xl font-bold text-primary">${totalPrice}</p>
          </div>
          <p className="text-gray-600 text-sm">($20 per person)</p>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button>Confirm Booking</Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default SaunaMassage;
