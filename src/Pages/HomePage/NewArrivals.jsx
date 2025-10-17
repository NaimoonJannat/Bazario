import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const [newProducts, setNewProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://bazario-server-pearl.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        // Sort products by creation date (most recent first)
        const sorted = data
          .filter((item) => item.createdAt)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNewProducts(sorted.slice(0, 6)); // Show latest 6 products
      })
      .catch((err) => console.error("Error fetching new arrivals:", err));
  }, []);

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#002b5c] to-[#001f3f] text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#d4ff00] tracking-wide">
        🆕 New Arrivals
      </h2>

      {newProducts.length === 0 ? (
        <p className="text-center text-gray-300 text-lg">Loading latest products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {newProducts.map((product, index) => (
            <motion.div
              key={product._id || index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => navigate(`/products/product/${product._id}`)}
              className="relative bg-white/10 border border-[#d4ff00]/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-[#d4ff00]/40 cursor-pointer transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/250"}
                  alt={product.title}
                  className="h-52 w-full object-cover rounded-t-2xl"
                />
                <span className="absolute top-3 left-3 bg-[#d4ff00] text-[#001f3f] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Just In
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 text-[#d4ff00] truncate">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                  {product.description?.slice(0, 60)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">
                    ৳ {product.price}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-[#d4ff00] text-[#001f3f] font-semibold rounded-lg hover:bg-[#c6f000] transition-colors"
                  >
                    View
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewArrivals;
