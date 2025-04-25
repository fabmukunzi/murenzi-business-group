'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { icons } from '@/lib/icons';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { useGetSingleRentalQuery } from '@/store/actions/rental';
import { Label } from '@/components/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { format, isBefore, addDays } from 'date-fns';
import { useBookingRoomMutation } from '@/store/actions/booking';

export default function RentalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [bookRoom, { isLoading: isBooking }] = useBookingRoomMutation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { data, isLoading } = useGetSingleRentalQuery({
    roomId: params.rentalId as string,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Rental Not Found</h1>
        <Button onClick={() => router.push('/rentals')}>Back to Rentals</Button>
      </div>
    );
  }

  const room = data.data.room;
  const basePrice = room.price || 0;

  const isValidRange = checkIn && checkOut && isBefore(checkIn, checkOut);
  const totalNights = isValidRange
    ? Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const totalPrice = basePrice * totalNights;

  const handlePayment = async () => {
    if (!checkIn || !checkOut || !name || !email || !phoneNumber) {
      return alert('Please fill all fields and select valid dates.');
    }

    try {
      const payload = {
        name,
        email,
        phoneNumber,
        roomId: room.id,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        totalPrice,
      };

      const res = await bookRoom(payload).unwrap();
      router.push('/confirmation');
    } catch (err: any) {
      alert(err?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-14">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Button
          variant="ghost"
          className="mb-4 pl-0"
          onClick={() => router.push('/rentals')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Rentals
        </Button>
        <h1 className="text-3xl font-bold">{room.name}</h1>
        <p className="text-gray-600 flex items-center mt-1">
          <Image
            src={icons.locationPin}
            alt=""
            width={14}
            height={14}
            className="mr-1"
          />
          Kanombe, Kigali, Rwanda
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
              <Image
                src={room.images[selectedImage]}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {room.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`relative aspect-video cursor-pointer rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${room.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div>
          <Card className="md:col-span-2 p-5">
            <h2 className="md:text-xl text-lg font-bold">
              Luxury Room (${basePrice}/per night)
            </h2>

            <div className="flex gap-2 flex-col">
              <Input type="text" placeholder="Your Name" className="w-full mt-3" value={name} onChange={(e) => setName(e.target.value)} />
              <Input type="email" placeholder="Your Email" className="w-full mt-3" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input type="number" placeholder="Your phone number (will be used to pay)" className="w-full mt-3" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>

            <div className="flex gap-2 mt-4">
              <div className="w-full">
                <Label>Check-in</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      {checkIn ? format(checkIn, 'PPP') : 'Pick a date'}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => isBefore(date, new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-full">
                <Label>Check-out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      {checkOut ? format(checkOut, 'PPP') : 'Pick a date'}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) =>
                        isBefore(date, checkIn ? addDays(checkIn, 1) : new Date())
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <motion.div
              className="mt-3 p-3 border rounded-lg leading-8 bg-primary/20"
              animate={{ scale: 1 }}
              initial={{ scale: 0.9 }}
            >
              <p>Per Night: ${basePrice}</p>
              <p>Extras: $0</p>
              <p className="font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
            </motion.div>

            <Button className="mt-5 w-full" onClick={handlePayment} disabled={isBooking}>
              {isBooking ? 'Processing...' : 'Pay Now'}
            </Button>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">About this rental</h2>
        <p className="text-gray-700 leading-relaxed">{room.description}</p>
      </div>
    </div>
  );
}
