"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { icons } from "@/lib/icons";


// Temporary mock data - replace with actual data from your backend
const mockRentals = [
  {
    id: 1,
    name: "Luxury Apartment",
    pricePerNight: 150,
    location: "Kacyiru, Kigali, Rwanda",
    bedrooms: 2,
    parkingSlots: 1,
    area: "6x7",
    description: "Beautiful apartment in the heart of the city",
    image:
      "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg",
  },
  {
    id: 2,
    name: "Modern Studio",
    pricePerNight: 100,
    location: "Kimihurura, Kigali, Rwanda",
    bedrooms: 1,
    parkingSlots: 1,
    area: "5x6",
    description: "Cozy studio with modern amenities",
    image:
      "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg",
  },
  {
    id: 3,
    name: "Deluxe Villa",
    pricePerNight: 200,
    location: "Nyarutarama, Kigali, Rwanda",
    bedrooms: 3,
    parkingSlots: 2,
    area: "8x10",
    description: "Spacious villa with garden and pool",
    image:
      "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg",
  },
];

export default function RentalsPage() {
  const router = useRouter();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Rentals</h1>
          <p className="text-gray-500 mt-1">Manage your rental properties</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 flex gap-2 items-center"
          onClick={() => router.push("/dashboard/rentals/new")}
        >
          <Plus size={16} />
          <span>New Rental</span>
        </Button>
      </motion.div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRentals.map((rental) => (
          <motion.div
            key={rental.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full sm:max-w-[380px] p-2">
              <CardContent
                className="p-0 h-56 rounded-lg bg-cover bg-center relative"
                style={{ backgroundImage: `url(${rental.image})` }}
              ></CardContent>

              <CardFooter className="p-2">
                <div className="w-full space-y-2">
                  <div className="flex justify-between w-full flex-wrap gap-2">
                    <div>
                      <p className="text-primary font-bold text-lg">
                        ${rental.pricePerNight}{" "}
                        <span className="text-gray-500 font-medium text-sm">
                          /night
                        </span>
                      </p>
                      <p className="text-gray-500 text-sm">{rental.name}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src={icons.locationPin}
                        alt=""
                        width={14}
                        height={14}
                      />
                      <span className="text-black text-sm">
                        {rental.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between w-full flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      <Image src={icons.bed} alt="" width={16} height={16} />
                      <span className="text-black text-sm">
                        {rental.bedrooms} Bedroom
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src={icons.parkSlot}
                        alt=""
                        width={16}
                        height={16}
                      />
                      <span className="text-black text-sm">
                        {rental.parkingSlots} Parking Slot
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src={icons.squareMeter}
                        alt=""
                        width={16}
                        height={16}
                      />
                      <span className="text-black text-sm flex">
                        {rental.area}{" "}
                        <span className="flex">
                          m<span className="text-[8px]">2</span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
