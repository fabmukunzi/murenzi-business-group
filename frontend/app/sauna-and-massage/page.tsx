'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { SaunaImg1 } from '@/lib/images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const massageServices = [
  {
    id: 1,
    title: 'Deep Tissue Massage',
    description: 'Massage technique using firm pressure to relieve tension, reduce pain, and improve flexibility.',
    price: 'RWF 20,000',
    image: 'bed1.avif',
  },
  {
    id: 2,
    title: 'Swedish Massage',
    description: 'A gentle massage to promote relaxation and improve circulation.',
    price: 'RWF 15,000',
    image: 'bed2.avif',
  },
  {
    id: 3,
    title: 'Swedish Massage',
    description: 'A gentle massage to promote relaxation and improve circulation.',
    price: 'RWF 15,000',
    image: 'bed2.avif',
  },
  {
    id: 4,
    title: 'Swedish Massage',
    description: 'A gentle massage to promote relaxation and improve circulation.',
    price: 'RWF 15,000',
    image: 'bed2.avif',
  },
  {
    id: 5,
    title: 'Swedish Massage',
    description: 'A gentle massage to promote relaxation and improve circulation.',
    price: 'RWF 15,000',
    image: 'bed2.avif',
  },
  {
    id: 6,
    title: 'Swedish Massage',
    description: 'A gentle massage to promote relaxation and improve circulation.',
    price: 'RWF 15,000',
    image: 'bed2.avif',
  },

];

const saunaBenefits = [
  {
    id: 1,
    title: 'Improves Sleep',
    description: 'Regular sauna use promotes relaxation and improves sleep quality by reducing stress and muscle tension.',
    image: 'bed1.avif',
    imagePosition: 'right',
  },
  {
    id: 2,
    title: 'Enhances Immune Function',
    description: 'The heat from a sauna stimulates the production of white blood cells, helping the body fight infections more effectively.',
    image: 'bed1.avif',
    imagePosition: 'left',
  },
  {
    id: 3,
    title: 'Detoxifies',
    description: 'Saunas induce sweating, which helps the body eliminate toxins and heavy metals.',
    image: 'bed1.avif',
    imagePosition: 'right',
  },
  {
    id: 4,
    title: 'Reduces Stress',
    description: 'The soothing heat of a sauna helps relax muscles and releases endorphins, reducing stress and anxiety.',
    image: 'bed1.avif',
    imagePosition: 'left',
  },
  {
    id: 5,
    title: 'Slows Signs of Aging',
    description: 'Improved circulation and detoxification from saunas promote healthier skin, reducing signs of aging.',
    image: 'bed1.avif',
    imagePosition: 'right',
  },
  {
    id: 6,
    title: 'Lowers Risk of Heart Problems',
    description: 'Regular sauna use has been linked to improved heart health and lower risks of cardiovascular diseases.',
    image: 'bed1.avif',
    imagePosition: 'left',
  },
];


const SaunaMassage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>('');
  const pricePerPerson = 20;
  const totalPrice = guests * pricePerPerson;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-center gap-20 mx-6 md:mx-14 items-center my-16 md:my-24"
    >
      <div className='flex flex-col justify-center gap-4 items-center'>
        <div className='w-full'>
          <p className="text-primary">Sauna massage</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 mt-2">
            Explore <span className="text-primary">massage</span> options
          </h2>
          <p className="text-lg mt-4 text-gray-700">If you have any questions or need assistance, feel free to reach out to us through the contact section.</p>
        </div>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6 md:mx-14">
          {massageServices.map((service) => (
            <Card key={service.id} className='flex flex-row max-sm:flex-col p-2 gap-0 max-sm:gap-4'>
              <CardContent
                className="h-32 w-32 max-sm:w-full flex items-end p-1 justify-end text-white rounded-lg"
                style={{
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p className="bg-primary py-1 px-2 text-xs rounded-full">{service.price}</p>
              </CardContent>
              <CardFooter className='flex pr-2 max-sm:px-0 pl-4 flex-col items-start w-72 max-sm:w-full max-h-32 overflow-auto gap-2'>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className='w-full'>
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
                width={200} height={200}
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
