'use client';
import React, { FC } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { icons } from '@/lib/icons';
import Link from 'next/link';
import { homepageRoutes } from '@/lib/routes';
import { IRoom } from '@/lib/types/room';
import formatNumber from '@/lib/functions/format-number';

const CardApartment: FC<{ room: IRoom }> = ({ room }) => {
  return (
    <Link href={homepageRoutes.rentals.path + `/${room.id}`}>
      <Card className="w-80 sm:max-w-[380px] p-2">
        <CardContent
          className="p-0 h-56 rounded-lg bg-cover bg-center relative"
          style={{ backgroundImage: `url(${room.images[0]})` }}
        ></CardContent>

        <CardFooter className="p-2">
          <div className="w-full space-y-2">
            <div className="w-full flex-wrap gap-2">
              <div className="flex justify-between">
                <p className="text-gray-500 text-sm">{room.name}</p>
                <p className="text-primary font-bold text-base">
                  {formatNumber(room.price)} RWF
                  <span className="text-gray-500 font-medium text-sm">
                    /night
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 my-2">
                <Image src={icons.locationPin} alt="" width={14} height={14} />
                <span className="text-black text-sm">
                  Kanombe, Kigali, Rwanda
                </span>
              </div>
            </div>

            <div className="flex justify-between w-full flex-wrap gap-2">
              <div className="flex items-center gap-1">
                <Image src={icons.parkSlot} alt="" width={16} height={16} />
                <span className="text-black text-sm">
                  {room.parkingSpace} Parking Slots
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Image src={icons.squareMeter} alt="" width={16} height={16} />
                <span className="text-black text-sm flex">
                  {room.size}
                  <span className="flex">
                    m<span className="text-[8px]">2</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CardApartment;
