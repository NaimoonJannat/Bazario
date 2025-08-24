import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { AiOutlineClose } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loader from './Loader'
import { Link } from 'react-router';

const Cart = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart items from backend
//   const fetchCart = async () => {
//     if (!user?.email) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/users/${user?.email}/cart`);
//       const data = await res.json();
//       setCartItems(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

  useEffect(() => {
  if (isOpen && user?.email) {
    (async () => {
      const res = await fetch(`http://localhost:5000/users/${user?.email}/cart`);
      const data = await res.json();
      setCartItems(data);
    })();
  }
}, [isOpen, user?.email]);

  // Remove item from cart
  const removeFromCart = async (productId) => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This item will be removed from your cart.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, remove it!"
  });

  if (!confirm.isConfirmed) return;

  try {
    const res = await fetch(`http://localhost:5000/users/${user?.email}/cart/${productId}`, {
      method: 'DELETE',
    });
    const data = await res.json();

    if (data.success) {
      setCartItems(prev => prev.filter(item => item.productId !== productId));
      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "Item removed from cart",
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: data.message || "Could not remove item",
      });
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Could not remove item from cart",
    });
  }
};


  // Update quantity directly from cart
  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      const res = await fetch(`http://localhost:5000/users/${user?.email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: newQty })
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(prev =>
          prev.map(item =>
            item.productId === productId ? { ...item, quantity: newQty } : item
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.product.price) || 0;
    const quantity = item.quantity || 0;
    return acc + price * quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-xl font-semibold text-[#001f3f] dark:text-white mb-4">My Cart</h2>

        {loading ? (
          <p className="text-gray-700 dark:text-gray-300"><Loader /></p>
        ) : cartItems.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">Your cart is empty.</p>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center justify-between border-b py-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-[#001f3f] dark:text-white">{item.product.title} x{item.quantity}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Price: ৳ {item.product.price}
                      </p>
                      {/* Quantity bar */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex justify-center items-center text-xl font-bold border text-[#d4ff00] rounded-lg bg-gray-800 hover:bg-[#d4ff00] hover:text-[#001f3f] transition"
                        >-</button>
                        <span className="w-8 text-[#001f3f] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 text-[#d4ff00] flex justify-center items-center text-xl font-bold border rounded-lg bg-gray-800 hover:bg-[#d4ff00] hover:text-[#001f3f] transition"
                        >+</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold text-[#001f3f] dark:text-white">
                      ৳ {item.quantity * parseFloat(item.product.price)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#001f3f] dark:text-white">
                Subtotal: ৳ {subtotal.toFixed(2)}
              </h3>
              <Link to={"/checkout"}>
              <div className="px-4 py-2 bg-[#d4ff00] text-[#001f3f] font-semibold rounded hover:bg-[#c0e600]">
                Checkout
              </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
