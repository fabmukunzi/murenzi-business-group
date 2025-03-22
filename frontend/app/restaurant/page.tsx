'use client'
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/common/SearchInput';
import { useRouter } from 'next/navigation';
import RestaurantMenu from '@/components/restaurant/RestaurantMenu';
import Tents from '@/components/restaurant/Tents';

const Restaurant = () => {
    const router = useRouter();

    const handleSearch = (query: string) => {
        const params = new URLSearchParams(window.location.search);
        if (query) {
            params.set('query', query);
        } else {
            params.delete('query');
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className='mx-6 md:mx-14 items-center my-16 md:my-24 max-sm:mt-28 flex flex-col gap-4'>
            <div className='flex justify-between items-center w-full max-sm:flex-col gap-2'>
                <Card className="flex max-sm:w-full flex-row justify-center gap-1 items-center w-fit p-1 rounded-lg shadow-none max-sm:justify-between">
                    <Button size="sm" className='rounded-sm py-0'>All</Button>
                    <Button size="sm" className='rounded-sm' variant="secondary">Restaurant Menu</Button>
                    <Button size="sm" className='rounded-sm' variant="secondary">Tent</Button>
                </Card>
                <SearchInput onSearch={handleSearch} />
            </div>
            <RestaurantMenu />
            <Tents />
        </div>
    );
};

export default Restaurant;
