import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { OrderItem } from "@/types/Order";
import { getOrder, createOrder, updateOrder, deleteOrder } from "./thunks";

type initialStateT = {
  orders: any;
  status: "idle" | "loading" | "error";
};

const initialState: initialStateT = {
  orders: null,
  status: "idle",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orders = action.payload.order;
        state.status = "idle";
      })
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = [...state.orders, action.payload.order];
        state.status = "idle";
      })
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order: any) =>
          order._id === action.payload.order._id ? action.payload.order : order
        );
        state.status = "idle";
      });
  },
});
