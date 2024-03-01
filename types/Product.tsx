type Product = {
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

type Filters = Section[];

type Filter = {
  brand: string[];
  category: string[];
  sort?: string;
};

type Section = {
  id: "brand" | "category";
  name: string;
  options: Brand[] | Category[];
};

type sortOption = {
  name: string;
  sort: string;
  current: boolean;
};

type Brand = {
  _id: string;
  label: string;
  value: string;
};

type Category = {
  _id: string;
  label: string;
  value: string;
};

export type { Product, Filters, Filter, Section, sortOption, Brand, Category };
