import { useEffect, useState } from "react";
import HeroBanner from "./HeroBanner";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import ProductCardH from "./ProductCardH";



const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      // Pick random 8 products
      const shuffled = res.data.sort(() => 0.5 - Math.random());
      setProducts(shuffled.slice(0, 8));
    });
  }, []);

  return (
    <div className="bg-[#001f3f] text-white min-h-screen">
      {/* Hero Section */}
      <HeroBanner />

      {/* You May Like Section */}
      <section className="py-10 px-6">
        <h2 className="text-3xl font-bold mb-6 text-[#d4ff00]">
          You May Like
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {products.map((product) => (
            <ProductCardH key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-10 px-6">
        <h2 className="text-3xl font-bold mb-6 text-[#d4ff00]">Shop by Category</h2>
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
<section className="py-10 px-6 bg-[#d4ff00] text-[#001f3f]">
  <h2 className="text-3xl font-bold mb-6">Best Deals</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.slice(0, 4).map((product) => (
      <div
        key={product._id}
        className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
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


      {/* Customer Reviews */}
      <section className="py-10 px-6">
        <h2 className="text-3xl font-bold mb-6 text-[#d4ff00]">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Great experience, fast delivery!",
            "Products are fresh and good quality.",
            "Super easy ordering process!"
          ].map((review, i) => (
            <div
              key={i}
              className="bg-white text-[#001f3f] p-6 rounded-2xl shadow-md"
            >
              <p>"{review}"</p>
              <p className="mt-3 font-semibold text-right">- Customer {i + 1}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 px-6 text-center">
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
