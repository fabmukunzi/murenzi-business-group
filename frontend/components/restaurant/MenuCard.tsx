import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/lib/functions/format-number';
import Image from 'next/image';

interface MenuItemProps {
  image: string;
  title: string;
  description: string;
  price: string;
  category?: string;
}

const MenuItemCard: React.FC<MenuItemProps> = ({
  image,
  title,
  description,
  price,
  category,
}) => {
  return (
    <Card className="max-sm:w-full shadow-sm rounded-xl border gap-0 border-gray-200 py-0 p-1 flex flex-row max-sm:flex-col">
      <Image
        src={image}
        alt={`Grilled Chicken +${category}`}
        width={100}
        height={100}
        className="rounded-lg min-h-24 lg:h-24 lg:w-34 max-sm:h-16 max-sm:w-full w-24 object-cover"
      />
      {/* <Badge  className="w-fit absolute m-1">{category}</Badge> */}
      <CardContent className="flex flex-col justify-between gap-2 h-24 w-full">
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
          <span className="text-lg font-bold text-primary">RWF {formatMoney(parseInt(price))}</span>
        </div>
        <p className="text-gray-600 text-sm overflow-auto line-clamp-4">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
