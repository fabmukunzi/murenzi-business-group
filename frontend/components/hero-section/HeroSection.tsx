import { images } from '@/constant/images'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { icons } from '@/constant/icons'

const HeroSection = () => {
  return (
    <div className='flex justify-between w-full px-20 bg-gradient-to-r from-white to-primary rounded-br-4xl '>
      <div className='h-full w-1/2 flex flex-col justify-between'>
        <div className='pt-30 flex flex-col gap-4'>
          <h1 className='font-bold text-3xl'>Discover Your Ideal Apartment, Dining booth, and Wellness Experience – Comfort and Affordability Combined.</h1>
          <p>Looking for a place to live or a relaxing break? Explore a variety of verified apartments, tasty restaurants, and soothing sauna massages. Whether you need a cozy studio, a nice place to eat, or a peaceful retreat, we make it easy and fast. Start your journey with us today!</p>
        </div>
        <div className='flex flex-col gap-3 pb-10'>
          <h3 className='font-semibold text-lg text-gray-700'>Book apartment with</h3>
          <div className='flex gap-4'>
            <Button variant={'outline'} className="h-11 px-8 border-2 border-pink-600"><Image src={icons.airbnb} alt='' /></Button>
            <Button className="h-11 px-10 bg-[#003680]">Booking</Button>
          </div>
        </div>
      </div>
      <div className=''>
        <Image src={images.heroImage} height={550} width={0} alt='' />
      </div>
    </div>
  )
}

export default HeroSection
