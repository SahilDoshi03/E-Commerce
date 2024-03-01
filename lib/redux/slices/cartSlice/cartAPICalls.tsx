import axios from "axios";

export const fetchCartCall = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:3000/api/v1/cart`, {
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

export const addToCartCall = async (productId: string) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`http://localhost:3000/api/v1/cart`,{product: productId}, {
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

export const deleteCartCall = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.delete(`http://localhost:3000/api/v1/cart`, {
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

export const deleteFromCartCall = async (productId: string) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/v1/cart/${productId}`,
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

export const updateCartCall = async (productId: string, quantity: number) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.patch(
      `http://localhost:3000/api/v1/cart/${productId}`,
      {quantity},
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
