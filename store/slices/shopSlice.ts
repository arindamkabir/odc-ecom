import { BoundedState, ShopState } from "@/types/State";
import { toast } from "react-toastify";
import { StateCreator } from "zustand";

const createShopState: StateCreator<
    BoundedState,
    [],
    [],
    ShopState
> = (set, get) => ({
    cart: [],
    cartOpen: false,
    mobileFiltersOpen: false,
    productListQueryParams: {
        page: 1,
        search: ''
    },
    setCartOpen: (val) => {
        set(state => ({ cartOpen: val }));
    },
    addToCart: (product, stock) => {
        const exists = get().cart.some(item => item.id === product.id && item.stock.id === stock.id);
        if (exists) {
            let newCart = get().cart.map(item => {
                if (item.id === product.id && item.stock.id === stock.id)
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                else return item;
            })
            set(state => ({ cart: newCart }));
            toast.success("Product added to cart.");
        }
        else {
            let { stocks, ...cartProduct } = product
            set(state => ({
                cart: [...state.cart, {
                    ...cartProduct,
                    stock: stock,
                    quantity: 1
                }]
            }));
            toast.success("Product added to cart.");
        }
    },
    removeFromCart: (productId, stockId, removeAll) => {
        const item = get().cart.find(item => item.id === productId && item.stock.id === stockId);
        if (item) {
            if (!removeAll) {
                if (item.quantity === 1)
                    set(state => ({
                        cart: state.cart.filter(item => !(item.id === productId && item.stock.id === stockId))
                    }));
                else if (item.quantity > 1)
                    set(state => ({
                        cart: state.cart.map(item => {
                            if (item.id === productId && item.stock.id === stockId)
                                return {
                                    ...item,
                                    quantity: item.quantity + 1
                                }
                            else return item;
                        })
                    }));
            }
            else {
                set(state => ({
                    cart: state.cart.filter(item => !(item.id === productId && item.stock.id === stockId))
                }));
            }
        }
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
});


export default createShopState;