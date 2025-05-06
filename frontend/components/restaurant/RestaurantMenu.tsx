'use client';

import React from "react";
import MenuItemCard from "./MenuCard";
import { Button } from "../ui/button";
import { MenuItem } from "@/lib/types/menu";
import { useGetCategoriesQuery } from "@/store/actions/menu";
import { useSearchParams, useRouter } from "next/navigation";
import Loader from "../common/loader";
import EmptyState from "../common/Empty";

interface Props {
  menu: MenuItem[];
}

const RestaurantMenu: React.FC<Props> = ({ menu }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = searchParams.get("categoryId") || "";

  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  const filteredItems = categoryId
    ? menu.filter((item) => item.category.id === categoryId)
    : menu;

  const handleCategoryClick = (id: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!id) {
      current.delete("categoryId");
    } else {
      current.set("categoryId", id);
    }

    router.push(`?${current.toString()}`);
  };

  if (isLoading) return <Loader loading={isLoading} />;
  if (error) return <p>Error loading categories</p>;

  return (
    <div className="container py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        <span className="text-primary">Our</span> Restaurant Menu
      </h2>

      <div className="flex justify-start gap-6 mb-8 overflow-auto w-full">
        <Button
          key="all"
          size="sm"
          className={`flex items-center gap-2 px-8 hover:text-white rounded-lg transition-colors ${!categoryId ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
            }`}
          onClick={() => handleCategoryClick("")}
        >
          All
        </Button>

        {categories?.data.categories.map((category) => (
          <Button
            key={category.id}
            size="sm"
            className={`flex items-center gap-2 px-8 hover:text-white rounded-lg transition-colors ${categoryId === category.id
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-500"
              }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <EmptyState title="No data found here " />
      ) :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              image={item.image}
              title={item.name}
              description={item.description}
              price={item.price}
              category={item.category.name}
            />
          ))}
        </div>
        }
    </div>
  );
};

export default RestaurantMenu;
