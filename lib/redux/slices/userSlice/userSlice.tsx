import { createSlice } from "@reduxjs/toolkit";
import { getUser, addUserAddress, deleteUserAddress } from "./thunks";
import { Address } from "@/types/User";

type UserT = {
  _id: string;
  role: string;
  email: string;
  addresses: Address[];
  name: string;
};

const initialState: { user: null | UserT; status: "idle" | "loading" | "error" } = {
  user: null,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "idle";
      })
      .addCase(addUserAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "idle";
      })
      .addCase(deleteUserAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.user;
        state.status = "idle";
      });
  },
});
