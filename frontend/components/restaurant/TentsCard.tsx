import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface MenuItemProps {
    image: string;
    title: string;
    description: string;
    price: string;
}

const TentsCard: React.FC<MenuItemProps> = ({ image, title, description, price }) => {
    return (
        <Card className="w-full max-w-xs md:max-w-sm gap-0 lg:max-w-md shadow-lg rounded-xl border border-gray-200 p-0">
            <Image
                src={image}
                alt={title}
                width={900}
                height={100}
                className="rounded-t-lg h-40 md:h-48 lg:h-56 object-cover w-full"
            />
            <CardContent className="p-4 flex flex-col gap-0 justify-between h-20 md:h-48 lg:h-32">
                <p className="text-gray-600 text-sm my-2">{description}</p>
                <div className="flex justify-between items-center mt-4">
                    <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
                    <span className="text-lg font-bold text-primary">{price}/day</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default TentsCard;