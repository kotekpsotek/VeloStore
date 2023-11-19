import { configureStore } from "@reduxjs/toolkit"

export type SwapOptions = "Products" | "Black Week" | "Sales";
type ReducerProducPagesAction = { type: null } | { type: SwapOptions };

const productsPageReduce = (s: ReducerProducPagesAction = { type: null }, set: ReducerProducPagesAction) => {
    return s = set
}

export const productsPage = configureStore({ reducer: productsPageReduce as any })
