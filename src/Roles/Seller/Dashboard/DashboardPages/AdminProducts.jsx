import { useLoaderData } from "react-router";
import { useState } from "react";
import AdminProductCard from "./AdminProductCard";

const AdminProducts = () => {
  const products = useLoaderData();
  const [allProducts, setAllProducts] = useState(products);

  // remove deleted product from UI
  const handleDeleteUI = (id) => {
    setAllProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">
        Admin Products ({allProducts.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map((product) => (
          <AdminProductCard
            key={product._id}
            product={product}
            onDelete={handleDeleteUI}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
