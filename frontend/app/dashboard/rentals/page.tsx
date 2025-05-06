"use client";

import { motion } from "framer-motion";
import { PenLine, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { icons } from "@/lib/icons";
import { useDeleteRentalMutation, useGetRentalsQuery } from "@/store/actions/rental";
import Loader from "@/components/common/loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { handleError } from "@/lib/functions/handle-error";
import { noImageUrl } from "@/lib/data";




export default function RentalsPage() {
  const router = useRouter();
  const { data: rentals, isLoading } = useGetRentalsQuery();
  const [deleteRental] = useDeleteRentalMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader loading={isLoading} />
      </div>
    );
  }

  const handleDeleteRental = async (roomId: string) => {
    try {
      await deleteRental({ roomId: roomId }).unwrap();
      console.log('Rental deleted');
    } catch (err) {
      console.error('Failed to delete rental:', err);
      handleError(err);
    }
  };


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
        {rentals?.data.rooms.map((rental) => (
          <motion.div
            key={rental.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full sm:max-w-[380px] p-2">
              <CardContent
                className="p-0 h-34 rounded-lg bg-cover bg-center relative"
                style={{ backgroundImage: `url(${rental.images.length > 0 ? rental.images[0] : noImageUrl})` }}
              >
                <div className="flex justify-end gap-2 p-2">
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-white/90"
                    onClick={() => router.push(`/dashboard/rentals/${rental.id}`)}
                    size={"icon"}
                  >
                    <PenLine size={16} strokeWidth={3} className="text-primary" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size={"icon"} className="bg-red-500">
                        <Trash size={16} strokeWidth={3} className="text-white" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          account and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:border-red-500 hover:border-2 hover:bg-white hover:text-red-500" onClick={()=>handleDeleteRental(rental.id)}><Trash size={16} strokeWidth={3} className="" /> Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>

              <CardFooter className="p-2">
                <div className="w-full space-y-2">
                  <div className="flex justify-between w-full flex-wrap gap-2">
                    <div>
                      <p className="text-primary font-bold text-lg">
                        {rental.price}{" "}RWF
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
                      <Image
                        src={icons.parkSlot}
                        alt=""
                        width={16}
                        height={16}
                      />
                      <span className="text-black text-sm">
                        {rental.parkingSpace} Parking Slot
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
                        {rental.size}{" "}
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
