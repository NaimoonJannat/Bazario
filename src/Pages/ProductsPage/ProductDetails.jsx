import { useLoaderData, useParams } from "react-router";
import { useState } from "react";

const ProductDetails = () => {
  const products = useLoaderData();
  const { id } = useParams();
  const product = products.find((task) => task._id === id);

  // Selected image state
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // Quantity state
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="card lg:card-side lg:p-8">
      {/* Left: Images */}
      <div className="lg:w-1/2 flex flex-col items-center gap-4">
        {/* Big Image */}
        <img
          className="w-full border-2 border-[#d4ff00] rounded-2xl shadow-2xl shadow-[#d4ff00] object-contain max-h-[500px]"
          src={selectedImage}
          alt={product.title}
        />

        {/* Thumbnails */}
        <div className="flex gap-3 justify-center flex-wrap">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded-xl border-2 cursor-pointer transition ${
                selectedImage === img
                  ? "border-[#d4ff00] shadow-lg shadow-[#d4ff00]"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="card-body lg:w-1/2 text-white">
        <h2 className="text-4xl font-bold">{product.title}</h2>
        <div className="divider"></div>
        <div className="text-[#d4ff00] font-bold">{product.category}</div>
        <div className="divider"></div>
        <div>
          <p className="text-base">
            <span className="font-semibold"></span> {product.description}
          </p>
        </div>
        <div className="divider"></div>

        {/* Quantity & Expiry */}
        <div className="flex gap-4">
          <div>
            <p className="text-base">Quantity: </p>
            <p className="text-base">Expiry Date: </p>
          </div>
          <div>
            <p className="font-bold">{product.quantity}</p>
            <p className="font-bold">{product.expireDate}</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={decreaseQty}
            className="w-10 h-10 flex justify-center items-center text-xl font-bold border rounded-lg bg-gray-800 hover:bg-[#d4ff00] hover:text-[#001f3f] transition"
          >
            -
          </button>
          <span className="text-lg font-bold">{quantity}</span>
          <button
            onClick={increaseQty}
            className="w-10 h-10 flex justify-center items-center text-xl font-bold border rounded-lg bg-gray-800 hover:bg-[#d4ff00] hover:text-[#001f3f] transition"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <div className="card-actions justify-start flex gap-4 mt-6">
          <button className="btn bg-[#d4ff00] text-[#001f3f]">
            Add {quantity} to Cart
          </button>
          <button className="btn bg-[#001f3f] border-[#d4ff00] text-[#d4ff00]">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
