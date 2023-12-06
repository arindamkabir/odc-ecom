import { ProductListRequest } from "@/hooks/queries/useGetProductList";
import { CartProduct, Product, Stock } from "./Product";

export type ShopState = {
    cart: CartProduct[],
    cartOpen: boolean,
    mobileFiltersOpen: boolean,
    addToCart: (product: Product, stock: Stock) => void,
    removeFromCart: (id: Product["id"], stockId: Stock["id"]) => void,
    updateCartProduct: (id: Product["id"], stockId: Stock["id"], quantity: number) => void,
    setCartOpen: (val: boolean) => void,
    productListQueryParams: ProductListRequest,
    openMobileFilters: (val?: boolean) => void,
    setProductListQueryParams: (params: ProductListRequest) => void,
};


export type BoundedState = ShopState;