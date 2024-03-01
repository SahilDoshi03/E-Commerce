import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import {
  fetchOrderCall,
  createOrderCall,
  updateOrderCall,
  deleteOrderCall,
} from "./ordersAPICalls";

export const getOrder = createAppAsyncThunk("order/fetchOrder", async () => {
  const res = await fetchOrderCall();
  return res;
});

export const createOrder = createAppAsyncThunk(
  "order/createOrder",
  async (orderData: any) => {
    const res = await createOrderCall(orderData);
    return res;
  }
);

export const deleteOrder = createAppAsyncThunk(
  "order/deleteOrder",
  async (orderId: string) => {
    const res = await deleteOrderCall(orderId);
    return res;
  }
);

export const updateOrder = createAppAsyncThunk(
  "order/updateOrder",
  async ({ orderData, orderId }: { orderData: any; orderId: string }) => {
    const res = await updateOrderCall(orderData, orderId);
    return res;
  }
);
