import React, { useState } from 'react';

const ProductCard = () => {
    const [hovered, setHovered] = useState(false);
    return (
         <div
      className="w-64 bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <img
        src="https://res.cloudinary.com/auraloom/image/upload/v1753455945/bazario/dfmz7nmykbgd2ljbgg8n.jpg"
        alt="Product"
        className="w-full h-72 object-cover"
      />

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Daawat Basmati Rice 5kg
        </h3>
        <p className="text-gray-600">750</p>
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