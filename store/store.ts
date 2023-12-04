import { BoundedState } from "@/types/State";
import { create } from "zustand";
import createShopSlice from "./slices/shopSlice";

const useStore = create<BoundedState>()((...a) => ({
    ...createShopSlice(...a),
}));

export default useStore;
