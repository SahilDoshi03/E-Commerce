import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  deleteCart,
  deleteFromCart,
  updateCart,
} from "./thunks";
import type { CartItem } from "@/types/Cart";

type initialStateT = {
  cart: CartItem[];
  status: "idle" | "loading" | "error";
};

const initialState: initialStateT = {
  cart: [],
  status: "idle",
};

export const cartsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
        state.status = "idle";
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = [...state.cart, action.payload.cart];
        state.status = "idle";
      })
      .addCase(deleteCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.cart = [];
        state.status = "idle";
      })
      .addCase(deleteFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload.cart._id
        );
        state.status = "idle";
      })
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = state.cart.map((item) =>
          item._id === action.payload.cart._id ? action.payload.cart : item
        );
        state.status = "idle";
      });
  },
});
