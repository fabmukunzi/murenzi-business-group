import React from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';
import { images } from '@/constant/images';

const Explore = () => {
    const imageUrl =
        "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg";

    return (
        <div className='px-20 mt-10'>
            <div
                className="h-[450px] w-full bg-cover bg-center rounded-2xl"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <div className="bg-gradient-to-t from-primary/70 to-white/0 h-full p-10 rounded-2xl text-white flex flex-col gap-10">
                    <h1 className='font-bold text-4xl w-10/12'>Apartment, Sauna Massage, and Restaurant Booth Renting</h1>
                    <div className='w-full flex justify-between'>
                        <div className='w-1/2 flex gap-4 flex-col'>
                            <p className='font-light'>Discover premium rental spaces beyond the ordinary—luxurious apartments, relaxing sauna massage services, and exclusive restaurant booths. Experience comfort, convenience, and top-tier hospitality tailored to your needs.</p>
                            <Button variant={'secondary'} className='text-primary w-fit'>Expore now</Button>
                        </div>
                        <div className='flex gap-2 h-fit mt-28'>
                            <div className='relative rounded-2xl lg:w-28 h-40 sm:w-1/2 aspect-[4/3]'>
                                <Image
                                    src={images.exterior2}
                                    alt='Exterior'
                                    fill
                                    className='object-cover rounded-2xl'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-white/0 rounded-2xl flex items-end'>
                                    <span className='text-xs p-2'>Apartment</span>
                                </div>
                            </div>
                            <div className='relative rounded-2xl lg:w-28 h-40 sm:w-1/2 aspect-[4/3]'>
                                <Image
                                    src={images.exterior2}
                                    alt='Exterior'
                                    fill
                                    className='object-cover rounded-2xl'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-primary/40 to-white/40 rounded-2xl flex items-end'>
                                    <span className='text-xs p-2'>Booth</span>
                                </div>
                            </div>
                            <div className='relative rounded-2xl lg:w-28 h-40 sm:w-1/2 aspect-[4/3]'>
                                <Image
                                    src={images.exterior2}
                                    alt='Exterior'
                                    fill
                                    className='object-cover rounded-2xl'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-primary/40 to-white/40 rounded-2xl flex items-end'>
                                    <span className='text-xs p-2'>Sauna massage</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore
