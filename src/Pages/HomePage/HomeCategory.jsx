import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://bazario-server-pearl.vercel.app/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        // Count categories
        const categoryCount = {};
        data.forEach((p) => {
          if (p.category) categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
        });

        // Sort by frequency
        const sortedCategories = Object.keys(categoryCount).sort(
          (a, b) => categoryCount[b] - categoryCount[a]
        );

        setCategories(sortedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-12 px-6 md:px-12 bg-gradient-to-b from-[#001f3f] to-[#002b5c]">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#d4ff00]">
        Shop by Category
      </h2>

      <div className="overflow-hidden relative">
        {/* Sliding container */}
        <div className="flex gap-6 animate-slide whitespace-nowrap">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat)}`)}
              className="inline-block cursor-pointer bg-white/10 backdrop-blur-md border border-[#d4ff00]/40 px-6 py-4 rounded-2xl text-center font-semibold text-[#d4ff00] hover:bg-[#d4ff00] hover:text-[#001f3f] transition-all duration-300"
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* CSS for sliding */}
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-slide {
            display: inline-flex;
            gap: 1.5rem;
            animation: slide 20s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default HomeCategory;
