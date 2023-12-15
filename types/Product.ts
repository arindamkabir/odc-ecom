import { Category } from "./Category";
import { Color } from "./Color";
import { Size } from "./Size";

export type Stock = {
    id: number;
    product_id: number;
    size_id: number;
    color_id: number;
    quantity: number;
    price: string;
    color: Color | null,
    size: Size | null,
    sales_price: string | null;
    created_at: string;
    updated_at: string;
};

export interface Product {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    description: string;
    price: string;
    SKU: string;
    is_hidden: boolean;
    is_featured: boolean;
    has_colors: boolean;
    has_sizes: boolean;
    sizes_count: number,
    colors_count: number,
    created_at: string;
    updated_at: string;
    stocks: Stock[]; // Adjust type as per the stocks structure
    category: Category;
    primary_image?: {
        id: number;
        url: string;
        type: string;
        imageable_id: number;
        imageable_type: string;
        created_at: string;
        updated_at: string;
        full_url: string;
        storage_path: string;
    };
}


export type CartProduct = Omit<Product, 'stocks'> & {
    cartQuantity: number,
    stock: Stock
}