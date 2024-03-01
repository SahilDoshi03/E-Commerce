import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { User } from "@/types/User";
import { registerUserCall, loginUserCall } from "./authApiCalls";

export const registerUser = createAppAsyncThunk(
  "user/registerUser",
  async (userData: User) => {
    const res = await registerUserCall(userData);
    return res;
  }
);

export const loginUser = createAppAsyncThunk(
  "user/loginUser",
  async (userData: User) => {
    const res = await loginUserCall(userData);
    return res;
  }
);
