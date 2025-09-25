import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { IoMdPrint } from "react-icons/io";

const History = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`https://bazario-server-pearl.vercel.app/orders/${user.email}`);
        setOrders(res.data); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const handlePrint = (orderId) => {
    const receiptUrl = `https://bazario-server-pearl.vercel.app/orders/${orderId}/receipt`;
    window.open(receiptUrl, "_blank");
  };

  return (
    <div className="relative overflow-x-auto shadow-xl sm:rounded-xl p-6" style={{ backgroundColor: "#001f3f" }}>
      <table className="w-full text-sm text-left text-gray-200">
        <thead className="text-xs uppercase bg-[#d4ff00] text-[#001f3f]">
          <tr>
            <th className="px-6 py-3 rounded-tl-lg">ID No</th>
            <th className="px-6 py-3">Date Ordered</th>
            <th className="px-6 py-3">Address</th>
            <th className="px-6 py-3">Phone No</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 rounded-tr-lg">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-[#d4ff00]">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order, idx) => (
              <tr
                key={order._id}
                className="hover:bg-[#002b5c] transition-colors duration-200"
              >
                <td className="px-6 py-4 font-semibold">{idx + 1}</td>
                <td className="px-6 py-4">{new Date(order.orderedAt).toLocaleString()}</td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">{order.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`h-3 w-3 rounded-full mr-2 ${
                        order.status === "pending"
                          ? "bg-[#d4ff00]"
                          : order.status === "delivered"
                          ? "bg-green-400"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span className="font-medium">{order.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handlePrint(order._id)}
                    className="flex items-center text-[#d4ff00] font-semibold hover:underline"
                  >
                    <IoMdPrint className="mr-2 text-xl" /> Print
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
