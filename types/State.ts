import { ProductListRequest } from "@/hooks/queries/useGetProductList";
import { CartProduct, Product, Stock } from "./Product";
import { DeliveryLocation } from "./Checkout";
import { Category } from "./Category";
import { Color } from "./Color";
import { Size } from "./Size";
import { GetFiltersResponse } from "@/hooks/queries/useGetFilters";

export type ShopState = {
    sizes: Size[],
    colors: Color[],
    categories: Category[],
    cart: CartProduct[],
    cartOpen: boolean,
    mobileFiltersOpen: boolean,
    productListQueryParams: ProductListRequest,
    selectedCheckoutDeliveryLocation: DeliveryLocation,
    setFilters: (filters: GetFiltersResponse) => void,
    addToCart: (product: Product, stock: Stock) => void,
    removeFromCart: (id: Product["id"], stockId: Stock["id"]) => void,
    updateCartProduct: (id: Product["id"], stockId: Stock["id"], quantity: number) => void,
    setCartOpen: (val: boolean) => void,
    openMobileFilters: (val?: boolean) => void,
    setProductListQueryParams: (params: ProductListRequest) => void,
    setSelectedCheckoutDeliveryLocation: (val: DeliveryLocation) => void
};


export type BoundedState = ShopState;