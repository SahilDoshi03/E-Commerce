export type Product = {
  _id: string;
  thumbnail: string;
  title: string;
  rating: number;
  price: number;
  stock: number;
  images: string[];
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
};

export type Filters = Section[];

export type Filter = {
  brand: string[];
  category: string[];
  sort?: string;
};

export type Section = {
  id: "brand" | "category";
  name: string;
  options: Brand[] | Category[];
};

export type sortOption = {
  name: string;
  sort: string;
  current: boolean;
};

export type Brand = {
  _id: string;
  label: string;
  value: string;
}

export type Category = {
  _id: string;
  label: string;
  value: string;
}
