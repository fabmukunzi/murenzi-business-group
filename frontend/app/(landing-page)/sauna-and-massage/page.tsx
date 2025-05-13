'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SaunaImg1 } from '@/lib/images';
import { Card } from '@/components/ui/card';
import { massageServices } from '@/lib/data/massage';

const SaunaMassage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-center gap-20 mx-6 md:mx-14 items-center my-16 md:my-24"
    >
      <div className="flex flex-col justify-center gap-4 items-center">
        <div className="w-full">
          <p className="text-primary">Sauna massage</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 mt-2">
            Explore <span className="text-primary">massage</span> options
          </h2>
          <p className="text-lg mt-4 text-gray-700">
            If you have any questions or need assistance, feel free to reach out
            to us through the contact section.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6 md:mx-14">
          {massageServices.map((service) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden rounded-lg h-60 shadow-md"
            >
              <div className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>

              <div className="absolute inset-0 z-10 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20"></div>

              <div className="relative z-20 flex items-center justify-between p-4 h-full text-white">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold tracking-wide">
                    {service.title}
                  </h3>
                </div>
                <div className="rounded-full bg-primary/80 px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-all duration-300 group-hover:bg-primary">
                  {service.price}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-10 items-center">
        <div className="w-full lg:w-1/2 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={SaunaImg1}
            alt="Sauna"
            className="w-full h-full object-cover"
            width={800}
            height={600}
          />
        </div>

        <div className="w-full lg:w-1/2 text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
            Discover the <span className="text-primary">Power of Sauna</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Step into a world of relaxation and health. Our sauna experience helps you unwind, detox, and rejuvenate both body and mind.
          </p>
          <p className="text-lg font-semibold text-primary">10,000 RWF per person</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SaunaMassage;
