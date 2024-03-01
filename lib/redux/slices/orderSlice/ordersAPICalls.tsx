import axios from "axios";

export const fetchOrderCall = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:3000/api/v1/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createOrderCall = async (orderData: any) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `http://localhost:3000/api/v1/order`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteOrderCall = async (orderId: string) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/v1/order${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateOrderCall = async (orderData: any, orderId: string) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.patch(
      `http://localhost:3000/api/v1/cart/${orderId}`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e);
  }
};
