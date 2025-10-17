import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BestDeals = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products and show 4 lowest-priced items as "Best Deals"
    fetch("https://bazario-server-pearl.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        // Sort by price ascending (cheapest first)
        const sorted = data.sort((a, b) => a.price - b.price);
        setProducts(sorted.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching best deals:", err));
  }, []);

  return (
    <section className="py-16 px-6 md:px-12 bg-[#d4ff00] text-[#001f3f]">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        🔥 Best Deals of the Week
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-[#001f3f]/70 text-lg font-medium">
          Loading best deals...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <motion.div
              key={product._id}
              onClick={() => navigate(`/products/product/${product._id}`)}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:shadow-2xl"
            >
              <img
                src={product.images?.[0] || "https://via.placeholder.com/200"}
                alt={product.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1 truncate">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                  {product.description?.slice(0, 60)}...
                </p>
                <p className="font-bold text-[#001f3f] text-lg">
                  ৳ {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BestDeals;
