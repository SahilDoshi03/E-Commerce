type User = {
  email: string;
  password: string;
};

type Address = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
};

export type { User, Address };
