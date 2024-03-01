"use client";

import Protected from "@/components/Protected/Protected";
const { nanoid } = require("nanoid");
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useSelector,
  useDispatch,
  getUser,
  getCart,
  selectUser,
  selectCart,
  updateCart,
  deleteFromCart,
  createOrder,
  selectUserStatus,
  selectCartStatus,
  addUserAddress,
  deleteUserAddress,
  deleteCart,
} from "@/lib/redux";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Address } from "@/types/User";

function Checkout() {
  const router = useRouter()
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const statusUser = useSelector(selectUserStatus);
  const statusCart = useSelector(selectCartStatus);
  const [selectedAddress, setSelectedAddress] = useState<null | Address>(null);
  const [paymentMethod, setPaymentMethod] = useState<null | string>(null);

  const cart = useSelector(selectCart);

  const handleQuantity = (
    e: React.ChangeEvent<HTMLSelectElement>,
    productId: string
  ) => {
    dispatch(updateCart({ productId, quantity: Number(e.target.value) }));
  };

  const handleRemoveCart = (productId: string) => {
    dispatch(deleteFromCart(productId));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getCart());
    }
  }, [dispatch]);

  const totalAmount =
    cart.length > 0
      ? cart.reduce(
          (amount, item) =>
            Math.round(
              item.product.price * (1 - item.product.discountPercentage / 100)
            ) *
              item.quantity +
            amount,
          0
        )
      : 0;

  useEffect(() => {
    dispatch(getUser());
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Address>();

  const handleAddAddress: SubmitHandler<Address> = async (data) => {
    const addressId = nanoid();
    dispatch(addUserAddress({ ...data, _id: addressId }));
  };

  const handleRemoveAddress = (addressId: string) => {
    dispatch(deleteUserAddress(addressId));
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(user?.addresses[Number(e.target.value)] ?? null);
  };

  const handlePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        cart,
        totalAmount,
        user: user?._id,
        paymentMethod,
        selectedAddress,
        status: "pending", // other status can be delivered, received.
      };
      dispatch(createOrder(order));
      dispatch(deleteCart())
      alert('Order Placed')
      router.push('/')
      // need to redirect from here to a new page of order success.
    } else {
      alert("Enter Address and Payment method");
    }
  };

  if (statusCart === "loading" || statusUser === "loading") {
    return <h1>Loading...</h1>;
  }

  if (statusCart === "error" || statusUser === "error") {
    return <h1>Error...</h1>;
  }

  return (
    <Protected>
      {user && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <form
                noValidate
                className="bg-white px-5 py-12 my-12 rounded-lg"
                onSubmit={handleSubmit(handleAddAddress)}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.name && (
                            <p className="text-xs text-red-500">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "phone is required",
                            })}
                            type="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-500">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("address", {
                              required: "street is required",
                            })}
                            id="address"
                            autoComplete="address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.address && (
                            <p className="text-xs text-red-500">
                              {errors.address.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.city && (
                            <p className="text-xs text-red-500">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state is required",
                            })}
                            id="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.state && (
                            <p className="text-xs text-red-500">
                              {errors.state.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Pin Code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "pinCode is required",
                            })}
                            id="pinCode"
                            autoComplete="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.pinCode && (
                            <p className="text-xs text-red-500">
                              {errors.pinCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={() => reset()}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Addresses
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from Existing addresses
                    </p>
                    <ul role="list">
                      {user.addresses.length > 0 &&
                        user.addresses.map((address, index: number) => (
                          <li
                            key={address._id}
                            className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                          >
                            <div className="flex gap-x-4">
                              <input
                                onChange={handleAddress}
                                name="address"
                                type="radio"
                                value={index}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                  {address.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address.address}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {address.pinCode}
                                </p>
                              </div>
                            </div>
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">
                                Phone: {address.phone}
                              </p>
                              <p className="text-sm leading-6 text-gray-500">
                                {address.city}, {address.state}
                              </p>
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => handleRemoveAddress(address._id)}
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                    </ul>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment Methods
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose One
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="cash"
                              name="payments"
                              onChange={handlePayment}
                              type="radio"
                              value="cash"
                              checked={paymentMethod === "cash"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="cash"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="card"
                              onChange={handlePayment}
                              name="payments"
                              checked={paymentMethod === "card"}
                              value="card"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="card"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="lg:col-span-3 mt-4">
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white rounded-lg mt-[2rem]">
                <h1 className="py-6 text-3xl font-semibold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cart.length > 0 ? (
                        cart.map((item, idx) => (
                          <li key={idx} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.thumbnail}
                                alt={item.product.description}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <div>{item.product.title}</div>
                                  </h3>
                                  <div>
                                    <p className="text-lg font-medium text-gray-900">
                                      $&nbsp;
                                      {item.quantity *
                                        Math.round(
                                          item.product.price *
                                            (1 -
                                              item.product.discountPercentage /
                                                100)
                                        )}
                                    </p>
                                    <p className="text-base font-medium line-through text-gray-400">
                                      $&nbsp;
                                      {item.quantity * item.product.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty
                                  <select
                                    className="mx-2 rounded-md text-sm"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleQuantity(e, item.product._id)
                                    }
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </label>

                                <div className="flex">
                                  <button
                                    type="submit"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() =>
                                      handleRemoveCart(item.product._id)
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <h1 className="my-6 text-xl justify-self-center">
                          Cart is Empty!{" "}
                          <Link
                            href="/"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </h1>
                      )}
                    </ul>
                  </div>
                </div>

                {cart.length > 0 ? (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p className="text-xl">$&nbsp;{totalAmount}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={e => handleOrder(e)}
                        className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Order Now
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{` `}
                        <Link href={"/"}>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Protected>
  );
}

export default Checkout;
