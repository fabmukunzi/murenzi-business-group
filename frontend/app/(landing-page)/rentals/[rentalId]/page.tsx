'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { icons } from '@/lib/icons';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGetSingleRentalQuery } from '@/store/actions/rental';
import { Label } from '@/components/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { format, isBefore, addDays } from 'date-fns';
import { useBookingRoomMutation } from '@/store/actions/booking';
import { handleError } from '@/lib/functions/handle-error';
import { BookingResponse } from '@/lib/types/room';
import Loader from '@/components/common/loader';
import { formatMoney } from '@/lib/functions/format-number';
import { Badge } from '@/components/ui/badge';

export default function RentalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phoneNumber?: string;
    checkIn?: string;
    checkOut?: string;
  }>({});

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

  const bookedRanges = data?.data?.bookings?.map(booking => ({
    start: new Date(booking.checkIn),
    end: new Date(booking.checkOut)
  })) || [];

  const isDateBooked = (date: Date) => {
    return bookedRanges.some(range =>
      date >= range.start && date <= range.end
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader loading={isLoading} />
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
  const bookings = data?.data?.bookings || [];

  const isValidRange = checkIn && checkOut && isBefore(checkIn, checkOut);
  const totalNights = isValidRange
    ? Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const totalPrice = basePrice * totalNights;

  const handlePayment = async () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!/^2507\d{8}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number format: 2507********.';
    }

    if (!checkIn) {
      newErrors.checkIn = 'Check-in date is required.';
    }

    if (!checkOut) {
      newErrors.checkOut = 'Check-out date is required.';
    } else if (checkIn && isBefore(checkOut, checkIn)) {
      newErrors.checkOut = 'Check-out must be after check-in.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        roomId: room.id,
        checkIn: checkIn ? checkIn.toISOString() : '',
        checkOut: checkOut ? checkOut.toISOString() : '',
        totalPrice,
      };
      const res: BookingResponse = await bookRoom(payload).unwrap();
      if (res?.status === "Pending") {
        router.push(`/confirm/${res.transactionId}`);
      }
    } catch (err) {
      handleError(err);
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
        <div>
          <h1 className="text-3xl font-bold">{room.name}</h1>
        </div>
        <div className="text-gray-600 flex items-center mt-1">
          <Image
            src={icons.locationPin}
            alt=""
            width={14}
            height={14}
            className="mr-1"
          />
          <p>{room.location || 'Kanombe, Kigali, Rwanda'}</p>
        </div>
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
            <h2 className="text-lg font-bold">
              {room.name} (RWF {formatMoney(basePrice)}/per night)
            </h2>

            <div className="flex gap-2 flex-col">
              <Input type="text"
                placeholder="Your Name"
                className="w-full mt-3"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                onBlur={() => {
                  if (!name.trim()) {
                    setErrors((prev) => ({ ...prev, name: 'Name is required.' }));
                  }
                }}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              <Input type="email"
                placeholder="Your Email"
                className="w-full mt-3"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                onBlur={() => {
                  if (!email.trim()) {
                    setErrors((prev) => ({ ...prev, email: 'Email is required.' }));
                  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setErrors((prev) => ({ ...prev, email: 'Invalid email format.' }));
                  }
                }}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              <Input type="number"
                placeholder="2507********"
                className="w-full mt-3" value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                }}
                onBlur={() => {
                  if (!phoneNumber.trim()) {
                    setErrors((prev) => ({ ...prev, phoneNumber: 'Phone number is required.' }));
                  } else if (!/^\d{10,15}$/.test(phoneNumber)) {
                    setErrors((prev) => ({ ...prev, phoneNumber: 'Phone number must be 10–15 digits.' }));
                  }
                }}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
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
                      disabled={(date) =>
                        isBefore(date, new Date()) ||
                        isDateBooked(date)
                      }
                    />
                  </PopoverContent>
                </Popover>
                {errors.checkIn && <p className="text-red-500 text-sm">{errors.checkIn}</p>}
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
                        isBefore(date, checkIn ? addDays(checkIn, 1) : new Date()) ||
                        isDateBooked(date)
                      }
                    />
                  </PopoverContent>
                </Popover>
                {errors.checkOut && <p className="text-red-500 text-sm">{errors.checkOut}</p>}
              </div>
            </div>

            <motion.div
              className="mt-3 p-3 border rounded-lg leading-8 bg-primary/20"
              animate={{ scale: 1 }}
              initial={{ scale: 0.9 }}
            >
              <p>Per Night: RWF {formatMoney(basePrice)}</p>
              <p className="font-bold">Total Price: RWF {formatMoney(parseInt(totalPrice.toFixed(2)))}</p>
            </motion.div>

            <Button
              className="w-full mt-5"
              onClick={handlePayment}
              disabled={isBooking}
            >
              {isBooking ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        {bookings.length > 0 && (
          <div className="mb-8 border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <CalendarIcon className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                Booked Date Ranges
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              This rental is unavailable during the following periods:
            </p>
            <div className="flex flex-wrap gap-2">
              {bookings.map((booking, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1 bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                >
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {format(new Date(booking.checkIn), 'MMM dd')} – {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-4">About this rental</h2>
        <p className="text-gray-700 leading-relaxed">{room.description}</p>
      </div>
    </div>
  );
}