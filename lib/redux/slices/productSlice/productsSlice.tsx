import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getProducts, getBrands, getCategories, getProductById } from "./thunks";
import type { Product, Brand, Category} from "@/types/Product"

type initialStateT = {
  totalCount: number
  products: Product[]
  brands: Brand[]
  categories: Category[]
  status: "idle" | "loading" | "error"
}

const initialState: initialStateT = {
  totalCount: 0,
  products: [],
  brands: [],
  categories: [],
  status: "idle",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.product;
      })
      .addCase(getBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload.brands;
      })
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload.categories;
      })
  },
});
