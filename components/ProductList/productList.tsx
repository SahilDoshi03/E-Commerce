import { StarIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "@/lib/redux";
import { useEffect } from "react";
import { getProducts, selectProducts, statusProducts } from "@/lib/redux";
import type { Filter, Product } from "@/types/Product";

export default function ProductList({ filters }: { filters: Filter }) {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(statusProducts);

  useEffect(() => {
    dispatch(getProducts(filters));
  }, [filters]);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>Error...</h1>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product: Product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={`/${product._id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    <StarIcon className="w-6 h-6 inline"></StarIcon>
                    <span className="align-bottom">{product.rating}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    $
                    {Math.round(
                      product.price * (1 - product.discountPercentage / 100)
                    )}
                  </p>
                  <p className="text-sm font-medium line-through text-gray-400">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
