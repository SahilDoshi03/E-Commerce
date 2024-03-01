"use client";

import { useEffect } from "react";
import {
  useSelector,
  selectCart,
  selectCartStatus,
  getCart,
  deleteFromCart,
  updateCart,
  useDispatch,
} from "@/lib/redux";
import Link from "next/link";
import Protected from "@/components/Protected/Protected";

export default function Cart() {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const status = useSelector(selectCartStatus);

  const handleQuantity = (
    e: React.ChangeEvent<HTMLSelectElement>,
    productId: string
  ) => {
    dispatch(updateCart({ productId, quantity: Number(e.target.value) }));
  };

  const handleRemove = (productId: string) => {
    dispatch(deleteFromCart(productId));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getCart());
    }
    console.log('Effect', cart);
  }, [dispatch]);
  console.log('Outside', cart);
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

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>Error...</h1>;
  }

  return (
    <Protected>
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
                                    (1 - item.product.discountPercentage / 100)
                                )}
                            </p>
                            <p className="text-base font-medium line-through text-gray-400">
                              $&nbsp;{item.quantity * item.product.price}
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
                            onClick={() => handleRemove(item.product._id)}
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
              <Link
                href="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
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
    </Protected>
  );
}
