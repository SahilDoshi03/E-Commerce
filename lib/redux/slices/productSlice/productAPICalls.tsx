import axios from "axios";
import type { Filter } from "@/types/Product";

export const fetchProductByIdCall = async (productId: string) => {
  try{
    const res = await axios.get(`http://localhost:3000/api/v1/products/${productId}`)
    const data = res.data
    return data
  }catch(e) {
    console.log(e);
  }
}

export const fetchProductsCall = async (filter: Filter) => {
  const objectToQueryString = (obj: Filter) => {
    const keyValuePairs = [];

    // Loop through object key-value pairs
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key as keyof Filter];

        // If value is an array, loop through it and add each item
        if (Array.isArray(value)) {
          value.forEach((item) => {
            keyValuePairs.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
            );
          });
        } else {
          // If value is a string, add it directly
          keyValuePairs.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
          );
        }
      }
    }

    // Join all key-value pairs with "&" to form the final query string
    return keyValuePairs.join("&");
  };

  const queryString = objectToQueryString(filter);

  try {
    const res = await axios.get(
      `http://localhost:3000/api/v1/products?${queryString}`
    );
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchBrandsCall = async () => {
  try{
    const res = await axios.get(`http://localhost:3000/api/v1/brands`)
    const data = res.data
    return data
  }catch(e) {
    console.log(e);
  }
}

export const fetchCategoriesCall = async () => {
  try{
    const res = await axios.get(`http://localhost:3000/api/v1/categories`)
    const data = res.data
    return data
  }catch(e) {
    console.log(e);
  }
}
