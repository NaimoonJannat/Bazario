import React from 'react';

const ProductCardH = ({ product }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-64 flex-shrink-0 hover:scale-105 transition-transform duration-300">
      <img
  src={product.images?.[0] || "https://via.placeholder.com/200"}
  alt={product.title}
  className="h-40 w-full object-cover rounded-xl mb-3"
/>

      <h3 className="text-lg font-semibold text-[#001f3f]">{product.title}</h3>
      <p className="text-[#001f3f] font-bold">৳ {product.price}</p>
    </div>
    );
};

export default ProductCardH;

