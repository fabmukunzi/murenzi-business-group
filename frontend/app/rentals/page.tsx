"use client";
import React, { useState } from "react";
import CardApartment from "@/components/apartment/CardApartment";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox

const locations: string[] = ['Kigali', 'Musanze', 'Rubavu', 'Huye'];
const bedrooms: number[] = [1, 2, 3, 4, 5];
const amenities: string[] = ['Balcony', 'Pool', 'Gym', 'Parking', 'Furnished'];

const RentalsPage = () => {
    const [location, setLocation] = useState<string | null>(null);
    const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
    const [priceRange, setPriceRange] = useState<number[]>([100, 1000]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const handleApplyFilters = () => {
        console.log({
            location,
            bedrooms: selectedBedrooms,
            priceRange,
            amenities: selectedAmenities
        });
    };

    return (
        <div className='py-20 md:mx-14 w-full'>
            <Dialog>
                <DialogTrigger asChild className="mb-4">
                    <Button variant="outline">Filter apartment <Filter className="ml-2" /></Button>
                </DialogTrigger>
                <DialogContent className="sm:min-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Filter Apartments</DialogTitle>
                        <DialogDescription>Select your preferred filters to refine your search.</DialogDescription>
                    </DialogHeader>
                    <Card className="p-2 w-full">
                        <CardContent className="flex flex-col gap-4 py-4">
                            <Select onValueChange={(value: string) => setLocation(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.map((loc) => (
                                        <SelectItem key={loc} value={loc}>
                                            {loc}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Bedrooms Select */}
                            <Select onValueChange={(value: string) => setSelectedBedrooms(Number(value))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select bedrooms" />
                                </SelectTrigger>
                                <SelectContent>
                                    {bedrooms.map((bed) => (
                                        <SelectItem key={bed} value={String(bed)}>
                                            {bed} {bed > 1 ? 'Bedrooms' : 'Bedroom'}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Price Range Slider */}
                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-gray-500">Price Range: ${priceRange[0]} - ${priceRange[1]}</span>
                                <Slider
                                    defaultValue={priceRange}
                                    max={5000}
                                    step={50}
                                    onValueChange={(value: number[]) => setPriceRange(value)}
                                />
                            </div>

                            {/* Amenities Checkboxes */}
                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-gray-500">Amenities</span>
                                {amenities.map((amenity) => (
                                    <label key={amenity} className="flex items-center gap-2">
                                        <Checkbox
                                            checked={selectedAmenities.includes(amenity)}
                                            onCheckedChange={(checked) =>
                                                setSelectedAmenities((prev) =>
                                                    checked ? [...prev, amenity] : prev.filter((a) => a !== amenity)
                                                )
                                            }
                                        />
                                        {amenity}
                                    </label>
                                ))}
                            </div>

                            <Button className="w-full mt-4" onClick={handleApplyFilters}>
                                Apply Filters
                            </Button>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
            <div className="flex flex-wrap md:flex-row flex-col md:justify-between items-center justify-between space-y-8">
                <CardApartment />
                <CardApartment />
                <CardApartment />
                <CardApartment />
                <CardApartment />
            </div>
        </div>
    );
}

export default RentalsPage;
