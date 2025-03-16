import { icons } from '@/constant/icons'
import { images } from '@/constant/images'
import Image from 'next/image'

const WhyChooseUs = () => {
    return (
        <div className='px-4 md:px-10 lg:px-20'>
            <div className=' flex flex-col lg:flex-row justify-between mt-10 gap-10 lg:gap-20'>
                {/* Left Image */}
                <div className='w-full lg:w-[55%] relative rounded-2xl aspect-[4/3] lg:aspect-auto'>
                    <Image
                        src={images.exterior1}
                        alt='Exterior'
                        fill
                        className='object-cover rounded-2xl'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-primary/40 to-white/40 rounded-2xl'></div>
                </div>

                {/* Right Content */}
                <div className='w-full lg:w-[45%] flex flex-col gap-4'>
                    <div>
                        <h1 className='text-xl md:text-2xl font-bold text-center lg:text-left'>Why Choose Us?</h1>
                        <p className='text-md md:text-base mt-2 text-center lg:text-left'>
                            We make renting easy with verified listings, smart search filters, and a seamless booking process.
                            Find a home that fits your lifestyle—quick, secure, and hassle-free!
                        </p>
                    </div>

                    {/* Small Images */}
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <div className='relative rounded-2xl w-full sm:w-1/2 aspect-[4/3]'>
                            <Image
                                src={images.exterior2}
                                alt='Exterior'
                                fill
                                className='object-cover rounded-2xl'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-primary/40 to-white/40 rounded-2xl'></div>
                        </div>
                        <div className='relative rounded-2xl w-full sm:w-1/2 aspect-[4/3]'>
                            <Image
                                src={images.interior}
                                alt='Interior'
                                fill
                                className='object-cover rounded-2xl'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-primary/40 to-white/40 rounded-2xl'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-2 border p-4 rounded-2xl w-full">
                        <div className="p-3 bg-primary/30 rounded-2xl flex items-center">
                            <Image src={icons.houseHand} alt="Icon" width={24} height={24} />
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg">Safe & Secure</h1>
                            <h3 className="text-sm text-gray-600">Rent with confidence</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WhyChooseUs
