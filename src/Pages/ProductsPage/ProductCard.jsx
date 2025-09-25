import { useState, useContext } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const ProductCard = ({ product }) => {
  const { title, _id, price, quantity, images } = product;
  const [hovered, setHovered] = useState(false);
  const { user } = useContext(AuthContext);

  const handleAddToCart = async (e) => {
    e.preventDefault(); // prevent Link navigation when button clicked

    if (!user?.email) {
      Swal.fire("Oops!", "Please login to add items to cart!", "warning");
      return;
    }

    try {
      const res = await fetch(`https://bazario-server-pearl.vercel.app/users/${user?.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: _id, quantity: 1 }), // default 1 when adding from card
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire("Added!", "Product added to cart.", "success");
      } else {
        Swal.fire("Error!", data.message || "Could not add to cart.", "error");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <Link to={`product/${_id}`}>
      <div
        className="w-full bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Product Image */}
        <img src={images[0]} alt={title} className="w-full h-72 object-cover" />

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <div className="flex flex-row text-[#001f3f] justify-center items-center gap-8">
            <p className="font-bold">{price} ৳ </p>
            <p>{quantity} Items left</p>
          </div>
        </div>

        {/* Hover Add to Cart */}
        {hovered && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[85%]">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#d4ff00] text-[#001f3f] py-2 rounded-xl font-medium hover:bg-[#829c01] transition"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
