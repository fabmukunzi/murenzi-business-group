"use client";

import { useEffect, useState } from "react";
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
import { Upload, ArrowLeft, X, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useDeleteRoomImageMutation, useGetSingleRentalQuery, useUpdateRoomMutation } from "@/store/actions/rental";
import { handleError } from "@/lib/functions/handle-error";
import Loader from "@/components/common/loader";

const rentalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  pricePerNight: z.number().min(1, "Price must be at least $1"),
  location: z.string().min(1, "Location is required"),
  parkingSlots: z.number().min(0, "Number of parking slots must be positive"),
  size: z.string().min(1, "Size is required"),
  description: z.string().min(1, "Description is required"),
});

type RentalFormData = z.infer<typeof rentalSchema>;

type ImagePreview = {
  id: string;
  url: string;
  file: File;
};

export default function UpdateRentalPage() {
  const router = useRouter();
  const params = useParams()
  const { rentalId } = params as { rentalId: string };
  console.log(rentalId);
  const { data: rental, isLoading } = useGetSingleRentalQuery({ roomId: rentalId || "" }, {
    skip: !rentalId,
  });
  const [updateRoom] = useUpdateRoomMutation();
  const [deleteRoomImage] = useDeleteRoomImageMutation();
  const [imageFiles, setImageFiles] = useState<ImagePreview[]>([]);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RentalFormData>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      name: "",
      pricePerNight: 1,
      location: "",
      parkingSlots: 0,
      size: "",
      description: "",
    },
  });

  useEffect(() => {
    if (rental?.data?.room) {
      const { name, price, location, parkingSpace, size, description } = rental.data.room;
      reset({
        name,
        pricePerNight: price,
        location,
        parkingSlots: parkingSpace,
        size,
        description,
      });
    }
  }, [rental, reset]);

  const onSubmit = async (data: RentalFormData) => {
    const formData = new FormData();
    console.log(formData);

    try {
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "images") {
          formData.append(key, String(value));
        }
      });
      imageFiles.forEach((image) => {
        formData.append(`images`, image.file);
      });
      await updateRoom({ id: rentalId, data: formData }).unwrap();
      router.push("/dashboard/rentals");
    } catch (error) {
      handleError(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newFiles: ImagePreview[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      const id = crypto.randomUUID();
      reader.onloadend = () => {
        newFiles.push({
          id,
          url: reader.result as string,
          file,
        });
        if (newFiles.length === files.length) {
          setImageFiles((prev) => [...prev, ...newFiles]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImageFiles((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDeleteImage = async (roomId: string, imageUrl: string) => {
    setDeletingImage(imageUrl);
    try {
      await deleteRoomImage({ roomId, imageUrl }).unwrap();
    } catch (error) {
      handleError(error);
    } finally {
      setDeletingImage(null);
    }
  };

  return (
    <>
      {isLoading ? <div className="flex justify-center items-center h-screen">
        <Loader loading={isLoading} />
      </div> :
        <div className="space-y-8 max-w-6xl mx-auto pb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/dashboard/rentals")}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Add New Rental</h1>
                <p className="text-gray-500 mt-1">
                  Create a new property listing for guests to book
                </p>
              </div>
            </div>
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
                      min="1"
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
                      placeholder="Enter location (e.g., Kacyiru, Kigali, Rwanda)"
                      className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-200"
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.location.message}
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
                      min="0"
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
                    <Label htmlFor="size" className="text-gray-700 font-medium">
                      Size (e.g., 6x7)
                    </Label>
                    <Input
                      id="size"
                      {...register("size")}
                      placeholder="Enter size (e.g., 6x7)"
                      className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-200"
                    />
                    {errors.size && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.size.message}
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
                <div className="flex gap-2 flex-wrap">
                  {rental?.data?.room.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-32 h-20 rounded-lg overflow-hidden shadow-md flex items-center justify-center"
                    >
                      {deletingImage === img ? (
                        <Loader loading={true} />
                      ) : (
                        <>
                          <Image
                            src={img}
                            alt={`Image ${index + 1}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <Button
                            size="sm"
                            type="button"
                            onClick={() => handleDeleteImage(rental?.data?.room.id, img)}
                            className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-600 p-1 rounded-full shadow transition h-6 w-6"
                          >
                            <X size={16} />
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="images" className="text-gray-700 font-medium">
                      Rental Images (minimum 3)
                    </Label>
                    <span className="text-xs text-gray-500">
                      {imageFiles.length + Number(rental?.data.room.images.length)}{" "}
                      {imageFiles.length + Number(rental?.data.room.images.length) === 1 ? "image" : "images"} selected
                    </span>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${imageFiles.length > 0
                      ? imageFiles.length + Number(rental?.data.room.images.length) < 3
                        ? "border-red-300 bg-red-50"
                        : "border-primary/30 bg-primary/5"
                      : "border-gray-300 hover:border-primary/30 hover:bg-gray-50"
                      }`}
                  >
                    {imageFiles.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Upload size={20} className="text-primary" />
                        </div>
                        <p className="text-gray-700 font-medium">
                          Drop your images here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Add multiple high-quality images (max 10MB each)
                        </p>
                        <Input
                          id="images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-4 text-gray-700 border border-gray-300"
                          onClick={() => document.getElementById("images")?.click()}
                        >
                          Select Images
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {imageFiles.map((image) => (
                            <div key={image.id} className="relative group">
                              <div className="relative h-32 overflow-hidden rounded-lg shadow-sm">
                                <div className="relative w-full h-full">
                                  <Image
                                    src={image.url}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => removeImage(image.id)}
                                >
                                  <X size={12} />
                                </Button>
                              </div>
                            </div>
                          ))}

                          <Button
                            type="button"
                            variant="outline"
                            className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-primary/30 hover:text-primary transition-colors"
                            onClick={() =>
                              document.getElementById("images")?.click()
                            }
                          >
                            <Plus className="mb-1" size={20} />
                            <span className="text-xs">Add More</span>
                          </Button>
                        </div>

                        <Input
                          id="images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                  {imageFiles.length + (Number(rental?.data.room.images.length)) < 3 && (
                    <p className="text-sm text-red-500 mt-1">
                      Please select at least 3 image
                    </p>
                  )}
                  {Number(imageFiles.length) + (Number(rental?.data.room.images.length)) > 5 && (
                    <p className="text-sm text-red-500 mt-1">
                      Please select at most 5 image
                    </p>
                  )}
                </div>
                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border border-gray-300 text-gray-700"
                    onClick={() => router.push("/dashboard/rentals")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 transition-colors duration-200 min-w-32"
                    disabled={isSubmitting || imageFiles.length + (Number(rental?.data.room.images.length)) < 3 || imageFiles.length + (Number(rental?.data.room.images.length)) > 5}
                  >
                    {isSubmitting ? "Updating..." : "Update Rental"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>}
    </>
  );
}
