import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SaunaImg1 } from "@/lib/images";

interface MenuItemProps {
    image: string;
    title: string;
    description: string;
    price: string;
}

const MenuItemCard: React.FC<MenuItemProps> = ({ image, title, description, price }) => {
    return (
        <Card className="max-sm:w-full shadow-sm rounded-xl border gap-0 border-gray-200 py-0 p-1 flex flex-row max-sm:flex-col">
            <Image
                src={image}
                alt="Grilled Chicken"
                width={100}
                height={100}
                className="rounded-lg min-h-24 lg:h-24 lg:w-24 max-sm:h-16 max-sm:w-full w-24 object-cover"
            />
            <CardContent className="flex flex-col justify-between gap-2 h-24">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                    <span className="text-lg font-bold text-primary">${price}</span>
                </div>
                <p className="text-gray-600 text-sm overflow-auto">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};

export default MenuItemCard;
