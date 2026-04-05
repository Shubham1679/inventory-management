"use client";

import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) {
    return (
      <div className="py-4 text-gray-700 dark:text-gray-300">Loading...</div>
    );
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch Products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800">
          <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Create Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {products?.map((product) => (
          <div
            key={product.productId}
            className="border border-gray-200 dark:border-gray-700 shadow rounded-md p-4 max-w-full w-full mx-auto bg-white dark:bg-gray-800"
          >
            <div className="flex flex-col items-center">
              {/* Image placeholder */}
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs text-gray-400 dark:text-gray-500 mb-3">
                img
              </div>
              <h3 className="text-lg text-gray-900 dark:text-white font-semibold">
                {product.name}
              </h3>
              <p className="text-gray-800 dark:text-gray-300">
                ${product.price.toFixed(2)}
              </p>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Stock: {product.stockQuantity}
              </div>
              {product.rating && (
                <div className="flex items-center mt-2">
                  <Rating rating={product.rating} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
