"use client";

import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../(components)/Rating";

const CardPopularProducts = () => {
  const {
    data: dashboardMetrics,
    isLoading,
    isError,
    error,
  } = useGetDashboardMetricsQuery();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl flex flex-col">
      {isLoading ? (
        <div className="m-5 text-gray-700 dark:text-gray-300">Loading...</div>
      ) : isError ? (
        <div className="m-5 text-red-500">
          Failed to load products: {JSON.stringify(error)}
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h3 className="text-lg font-semibold px-6 pt-5 pb-2 text-gray-900 dark:text-white">
              Popular Products
            </h3>
            <hr className="border-gray-200 dark:border-gray-700" />
          </div>

          {/* LIST */}
          <div className="overflow-auto max-h-[300px]">
            {(dashboardMetrics?.popularProducts ?? []).map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700"
              >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs text-gray-400 dark:text-gray-500">
                    img
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-gray-700 dark:text-gray-100 text-sm">
                      {product.name}
                    </div>

                    <div className="flex text-xs items-center text-gray-500 dark:text-gray-400">
                      <span className="font-bold text-blue-500">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-xs flex items-center text-gray-600 dark:text-gray-400">
                  <button className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
