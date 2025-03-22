import React, { useState } from "react";
import MenuItemCard from "./MenuCard";
import { Drumstick, Leaf, } from "lucide-react";
import { Button } from "../ui/button";
import { menuItems } from "@/lib/data";


const menuCategories = [
  { id: "all", name: "All", icon: <Leaf /> },
  { id: "chicken", name: "Chicken", icon: <Drumstick /> },
  { id: "beef", name: "Beef", icon: <Leaf /> },
  { id: "vegan", name: "Vegan", icon: <Leaf /> },
];

const RestaurantMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="container py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6"><span className="text-primary">Our</span> Restaurant Menu</h2>
      <div className="flex justify-start gap-6 mb-8 overflow-auto w-full">
        {menuCategories.map((category) => (
          <Button
            key={category.id}
            size={"sm"}
            className={`flex items-center gap-2 px-8 hover:text-white rounded-lg transition-colors ${selectedCategory === category.id
                ? "bg-primary text-white"
              : "bg-gray-100 text-gray-500"
              }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.icon}
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => (
          <MenuItemCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
