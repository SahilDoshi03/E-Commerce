"use client";

import { useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  useSelector,
  getProductById,
  selectProducts,
  selectCart,
  useDispatch,
  statusProducts,
  addToCart,
} from "@/lib/redux";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const product = useSelector(selectProducts);
  const status = useSelector(statusProducts);

  const handleAddToCart = async (productId: string) => {
    try {
      if (cart.findIndex((item) => item.product._id === productId) < 0) {
        await dispatch(addToCart(productId));
        alert("Item added to cart successfully!");
      } else {
        alert("Item already added");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  useEffect(() => {
    dispatch(getProductById(params.id));
  }, []);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>Error...</h1>;
  }

  // We are using product[0] because we are receiving array from backend to be consistent with type of data being fetched
  // We were getting a type error or if we solve type error we were getting error with product.length because it can't be called on non-array data structures
  // Also empty array is treated as true so we had to use product.length to check instead of just product.

  return (
    <div className="bg-white">
      {product.length != 0 && (
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product[0].images[0]}
                alt={product[0].images[0]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product[0].images[1]}
                  alt={product[0].images[1]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product[0].images[2]}
                  alt={product[0].images[2]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product[0].images[3]}
                alt={product[0].images[3]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product[0].title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl font-medium text-gray-900">
                $
                {Math.round(
                  product[0].price * (1 - product[0].discountPercentage / 100)
                )}
              </p>
              <p className="text-2xl font-medium line-through text-gray-400">
                ${product[0].price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product[0].rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product[0].rating} out of 5 stars</p>
                  <div className="mt-[1rem] text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Average rating: {product[0].rating}
                  </div>
                </div>
              </div>

              <button
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => handleAddToCart(product[0]._id)}
              >
                Add to Cart
              </button>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product[0].description}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {product[0].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
