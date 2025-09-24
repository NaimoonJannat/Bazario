import React, { useEffect, useState } from "react";
import axios from "axios";

const OutofStock = () => {
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        const filtered = res.data.filter(
          (product) => Number(product.quantity) === 0
        );
        setOutOfStockProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRestock = (productId) => {
    console.log("Restock requested for:", productId);
    // Later you can call your backend API here:
    // axios.patch(`http://localhost:5000/products/${productId}`, { quantity: newQuantity });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold">Loading out of stock products...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
        Out of Stock
      </h2>

      {outOfStockProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          ✅ All products are in stock!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {outOfStockProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-gray-700 font-bold">Price: {product.price}৳</p>
                <p className="text-red-600 font-medium">Out of Stock</p>
                <button
                  onClick={() => handleRestock(product._id)}
                  className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Restock
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OutofStock;
