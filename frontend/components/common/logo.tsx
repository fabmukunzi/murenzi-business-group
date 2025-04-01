import { homepageRoutes } from '@/lib/routes';
import Link from 'next/link';

const LogoComponent = ({ className }: { className?: string }) => {
  return (
    <Link
      href={homepageRoutes.home.path}
      style={{ wordSpacing: '3px' }}
      className={`${className} text-xl font-bold text-black`}
    >
      Murenzi Guest <span className="text-primary">House</span>
    </Link>
  );
};

export default LogoComponent;
