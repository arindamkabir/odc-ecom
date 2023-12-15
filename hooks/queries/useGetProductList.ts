import axios from "@/lib/axios";
import { Category } from "@/types/Category";
import { Color } from "@/types/Color";
import { Product } from "@/types/Product";
import { CursorPaginatedResponse, PaginatedResponse } from "@/types/Response";
import { Size } from "@/types/Size";
import { QueryClient, QueryFunction, QueryKey, useInfiniteQuery, useQuery } from "@tanstack/react-query";

export type ProductListRequest = {
    search?: string,
    page: number,
    perPage?: number,
    categories?: Category["id"][],
    sizes: Size["id"][],
    colors: Color["id"][]
}

export type ProductListResponse = CursorPaginatedResponse<Product>;

const fetchProductList = async ({ pageParam }: ProductListRequest & { pageParam: unknown }): Promise<ProductListResponse> => {
    const response = await axios.get<ProductListResponse>(`/api/products?cursor=${pageParam}`);
    return response.data;
};

export const useGetProductList = (params: ProductListRequest) => {
    return useInfiniteQuery<ProductListResponse, Error>({
        queryKey: ['products', 'list'],
        queryFn: ({ pageParam }) => fetchProductList({ pageParam: pageParam, ...params }),
        initialPageParam: undefined,
        getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
        getPreviousPageParam: (firstPage, pages) => firstPage.prev_cursor,
        // maxPages: 3,
    });
};


