import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux/es/exports";

export type SwapOptions = "Products" | "Black Week" | "Sales";
export type ReducerProducPagesAction = { type: SwapOptions | null };

const productsPageReduce = (s: ReducerProducPagesAction = { type: null }, set: ReducerProducPagesAction) => {
    if (!set.type?.startsWith("@@redux/INIT")) return s = set; // THIS redux so always set as initial state value '@@redux/INIT'
    return s
}

export const productsPage = configureStore({ reducer: productsPageReduce as any })
