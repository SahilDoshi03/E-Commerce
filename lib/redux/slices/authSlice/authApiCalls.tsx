import axios from "axios";
import type { User } from "@/types/User";

export const registerUserCall = async (userData: User) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/auth/register",
      userData
    );
    const data = res.data
    return data
  } catch (err) {
    alert(err.response.data.msg);
  }
};

export const loginUserCall = async (userData: User) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      userData
    );
    const data = res.data
    return data
  } catch (err) {
    alert(err.response.data.msg);
  }
};


