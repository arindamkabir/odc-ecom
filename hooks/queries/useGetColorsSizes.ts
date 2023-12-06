import axios from "@/lib/axios";
import { Color } from "@/types/Color";
import { Size } from "@/types/Size";
import { useQuery } from "@tanstack/react-query";

export type ColorSizeListResponse = {
    colors: Color[],
    sizes: Size[]
};

const fetchColorsSizes = async (): Promise<ColorSizeListResponse> => {
    const response = await axios.get<ColorSizeListResponse>(`/api/colors-sizes`);
    return response.data;
};

export const useGetColorList = () => {
    return useQuery<ColorSizeListResponse, Error>({
        queryKey: ['colors-sizes'],
        queryFn: () => {
            return fetchColorsSizes();
        }
    });
};