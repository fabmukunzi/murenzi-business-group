"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { icons } from "@/lib/icons";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface Rental {
  id: number;
  name: string;
  pricePerNight: number;
  location: string;
  bedrooms: number;
  parkingSlots: number;
  area: string;
  description: string;
  images: string[];
}

// Mock data for testing - replace with API call
const mockRentals: Rental[] = [
  {
    id: 1,
    name: "Luxury Apartment",
    pricePerNight: 150,
    location: "Kacyiru, Kigali, Rwanda",
    bedrooms: 2,
    parkingSlots: 1,
    area: "6x7",
    description:
      "Beautiful apartment in the heart of the city. This luxurious apartment offers modern amenities, stunning views, and a convenient location. Perfect for both short and long stays, with easy access to restaurants, shopping centers, and tourist attractions.",
    images: [
      "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg",
      "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg",
      "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg",
    ],
  },
  {
    id: 2,
    name: "Modern Studio",
    pricePerNight: 100,
    location: "Kimihurura, Kigali, Rwanda",
    bedrooms: 1,
    parkingSlots: 1,
    area: "5x6",
    description:
      "Cozy studio with modern amenities. Ideal for solo travelers or couples, this studio offers a comfortable and convenient stay in a prime location.",
    images: [
      "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg",
      "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg",
      "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg",
    ],
  },
];

export default function RentalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [rental, setRental] = useState<Rental | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // In a real app, you would fetch the rental details from an API
    // For now, we'll use mock data
    const rentalId = Number(params.rentalId);
    const foundRental = mockRentals.find((r) => r.id === rentalId);

    if (foundRental) {
      setRental(foundRental);
    }

    setLoading(false);
  }, [params.rentalId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!rental) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Rental Not Found</h1>
        <Button onClick={() => router.push("/rentals")}>Back to Rentals</Button>
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
          onClick={() => router.push("/rentals")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Rentals
        </Button>
        <h1 className="text-3xl font-bold">{rental.name}</h1>
        <p className="text-gray-600 flex items-center mt-1">
          <Image
            src={icons.locationPin}
            alt=""
            width={14}
            height={14}
            className="mr-1"
          />
          {rental.location}
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
                src={rental.images[selectedImage]}
                alt={rental.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {rental.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`relative aspect-video cursor-pointer rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${rental.name} ${index + 1}`}
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
                  ${rental.pricePerNight}
                  <span className="text-sm font-normal text-gray-500">
                    /night
                  </span>
                </p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image src={icons.bed} alt="" width={20} height={20} />
                    <span>{rental.bedrooms} Bedroom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={icons.parkSlot} alt="" width={20} height={20} />
                    <span>{rental.parkingSlots} Parking</span>
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
                    {rental.area} m<span className="text-[10px]">2</span>
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
        <p className="text-gray-700 leading-relaxed">{rental.description}</p>
      </div>
    </div>
  );
}
