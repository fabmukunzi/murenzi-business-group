'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SaunaImg1 } from '@/lib/images';
import { Card } from '@/components/ui/card';
import { massageServices } from '@/lib/data/massage';

const saunaBenefits = [
  {
    id: 1,
    title: 'Improves Sleep',
    description:
      'Regular sauna use promotes relaxation and improves sleep quality by reducing stress and muscle tension.',
    image: 'bed1.avif',
    imagePosition: 'right',
  },
  {
    id: 2,
    title: 'Enhances Immune Function',
    description:
      'The heat from a sauna stimulates the production of white blood cells, helping the body fight infections more effectively.',
    image: 'bed1.avif',
    imagePosition: 'left',
  },
  {
    id: 3,
    title: 'Detoxifies',
    description:
      'Saunas induce sweating, which helps the body eliminate toxins and heavy metals.',
    image: 'bed1.avif',
    imagePosition: 'right',
  },
  {
    id: 4,
    title: 'Reduces Stress',
    description:
      'The soothing heat of a sauna helps relax muscles and releases endorphins, reducing stress and anxiety.',
    image: 'bed1.avif',
    imagePosition: 'left',
  },
  {
    id: 5,
    title: 'Slows Signs of Aging',
    description:
      'Improved circulation and detoxification from saunas promote healthier skin, reducing signs of aging.',
    image: 'bed1.avif',
    imagePosition: 'right',
  },
  {
    id: 6,
    title: 'Lowers Risk of Heart Problems',
    description:
      'Regular sauna use has been linked to improved heart health and lower risks of cardiovascular diseases.',
    image: 'bed1.avif',
    imagePosition: 'left',
  },
];

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
      <div className="w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 mt-2">
          Benefits Of<span className="text-primary"> Sauna </span>
        </h2>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {saunaBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col md:flex-row p-4 sm:p-2 overflow-auto max-md-p-2 rounded-lg shadow-md"
            >
              <Image
                src={SaunaImg1}
                alt={benefit.title}
                width={200}
                height={200}
                className="w-full max-md:w-full sm:w-60 h-40 object-cover rounded-lg"
              />
              <div className="text-left max-w-md mt-4 md:mt-0 md:ml-6">
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SaunaMassage;
