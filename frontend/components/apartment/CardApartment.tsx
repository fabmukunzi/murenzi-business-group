"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScanEye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { icons } from "@/lib/icons";

const CardApartment = () => {
    const imageUrl =
        "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg";

    return (
        <Card className="w-full sm:max-w-[360px] p-2">
            <Dialog>
                <CardContent
                    className="p-0 h-56 rounded-lg bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                >
                    <DialogTrigger asChild>
                        <div className="relative cursor-pointer">
                            <div className="bg-white/50 rounded-md p-1 flex justify-center items-center w-fit h-fit absolute right-2 top-2">
                                <ScanEye
                                    width={30}
                                    height={30}
                                    className="bg-primary p-1 text-white rounded-md cursor-pointer"
                                />
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent title="" className="max-w-lg w-full">
                        <Image
                            src={imageUrl}
                            alt="Apartment Preview"
                            className="w-full rounded-lg"
                        />
                    </DialogContent>
                </CardContent>
            </Dialog>

            <CardFooter className="p-2">
                <div className="w-full space-y-2">
                    <div className="flex justify-between w-full flex-wrap gap-2">
                        <div>
                            <p className="text-primary font-bold text-lg">
                                $20 <span className="text-gray-500 font-medium text-sm">/night</span>
                            </p>
                            <p className="text-gray-500 text-sm">Room 1</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Image src={icons.locationPin} alt="" width={14} height={14} />
                            <span className="text-black text-sm">Kacyiru, Kigali, Rwanda</span>
                        </div>
                    </div>

                    <div className="flex justify-between w-full flex-wrap gap-2">
                        <div className="flex items-center gap-1">
                            <Image src={icons.bed} alt="" width={16} height={16} />
                            <span className="text-black text-sm">4 Bedroom</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Image src={icons.parkSlot} alt="" width={16} height={16} />
                            <span className="text-black text-sm">1 Parking Slot</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Image src={icons.squareMeter} alt="" width={16} height={16} />
                            <span className="text-black text-sm flex">
                                6x7 <span className="flex">m<span className="text-[8px]">2</span></span>
                            </span>
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default CardApartment;
