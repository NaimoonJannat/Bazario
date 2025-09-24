import { useLoaderData, useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FiHeart } from "react-icons/fi";
import { IoHeartSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const products = useLoaderData();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const product = products.find((task) => task._id === id);

  // Selected image state
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // Quantity state
  const [quantity, setQuantity] = useState(1);

  // Favorite state
  const [isFavorite, setIsFavorite] = useState(false);

  // Load if current product is already favorited by user
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(`http://localhost:5000/favorite/${user.email}`);
        const favoriteProducts = await res.json();

        if (
          Array.isArray(favoriteProducts) &&
          favoriteProducts.some((p) => p._id === product._id)
        ) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [user?.email, product._id]);

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

  const toggleFavorite = async () => {
    if (!user?.email) {
      Swal.fire("Oops!", "Please login to add favorites!", "warning");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/favorite/${user.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await res.json();
      if (data.success) {
        setIsFavorite(data.action === "added");
        Swal.fire(
          data.action === "added" ? "Added!" : "Removed!",
          data.action === "added"
            ? "Product added to favorites."
            : "Product removed from favorites.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  // ✅ Add to Cart handler
  const handleAddToCart = async () => {
    if (!user?.email) {
      Swal.fire("Oops!", "Please login to add items to cart!", "warning");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/users/${user.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
        }),
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire(
          "Added!",
          `${product.title} (x${quantity}) added to your cart.`,
          "success"
        );
      } else {
        Swal.fire("Error!", "Could not add product to cart.", "error");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  useEffect(() => {
  if (id) {
    localStorage.setItem("lastViewedProductId", id);
  }
}, [id]);


  return (
    <div className="card lg:card-side lg:p-8">
      {/* Left: Images */}
      <div className="lg:w-1/2 flex flex-col items-center gap-4">
        <img
          className="w-full border-2 border-[#d4ff00] rounded-2xl shadow-2xl shadow-[#d4ff00] object-contain max-h-[500px]"
          src={selectedImage}
          alt={product.title}
        />

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
      <div className="card-body lg:w-1/2 text-white relative">
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 text-2xl text-[#d4ff00] hover:scale-110 transition"
        >
          {isFavorite ? <IoHeartSharp /> : <FiHeart />}
        </button>

        <h2 className="text-4xl font-bold">{product.title}</h2>
        <div className="divider"></div>
        <div className="text-[#d4ff00] font-bold">{product.category}</div>
        <div className="divider"></div>
        <div>
          <p className="text-base">{product.description}</p>
        </div>
        <div className="divider"></div>

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
          <button
            onClick={handleAddToCart}
            className="btn bg-[#d4ff00] text-[#001f3f]"
          >
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
