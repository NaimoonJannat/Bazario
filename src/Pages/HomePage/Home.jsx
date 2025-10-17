import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import HeroBanner from "./HeroBanner";
import Recommendation from "./RecommendationAI";
import FeedbackSection from "./FeedbackSection";
import NewArrivals from "./NewArrivals";
import BestDeals from "./BestDeals";
import HomeCategory from "./HomeCategory";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all products and orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, orderRes] = await Promise.all([
          fetch("https://bazario-server-pearl.vercel.app/products"),
          fetch("https://bazario-server-pearl.vercel.app/orders"),
        ]);

        const productsData = await productRes.json();
        const ordersData = await orderRes.json();

        setProducts(productsData);

        // ---- Trending logic based on order frequency ----
        const productFrequency = {};

        ordersData.forEach((order) => {
          order.cart?.forEach((item) => {
            const id = item.productId || item._id;
            if (id) {
              productFrequency[id] = (productFrequency[id] || 0) + (item.quantity || 1);
            }
          });
        });

        // Sort products by how many times they appear in orders
        const sortedTrending = [...productsData].sort((a, b) => {
          const freqA = productFrequency[a._id] || 0;
          const freqB = productFrequency[b._id] || 0;
          return freqB - freqA;
        });

        // Take top 6 trending
        setTrendingProducts(sortedTrending.slice(0, 6));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#001f3f] text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <HeroBanner />

      {/* Recommendation Section */}
      <Recommendation />

      {/* Categories Section */}
     <HomeCategory />

      {/* Best Deals Section */}
     <BestDeals />

      {/* Feedback Section */}
      <FeedbackSection />

      {/* New Arrivals section  */}
      <NewArrivals />

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-[#001f3f] via-[#002b5c] to-[#001f3f] relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-[#d4ff00] mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-gray-200 mb-8">
            Explore our handpicked collections and get exclusive deals today!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-[#d4ff00] to-[#b3ff00] text-[#001f3f] px-8 py-4 rounded-xl font-bold flex items-center gap-3 mx-auto hover:scale-105 transition-transform shadow-md"
          >
            Explore Products <FaArrowRight />
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
