import { useState } from "react";
import HeroBanner from "./HeroBanner";
import { FaArrowRight } from "react-icons/fa";
import FeedbackSection from "./FeedbackSection";

// Swiper imports


import { useNavigate } from "react-router-dom";
import Recommendation from "./RecommendationAI";


const Home = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  


  return (
    <div className="bg-[#001f3f] text-white min-h-screen">
      {/* Hero Section */}
      <HeroBanner />

       {/* Recommendation section  */}
        <Recommendation></Recommendation>


      {/* Categories Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold mb-6 text-[#d4ff00]">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Electronics", "Grocery", "Fashion", "Books"].map((cat) => (
            <div
              key={cat}
              className="bg-white text-[#001f3f] p-6 rounded-2xl text-center font-semibold cursor-pointer hover:bg-[#d4ff00] hover:text-[#001f3f] transition"
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Best Deals Section */}
      <section className="py-12 px-6 bg-[#d4ff00] text-[#001f3f]">
        <h2 className="text-3xl font-bold mb-6">Best Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div
              key={product._id}
              onClick={() =>
                navigate(`/products/product/${product._id}`)
              }
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={product.images?.[0] || "https://via.placeholder.com/200"}
                alt={product.title}
                className="h-40 w-full object-cover rounded-xl mb-3"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="font-bold">৳ {product.price}</p>
            </div>
          ))}
        </div>
      </section>

      <FeedbackSection></FeedbackSection>

      {/* Trending products */}
<section className="py-12 px-6">
  <h2 className="text-3xl font-bold mb-6 text-[#d4ff00]">
    Trending Products
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.slice(0, 6).map((product) => (
      <div
        key={product._id}
        onClick={() => navigate(`/products/product/${product._id}`)}
        className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition cursor-pointer"
      >
        <img
          src={product.images?.[0] || "https://via.placeholder.com/200"}
          alt={product.title}
          className="h-40 w-full object-cover rounded-xl mb-3"
        />
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="font-bold">৳ {product.price}</p>
      </div>
    ))}
  </div>
</section>


      {/* Call to Action */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#d4ff00] mb-4">
          Ready to Shop?
        </h2>
        <p className="mb-6">Browse our products and place your order today!</p>
        <button className="bg-[#d4ff00] text-[#001f3f] px-6 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto hover:scale-105 transition">
          Explore Products <FaArrowRight />
        </button>
      </section>
    </div>
  );
};

export default Home;
