import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./thunks";

type initialStateT = {
  token: string;
  email: string;
  status: "idle" | "loading" | "error";
};

const initialState: initialStateT = {
  token: "",
  email: "",
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.status = "idle";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.user;
        state.token = action.payload.token;
        state.status = "idle";
      });
  },
});
