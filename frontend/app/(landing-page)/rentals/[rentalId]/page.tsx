'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { icons } from '@/lib/icons';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { useGetSingleRentalQuery } from '@/store/actions/rental';

export default function RentalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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
        <h1 className="text-3xl font-bold">{data?.data?.room.name}</h1>
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
                src={data?.data?.room.images[selectedImage]}
                alt={data?.data?.room.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {data?.data?.room?.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`relative aspect-video cursor-pointer rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${data?.data?.room.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <div className="mb-6">
                <p className="text-3xl font-bold text-primary">
                  ${data?.data?.room.price}
                  <span className="text-sm font-normal text-gray-500">
                    /night
                  </span>
                </p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image src={icons.parkSlot} alt="" width={20} height={20} />
                    <span>{data?.data?.room.parkingSpace} Parking</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Image
                    src={icons.squareMeter}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span className="flex items-center">
                    {data?.data?.room.size} m<span className="text-[10px]">2</span>
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              <Button className="w-full bg-primary hover:bg-primary/90">
                Book Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">About this rental</h2>
        <p className="text-gray-700 leading-relaxed">{data?.data?.room?.description}</p>
      </div>
    </div>
  );
}
