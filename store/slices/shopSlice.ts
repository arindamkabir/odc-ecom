import { DELIVERY_LOCATIONS } from "@/config/checkout";
import { BoundedState, ShopState } from "@/types/State";
import { toast } from "react-toastify";
import { StateCreator } from "zustand";

const createShopState: StateCreator<
    BoundedState,
    [],
    [],
    ShopState
> = (set, get) => ({
    sizes: [],
    colors: [],
    categories: [],
    cart: [],
    cartOpen: false,
    mobileFiltersOpen: false,
    productListQueryParams: {
        page: 1,
        search: '',
        perPage: 9,
        sizes: [],
        colors: []
    },
    selectedCheckoutDeliveryLocation: DELIVERY_LOCATIONS[0],
    setFilters: (filters) => {
        set(state => ({ sizes: filters.sizes, colors: filters.colors, categories: filters.categories }));
    },
    setCartOpen: (val) => {
        set(state => ({ cartOpen: val }));
    },
    addToCart: (product, stock) => {
        const exists = get().cart.some(item => item.id === product.id && item.stock.id === stock.id);
        if (exists) {
            let newCart = get().cart.map(item => {
                if (item.id === product.id && item.stock.id === stock.id && item.cartQuantity < item.stock.quantity)
                    return {
                        ...item,
                        cartQuantity: item.cartQuantity + 1
                    };
                else return item;
            })
            set(state => ({ cart: newCart }));
            toast.success("Product added to cart.");
        }
        else {
            let { stocks, ...cartProduct } = product
            if (stock.quantity > 0) {
                set(state => ({
                    cart: [...state.cart, {
                        ...cartProduct,
                        stock: stock,
                        cartQuantity: 1
                    }]
                }));
                toast.success("Product added to cart.");
            }
        }
    },
    removeFromCart: (productId, stockId) => {
        const item = get().cart.find(item => item.id === productId && item.stock.id === stockId);
        if (item)
            set(state => ({
                cart: state.cart.filter(item => !(item.id === productId && item.stock.id === stockId))
            }));
    },
    updateCartProduct: (productId, stockId, quantity) => {
        set(state => ({
            cart: state.cart.map((item) => {
                if (item.id === productId && item.stock.id === stockId)
                    return {
                        ...item,
                        cartQuantity: quantity
                    }
                else return item;
            })
        }));
    },
    openMobileFilters: (val?: boolean) => {
        if (val !== undefined) {
            set(state => ({ mobileFiltersOpen: val }));
        }
        else {
            set(state => ({ mobileFiltersOpen: !state.mobileFiltersOpen }));
        }
    },
    setProductListQueryParams: (val) => {
        set(state => ({ productListQueryParams: val }));
    },
    setSelectedCheckoutDeliveryLocation: (val) => {
        set(state => ({ selectedCheckoutDeliveryLocation: val }))
    }
});


export default createShopState;