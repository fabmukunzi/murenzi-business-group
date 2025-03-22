import React from "react";
import TentsCard from "./TentsCard";
import { tentsItems } from "@/lib/data";

const TentsMenu = () => {
    return (
        <div className="container py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center "><span className="text-primary">Our</span> Tents</h2>
            <p className="text-center text-gray-600 mb-6">Explore our variety of tents for every adventure.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tentsItems.map((item, index) => (
                    <TentsCard
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

export default TentsMenu;
