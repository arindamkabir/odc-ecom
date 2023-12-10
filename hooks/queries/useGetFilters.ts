import axios from "@/lib/axios";
import { Category } from "@/types/Category";
import { Color } from "@/types/Color";
import { Size } from "@/types/Size";
import { useQuery } from "@tanstack/react-query";

export type GetFiltersResponse = {
    colors: Color[],
    sizes: Size[],
    categories: Category[]
};

const fetchFilters = async (): Promise<GetFiltersResponse> => {
    const response = await axios.get<GetFiltersResponse>(`/api/get-filters`);
    return response.data;
};

export const useGetFilters = () => {
    return useQuery<GetFiltersResponse, Error>({
        queryKey: ['filters'],
        queryFn: () => {
            return fetchFilters();
        }
    });
};