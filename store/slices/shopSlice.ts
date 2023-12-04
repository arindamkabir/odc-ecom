import { BoundedState, ShopState } from "@/types/State";
import { StateCreator } from "zustand";

const createShopState: StateCreator<
    BoundedState,
    [],
    [],
    ShopState
> = (set) => ({
    mobileFiltersOpen: false,
    openMobileFilters: (val?: boolean) => {
        if (val !== undefined) {
            set(state => ({ mobileFiltersOpen: val }));
        }
        else {
            set(state => ({ mobileFiltersOpen: !state.mobileFiltersOpen }));
        }
    },
});


export default createShopState;