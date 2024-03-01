import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import {
  fetchProductsCall,
  fetchBrandsCall,
  fetchCategoriesCall,
  fetchProductByIdCall,
} from "./productAPICalls";
import type { Filter } from "@/types/Product";

export const getProductById = createAppAsyncThunk(
  "product/fetchProductById",
  async (productId: string) => {
    const res = await fetchProductByIdCall(productId);
    return res;
  }
);

export const getProducts = createAppAsyncThunk(
  "product/fetchProducts",
  async (filter: Filter) => {
    const res = await fetchProductsCall(filter);
    return res;
  }
);

export const getBrands = createAppAsyncThunk(
  "product/fetchBrands",
  async () => {
    const res = await fetchBrandsCall();
    return res;
  }
);

export const getCategories = createAppAsyncThunk(
  "product/fetchCategories",
  async () => {
    const res = await fetchCategoriesCall();
    return res;
  }
);
