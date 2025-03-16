import React from 'react'
import CardApartment from '../apartment/CardApartment'
import { Button } from '@/components/ui/button';

const BestApartment = () => {
    return (
        <div className="px-4 md:px-10 lg:px-20">
            <div className='pt-8 pb-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4'>
                <div>
                    <h3 className='text-primary text-sm'>Residence apartment</h3>
                    <h1 className='font-bold text-3xl md:text-4xl'>Find Best Apartment</h1>
                </div>
                <Button className="w-full sm:w-auto">View More</Button>
            </div>

            {/* Ensure full width on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <CardApartment />
                <CardApartment />
                <CardApartment />
            </div>
        </div>
    );
};

export default BestApartment;
