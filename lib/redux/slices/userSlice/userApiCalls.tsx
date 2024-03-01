import axios from "axios";
import type { Address, User } from "@/types/User";

export const getUserCall = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get("http://localhost:3000/api/v1/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addUserAddressCall = async (userAddress: Address) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.patch(
      "http://localhost:3000/api/v1/user",
      userAddress,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserAddressCall = async (addressId: string) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.patch(
      `http://localhost:3000/api/v1/user/${addressId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};
