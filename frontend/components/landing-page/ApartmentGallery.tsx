'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, Bed, Bath, Utensils, Building, Sofa } from 'lucide-react'; // Import the icons from lucide-react
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const categories = [
    { name: 'Living room', icon: Sofa, images: ["livingRoom1.avif", 'livingRoom2.avif', 'livingRoom3.avif', 'livingRoom4.avif'] },
    { name: 'Full kitchen', icon: Utensils, images: ['kitchen2.avif', 'kitchen1.avif', 'kitchen3.avif','kitchen4.avif'] },
    { name: 'Dining area', icon: Home, images: ['dining1.avif', 'dining2.avif','dining3.avif','dining4.avif'] },
    { name: 'Bed room', icon: Bed, images: ['bed1.avif', 'bed2.avif', 'bed3.avif', 'bed4.avif'] },
    { name: 'Full bathroom', icon: Bath, images: ['bathroom1.jpeg', 'bathroom2.jpeg', 'bathroom3.jpeg', 'bathroom4.avif'] },
    { name: 'Exterior', icon: Building, images: ['exterior1.avif', 'exterior2.png', 'exterior3.png','exterior4.avif'] },
];

export default function ApartmentGallery() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <div className="flex max-md:flex-col lg:flex-row gap-8 px-20 py-10 max-sm:px-4">
            {/* Sidebar */}
            <div className="w-full lg:w-3/8 flex flex-col gap-4">
                <h2 className="text-sm font-semibold text-primary">Gallery</h2>
                <h1 className="text-3xl font-bold">Apartment Gallery</h1>
                <p className="text-gray-500 text-sm">
                    Browse through our gallery and discover beautifully designed apartments that fit your
                    lifestyle. From cozy studios to spacious family homes, find the perfect space that feels
                    just right for you.
                </p>
                <div className="mt-4 flex flex-col w-10/12 max-sm:w-full gap-2">
                    {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <Button
                                key={category.name}
                                variant={selectedCategory.name === category.name ? 'default' : 'ghost'}
                                className={cn('flex h-12 text-base px-10 items-center gap-2', {
                                    'bg-primary text-white': selectedCategory.name === category.name,
                                })}
                                onClick={() => setSelectedCategory(category)}
                            >
                                <div className='w-full flex items-center gap-2 py-4'>
                                    <div className={` p-2 border rounded-full ${selectedCategory.name === category.name ? '' : 'text-primary border-primary'}`}>
                                        <IconComponent strokeWidth={3} className="w-5 h-5" />
                                    </div>
                                    {category.name}
                                </div>
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Carousel */}
            <div className="block lg:hidden min-w-6/12">
                <Carousel>
                    <CarouselPrevious className="left-0 z-20" />
                    <CarouselContent>
                        {selectedCategory.images.map((image, index) => (
                            <CarouselItem key={index}>
                                <div
                                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                ></div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext className="right-0" />
                </Carousel>
            </div>

            {/* Gallery Section */}
            <div className="w-full hidden lg:flex">
                <div className="flex w-full flex-col gap-2">
                    <div
                        className="h-7/12 w-full rounded-2xl"
                        style={{
                            backgroundImage: `url(${selectedCategory.images[0]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                    <div className="h-5/12 w-full flex justify-between gap-2">
                        <div
                            className="h-full w-6/12 rounded-2xl"
                            style={{
                                backgroundImage: `url(${selectedCategory.images[1]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>
                        <div
                            className="h-full w-3/12 rounded-2xl"
                            style={{
                                backgroundImage: `url(${selectedCategory.images[2]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>
                        <div
                            className="h-full w-3/12 rounded-2xl"
                            style={{
                                backgroundImage: `url(${selectedCategory.images[3]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
