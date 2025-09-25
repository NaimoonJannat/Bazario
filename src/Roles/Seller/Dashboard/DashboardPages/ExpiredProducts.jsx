import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpiredProducts = () => {
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://bazario-server-pearl.vercel.app/products");
        const today = new Date();
        const filtered = res.data.filter(
          (product) => new Date(product.expireDate) < today
        );
        setExpiredProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold">Loading expired products...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
        Expired Products
      </h2>

      {expiredProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          🎉 No expired products found!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {expiredProducts.map((product) => (
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
                <p className="text-gray-700 font-bold">
                  Price: {product.price}৳
                </p>
                <p className="text-red-600 text-sm font-medium">
                  Expired on:{" "}
                  {new Date(product.expireDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm">
                  {product.description?.slice(0, 60)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpiredProducts;
