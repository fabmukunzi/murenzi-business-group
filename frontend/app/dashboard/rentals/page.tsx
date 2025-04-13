"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const rentalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  pricePerNight: z.number().min(0, "Price must be positive"),
  location: z.string().min(1, "Location is required"),
  bedrooms: z.number().min(0, "Number of bedrooms must be positive"),
  parkingSlots: z.number().min(0, "Number of parking slots must be positive"),
  area: z.number().min(0, "Area must be positive"),
  description: z.string().min(1, "Description is required"),
  image: z.any(),
});

type RentalFormData = z.infer<typeof rentalSchema>;

export default function RentalsPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RentalFormData>({
    resolver: zodResolver(rentalSchema),
  });

  const onSubmit = async (data: RentalFormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Add New Rental</h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Rental Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Rental Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter rental name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerNight">Price per Night ($)</Label>
                <Input
                  id="pricePerNight"
                  type="number"
                  {...register("pricePerNight", { valueAsNumber: true })}
                  placeholder="Enter price per night"
                />
                {errors.pricePerNight && (
                  <p className="text-sm text-red-500">
                    {errors.pricePerNight.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register("location")}
                  placeholder="Enter location"
                />
                {errors.location && (
                  <p className="text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  {...register("bedrooms", { valueAsNumber: true })}
                  placeholder="Enter number of bedrooms"
                />
                {errors.bedrooms && (
                  <p className="text-sm text-red-500">
                    {errors.bedrooms.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="parkingSlots">Number of Parking Slots</Label>
                <Input
                  id="parkingSlots"
                  type="number"
                  {...register("parkingSlots", { valueAsNumber: true })}
                  placeholder="Enter number of parking slots"
                />
                {errors.parkingSlots && (
                  <p className="text-sm text-red-500">
                    {errors.parkingSlots.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Area (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  {...register("area", { valueAsNumber: true })}
                  placeholder="Enter area in square meters"
                />
                {errors.area && (
                  <p className="text-sm text-red-500">{errors.area.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter rental description"
                className="min-h-[100px]"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Rental Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-64 h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Add Rental
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
