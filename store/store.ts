import { BoundedState } from "@/types/State";
import { create } from "zustand";
import createShopSlice from "./slices/shopSlice";
import { persist } from "zustand/middleware";
import { CartProduct } from "@/types/Product";

const useStore = create<BoundedState>()(
    persist(
        (...a) => ({
            ...createShopSlice(...a),
        }),
        {
            name: "cartStore",
            partialize: (state) => ({ cart: state.cart }),
        }
    )
);

export default useStore;
