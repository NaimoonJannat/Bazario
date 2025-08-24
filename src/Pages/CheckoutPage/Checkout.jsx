import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../../Provider/AuthProvider"; 
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [cart, setCart] = useState([]);
  const [note, setNote] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(70);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    // Fetch profile info
    axios
      .get(`http://localhost:5000/users/${user.email}`)
      .then((res) => {
        setProfile(res.data);

        // Check if phone or address is missing
        if (!res.data.address || !res.data.phone) {
          Swal.fire({
            icon: "warning",
            title: "Incomplete Profile",
            html: `Please go to your profile and update information to confirm your order. Thank You.<br/><br/><button id="goProfile" class="swal2-confirm swal2-styled">Go to Profile</button>`,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              const btn = document.getElementById("goProfile");
              btn.addEventListener("click", () => {
                navigate("/profile");
              });
            },
          });
        }
      })
      .catch((err) => console.log(err));

    // Fetch cart info
    axios
      .get(`http://localhost:5000/users/${user.email}/cart`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, [user?.email, navigate]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal + deliveryCharge;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-10">
      {/* Left: Customer Info */}
      <div className="flex-1 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">
          Enter your details for order confirmation
        </h2>

        <div className="mb-4">
          <label className="block mb-1">Your Name</label>
          <input
            type="text"
            value={profile.name || ""}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Your Mobile Number</label>
          <input
            type="text"
            value={profile.phone || ""}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Your Address</label>
          <input
            type="text"
            value={profile.address || ""}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Delivery Area</label>
          <select
            value={deliveryCharge === 70 ? "inside" : "outside"}
            onChange={(e) =>
              setDeliveryCharge(e.target.value === "inside" ? 70 : 130)
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="inside">Inside Dhaka 70 taka Delivery charge</option>
            <option value="outside">Outside Dhaka 130 taka Delivery charge</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Delivery Note / Customer Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Add a note if needed..."
          />
        </div>

        <button
          className="w-full bg-[#d4ff00] text-[#001f3f] hover:text-[#d4ff00] hover:bg-[#001f3f] transition-0.5 py-3 rounded font-semibold"
          onClick={() => {
            if (!profile.address || !profile.phone) {
              Swal.fire({
                icon: "warning",
                title: "Incomplete Profile",
                text: "Please update your address and phone in your profile to place the order.",
              });
              return;
            }
            // Confirm order logic here
          }}
        >
          Confirm Order
        </button>
      </div>

      {/* Right: Cart Info */}
      <div className="flex-1 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Order Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Image</th>
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Price</th>
                <th className="text-center p-2">Quantity</th>
                <th className="text-left p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product._id} className="border-b">
                  <td className="p-2">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{item.product.title}</td>
                  <td className="p-2">৳{item.product.price}</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2">৳{item.product.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 space-y-2 text-right">
            <div>
              <span className="font-semibold">Subtotal:</span> ৳{subtotal}
            </div>
            <div>
              <span className="font-semibold text-red-600">
                Delivery charge:
              </span>{" "}
              {deliveryCharge}
            </div>
            <div className="font-bold text-lg">Total: ৳{total}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
