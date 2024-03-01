import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import {
  fetchCartCall,
  addToCartCall,
  deleteCartCall,
  deleteFromCartCall,
  updateCartCall,
} from "./cartAPICalls";

export const getCart = createAppAsyncThunk("cart/fetchCart", async () => {
  const res = await fetchCartCall();
  return res;
});

export const addToCart = createAppAsyncThunk(
  "cart/addToCart",
  async (productId: string) => {
    const res = await addToCartCall(productId);
    return res;
  }
);

export const deleteCart = createAppAsyncThunk("cart/deleteCart", async () => {
  const res = await deleteCartCall();
  return res;
});

export const deleteFromCart = createAppAsyncThunk(
  "cart/deleteFromCart",
  async (productId: string) => {
    const res = await deleteFromCartCall(productId);
    return res;
  }
);

export const updateCart = createAppAsyncThunk(
  "cart/updateCart",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const res = await updateCartCall(productId, quantity);
    return res;
  }
);
