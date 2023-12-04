export type ShopState = {
    mobileFiltersOpen: boolean,
    openMobileFilters: (val?: boolean) => void
};


export type BoundedState = ShopState;