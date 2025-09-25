import { useEffect, useState } from "react";
import HeroBanner from "./HeroBanner";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import ProductCardH from "./ProductCardH";
import FeedbackSection from "./FeedbackSection";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useNavigate } from "react-router-dom";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://bazario-server-pearl.vercel.app/products").then((res) => {
      const shuffled = res.data.sort(() => 0.5 - Math.random());
      setProducts(shuffled.slice(0, 8));
    });
  }, []);

  useEffect(() => {
  const lastViewed = localStorage.getItem("lastViewedProductId");
  if (lastViewed) {
    axios
      .get(`https://bazario-server-pearl.vercel.app/products/${lastViewed}/recommendations`)
      .then((res) => setRecommended(res.data));
  }
}, []);


  return (
    <div className="bg-[#001f3f] text-white min-h-screen">
      {/* Hero Section */}
      <HeroBanner />

      {/* You May Like Section */}
      {/* <section className="py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-[#d4ff00]">
          You May Like
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
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div
                onClick={() =>
                  navigate(`/products/product/${product._id}`)
                }
                className="cursor-pointer"
              >
                <ProductCardH product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section> */}

      {/* Recommended For You */}
{recommended.length > 0 && (
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
      {recommended.map((product) => (
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
)}


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
