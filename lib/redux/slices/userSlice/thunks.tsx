import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { getUserCall, addUserAddressCall, deleteUserAddressCall } from "./userApiCalls";
import type { Address } from "@/types/User";

export const getUser = createAppAsyncThunk("user/getUser", async () => {
  const res = await getUserCall();
  return res;
});

export const addUserAddress = createAppAsyncThunk(
  "user/addUserAddress",
  async (userAddress: Address) => {
    const res = await addUserAddressCall(userAddress);
    return res;
  }
);

export const deleteUserAddress = createAppAsyncThunk(
  "user/deleteUserAddress",
  async (addressId: string) => {
    const res = await deleteUserAddressCall(addressId);
    return res;
  }
);
