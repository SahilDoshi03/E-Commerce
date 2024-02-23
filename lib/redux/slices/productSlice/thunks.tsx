import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { fetchProducts, fetchBrands, fetchCategories, fetchProductById } from "./fetchProducts";
import type { Filter } from "@/types/Product";

export const getProductById = createAppAsyncThunk(
  "product/fetchProductById",
  async (productId: string) => {
    const res = await fetchProductById(productId);
    return res;
  }
);

export const getProducts = createAppAsyncThunk(
  "product/fetchProducts",
  async (filter: Filter) => {
    const res = await fetchProducts(filter);
    return res;
  }
);

export const getBrands = createAppAsyncThunk(
  "product/fetchBrands",
  async () => {
    const res = await fetchBrands();
    return res;
  }
);

export const getCategories = createAppAsyncThunk(
  "product/fetchCategories",
  async () => {
    const res = await fetchCategories();
    return res;
  }
);
