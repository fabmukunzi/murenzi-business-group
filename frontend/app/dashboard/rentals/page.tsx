"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Plus, Upload, Image as ImageIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    formState: { errors, isSubmitting },
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
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Add New Rental</h1>
          <p className="text-gray-500 mt-1">
            Create a new property listing for guests to book
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 flex gap-2 items-center">
          <Plus size={16} />
          <span>New Rental</span>
        </Button>
      </motion.div>

      <Separator />

      <Card className="w-full border border-gray-200 shadow-sm overflow-hidden rounded-xl">
        <CardHeader className="bg-gray-50 border-b border-gray-100 px-6 py-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Rental Details
          </CardTitle>
          <CardDescription className="text-gray-500">
            Fill in the information below to create a new rental property
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Rental Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter rental name"
                  className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-200"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="pricePerNight"
                  className="text-gray-700 font-medium"
                >
                  Price per Night ($)
                </Label>
                <Input
                  id="pricePerNight"
                  type="number"
                  {...register("pricePerNight", { valueAsNumber: true })}
                  placeholder="Enter price per night"
                  className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-200"
                />
                {errors.pricePerNight && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.pricePerNight.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-700 font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  {...register("location")}
                  placeholder="Enter location"
                  className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-200"
                />
                {errors.location && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedrooms" className="text-gray-700 font-medium">
                  Number of Bedrooms
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  {...register("bedrooms", { valueAsNumber: true })}
                  placeholder="Enter number of bedrooms"
                  className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-200"
                />
                {errors.bedrooms && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.bedrooms.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="parkingSlots"
                  className="text-gray-700 font-medium"
                >
                  Number of Parking Slots
                </Label>
                <Input
                  id="parkingSlots"
                  type="number"
                  {...register("parkingSlots", { valueAsNumber: true })}
                  placeholder="Enter number of parking slots"
                  className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-200"
                />
                {errors.parkingSlots && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.parkingSlots.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="area" className="text-gray-700 font-medium">
                  Area (m²)
                </Label>
                <Input
                  id="area"
                  type="number"
                  {...register("area", { valueAsNumber: true })}
                  placeholder="Enter area in square meters"
                  className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-200"
                />
                {errors.area && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.area.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-gray-700 font-medium"
              >
                Description
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter rental description"
                className="min-h-[120px] border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-200"
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="image" className="text-gray-700 font-medium">
                Rental Image
              </Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                  previewImage
                    ? "border-primary/30 bg-primary/5"
                    : "border-gray-300 hover:border-primary/30 hover:bg-gray-50"
                }`}
              >
                {!previewImage ? (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Upload size={20} className="text-primary" />
                    </div>
                    <p className="text-gray-700 font-medium">
                      Drop your image here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      High quality images recommended (max 10MB)
                    </p>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4 text-gray-700 border border-gray-300"
                      onClick={() => document.getElementById("image")?.click()}
                    >
                      Select Image
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-md mx-auto">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-white/80 hover:bg-white"
                        onClick={() => {
                          setPreviewImage(null);
                          const input = document.getElementById(
                            "image"
                          ) as HTMLInputElement;
                          if (input) input.value = "";
                        }}
                      >
                        ✕
                      </Button>
                    </div>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4 text-gray-700"
                      onClick={() => document.getElementById("image")?.click()}
                    >
                      Change Image
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="border border-gray-300 text-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 transition-colors duration-200 min-w-32"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Rental"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
