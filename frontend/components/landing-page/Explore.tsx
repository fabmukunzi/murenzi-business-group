import { Button } from '@/components/ui/button';
import { images } from '@/lib/images';
import Image from 'next/image';

const Explore = () => {
    const imageUrl = "https://plutproperties.com/wp-content/uploads/2021/09/apartment-in-kigali-plut-properties-3.jpg";

    return (
        <div className='px-4 sm:px-8 md:px-12 lg:px-20 mt-10'>
            <div
                className="w-full bg-cover bg-center rounded-2xl relative flex flex-col"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <div className="bg-gradient-to-t from-primary/70 to-white/0 rounded-2xl p-6 sm:p-8 md:p-10 text-white flex flex-col gap-4 sm:gap-6 md:gap-8">
                    <h1 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl w-full md:w-3/4'>
                        Apartment, Sauna Massage, and Restaurant Booth Renting
                    </h1>
                    <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
                        <div className='w-full md:w-1/2 flex flex-col gap-4'>
                            <p className='text-sm sm:text-base md:text-lg font-light'>
                                Discover premium rental spaces beyond the ordinary—luxurious apartments, relaxing sauna massage services, and exclusive restaurant booths. Experience comfort, convenience, and top-tier hospitality tailored to your needs.
                            </p>
                            <Button variant='secondary' className='text-primary w-fit'>Explore now</Button>
                        </div>
                        <div className='flex justify-center md:justify-start gap-2 h-80 max-md:h-40 items-end sm:gap-3 md:gap-4'>
                            {['Apartment', 'Booth', 'Sauna massage'].map((item, index) => (
                                <div key={index} className='relative w-20 sm:w-24 md:w-28 h-24 sm:h-28 md:h-32 rounded-2xl overflow-hidden'>
                                    <Image
                                        src={images.exterior2}
                                        alt={item}
                                        fill
                                        className='object-cover'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-2 text-white text-xs sm:text-sm'>
                                        {item}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Explore;