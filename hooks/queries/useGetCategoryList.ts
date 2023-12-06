import axios from "@/lib/axios";
import { Category, CategoryWithParentAndProductCount } from "@/types/Category";
import { PaginatedResponse } from "@/types/Response";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type CategoryListResponse = Category[];

const fetchCategoryList = async (): Promise<CategoryListResponse> => {
    const response = await axios.get<CategoryListResponse>(`/api/categories`);
    return response.data;
};

export const useGetCategoryList = () => {
    return useQuery<CategoryListResponse, Error>({
        queryKey: ['categories'],
        queryFn: () => {
            return fetchCategoryList();
        }
    });
};