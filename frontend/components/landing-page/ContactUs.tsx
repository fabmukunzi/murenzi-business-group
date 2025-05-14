import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ContactUs = () => {
  return (
    <div
      id="contact"
      className="mx-4 sm:mx-10 md:mx-14 mt-10 bg-primary/20 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8"
    >
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
            Get in touch
          </h1>
          <div className="w-full sm:w-3/4 flex flex-col gap-3">
            <Link href="mailto:murenziguesthouse@gmail.com" className="flex px-4 gap-2 items-center py-1 rounded-md">
              <Mail width={20} className="text-primary" />
              <span className="text-gray-500 text-sm break-words">
                murenziguesthouse@gmail.com
              </span>
            </Link>
            <Link href="tel:+250795758411" className="ml-4 flex items-center p-1 h-10 w-52 gap-2 border border-primary rounded-md bg-primary/20 hover:bg-primary/30">
              <Phone width={20} className="text-primary" />
              <span className="text-gray-500 text-sm">+250 795 758 411</span>
            </Link>
            <div className="flex px-4 gap-2 items-center py-1 rounded-md">
              <MapPin width={20} className="text-primary" />
              <span className="text-gray-500 text-sm">
                123 Street 567 House
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-3">
          <Link
            href="#"
            className="border rounded-full p-1.5 border-black hover:bg-black hover:text-white transition"
          >
            <Instagram size={17} />
          </Link>
          <Link
            href="#"
            className="border rounded-full p-1.5 border-black hover:bg-black hover:text-white transition"
          >
            <Twitter size={17} />
          </Link>
          <Link
            href="#"
            className="border rounded-full p-1.5 border-black hover:bg-black hover:text-white transition"
          >
            <Facebook size={16} />
          </Link>
        </div>
      </div>
      <div className="bg-white w-full md:w-1/2 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col gap-5">
        <h3 className="text-lg sm:text-xl font-semibold">Reach out to us</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.4338309721506!2d30.131236573714215!3d-1.9809813980011057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca5a65e21f705%3A0xb1a850929758941d!2sDIASPORA%20LAUNGE!5e0!3m2!1sen!2srw!4v1747175723611!5m2!1sen!2srw"
          height="250"
          loading="lazy"
        ></iframe>
        {/* <div className='flex flex-col gap-4'>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <Input type="text" placeholder="Name" className='w-full h-10' />
                        <Input type="email" placeholder="Email" className='w-full h-10' />
                    </div>
                    <Input type="text" placeholder="Subject" className='w-full h-10' />
                    <Textarea placeholder="Type your message here." className='w-full' />
                    <Button className='flex items-center gap-2'>
                        <Send size={16} /> Send Message
                    </Button>
                </div> */}
      </div>
    </div>
  );
};

export default ContactUs;
