import { logoImage } from '@/lib/images';
import { homepageRoutes } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';

const LogoComponent = ({ className }: { className?: string }) => {
  return (
    <Link
      href={homepageRoutes.home.path}
      style={{ wordSpacing: '3px' }}
      className={`${className} !flex items-center gap-3 text-xl font-bold text-black`}
    >
      <Image className='rounded-full' width={40} height={40} src={logoImage} alt="diaspora lounge" />
      Diaspora <span className="text-primary">Stop</span> Center
    </Link>
  );
};

export default LogoComponent;
