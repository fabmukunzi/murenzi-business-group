export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    categoryId: string;
    createdAt: string;
    category: Category;
}

export interface MenuResponse {
    status: string;
    data: {
        items: MenuItem[];
    };
}

export interface MenuCategory{
    id: string;
    name: string;
    description: string;
}
