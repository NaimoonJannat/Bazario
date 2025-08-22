import { useState } from 'react';

const ProductCard = ({product}) => {
    // const {title, _id, description, category, price, expireDate, quantity, createdAt, images} = product;
    const {title, _id, price, quantity, images} = product;
    const [hovered, setHovered] = useState(false);
    return (
         <div
      className="w-full bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <img
        src={images[0]}
        alt="Product"
        className="w-full h-72 object-cover"
      />

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
        <p className="text-gray-600">{price} ৳ </p>
        <p className="">{quantity} Items left</p>

      </div>

      {/* Hover Add to Cart */}
      {hovered && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[85%]">
          <button className="w-full bg-green-600 text-white py-2 rounded-xl font-medium hover:bg-green-700 transition">
            Add to Cart
          </button>
        </div>
      )}
    </div>
    );
};

export default ProductCard;