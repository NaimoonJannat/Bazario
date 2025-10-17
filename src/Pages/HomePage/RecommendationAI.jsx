import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import ProductCardH from "./ProductCardH";

import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const Recommendation = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    // Fetch user data to get recommendations
    axios
      .get(`https://bazario-server-pearl.vercel.app/users/${user.email}`)
      .then(async (res) => {
        const recommendationIds = res.data.recommendations || [];
        if (recommendationIds.length === 0) return;

        // Fetch product details for each recommended product
        const productsRes = await axios.post(
          `https://bazario-server-pearl.vercel.app/products/recommendations`,
          { ids: recommendationIds }
        );
        setRecommendedProducts(productsRes.data);
      })
      .catch((err) => console.error("Failed to fetch recommendations:", err));
  }, [user?.email]);

  // If user is not logged in
  if (!user?.email) {
    return (
      <section className="py-12 px-6 text-center bg-[#001f3f] rounded-xl">
        <h2 className="text-3xl font-bold mb-4 text-[#d4ff00]">
          Personalized Recommendations
        </h2>
        <p className="text-gray-300 mb-6">
          Log in to your account to get personalized product recommendations!
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-[#d4ff00] text-[#001f3f] px-6 py-3 rounded-lg font-semibold hover:bg-[#b3ff00] transition"
        >
          Log In
        </button>
      </section>
    );
  }

  // If no recommendations, hide the section
  if (recommendedProducts.length === 0) return null;

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-8 text-[#d4ff00]">
        Recommended For You
      </h2>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {recommendedProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <div
              onClick={() => navigate(`/products/product/${product._id}`)}
              className="cursor-pointer"
            >
              <ProductCardH product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Recommendation;
