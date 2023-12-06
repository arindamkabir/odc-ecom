import axios from "@/lib/axios";
import { Category } from "@/types/Category";
import { Color } from "@/types/Color";
import { Product } from "@/types/Product";
import { PaginatedResponse } from "@/types/Response";
import { Size } from "@/types/Size";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type ProductListRequest = {
    search?: string,
    page: number,
    perPage?: number,
    categories?: Category["id"][],
    sizes?: Size["id"][],
    colors?: Color["id"][],
}

export type ProductListResponse = PaginatedResponse<Product>;

const fetchProductList = async (params: ProductListRequest): Promise<ProductListResponse> => {
    const response = await axios.get<ProductListResponse>(`/api/products`, { params: params });
    return response.data;
};

export const useGetProductList = (params: ProductListRequest) => {
    return useQuery<ProductListResponse, Error>({
        queryKey: ['products', params],
        queryFn: () => {
            return fetchProductList(params);
        }
    });
};