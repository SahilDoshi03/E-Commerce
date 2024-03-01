import { productSlice, authSlice, cartsSlice, userSlice, orderSlice } from "@/lib/redux/slices";

export const reducer = {
  product: productSlice.reducer,
  auth: authSlice.reducer,
  cart: cartsSlice.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer
};
