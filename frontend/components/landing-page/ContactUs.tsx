import { Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const ContactUs = () => {
    return (
        <div className='mx-4 sm:mx-10 md:mx-20 mt-10 bg-primary/20 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8'>
            <div className='w-full md:w-1/2 flex flex-col justify-between'>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl'>Get in touch</h1>
                    <div className='w-full sm:w-3/4 flex flex-col gap-3'>
                        <div className='flex px-4 gap-2 items-center py-1 rounded-md'>
                            <Mail width={20} className='text-primary' />
                            <span className='text-gray-500 text-sm break-words'>murenziguesthouse@gmail.com</span>
                        </div>
                        <div className='flex px-4 gap-2 items-center border border-primary py-1 rounded-md bg-primary/20'>
                            <Phone width={20} className='text-primary' />
                            <span className='text-gray-500 text-sm'>+2507978789</span>
                        </div>
                        <div className='flex px-4 gap-2 items-center py-1 rounded-md'>
                            <MapPin width={20} className='text-primary' />
                            <span className='text-gray-500 text-sm'>123 Street 567 House</span>
                        </div>
                    </div>
                </div>
                <div className='flex gap-3 mt-3'>
                    <Link href='#' className='border rounded-full p-1.5 border-black hover:bg-black hover:text-white transition'>
                        <Instagram size={17} />
                    </Link>
                    <Link href='#' className='border rounded-full p-1.5 border-black hover:bg-black hover:text-white transition'>
                        <Twitter size={17} />
                    </Link>
                    <Link href='#' className='border rounded-full p-1.5 border-black hover:bg-black hover:text-white transition'>
                        <Facebook size={16} />
                    </Link>
                </div>
            </div>
            <div className='bg-white w-full md:w-1/2 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col gap-5'>
                <h3 className='text-lg sm:text-xl font-semibold'>Reach out to us</h3>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <Input type="text" placeholder="Name" className='w-full' />
                        <Input type="email" placeholder="Email" className='w-full' />
                    </div>
                    <Input type="text" placeholder="Subject" className='w-full' />
                    <Textarea placeholder="Type your message here." className='w-full' />
                    <Button className='flex items-center gap-2'>
                        <Send size={16} /> Send Message
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;