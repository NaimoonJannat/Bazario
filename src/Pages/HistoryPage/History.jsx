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
        const res = await axios.get(`http://localhost:5000/orders/${user.email}`);
        setOrders(res.data); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const handlePrint = (orderId) => {
    // Open the receipt PDF in a new tab
    const receiptUrl = `http://localhost:5000/orders/${orderId}/receipt`;
    window.open(receiptUrl, "_blank");
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">ID No</th>
            <th className="px-6 py-3">Date Ordered</th>
            <th className="px-6 py-3">Address</th>
            <th className="px-6 py-3">Phone No</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order, idx) => (
              <tr
                key={order._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4">
                  {new Date(order.orderedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">{order.phone}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded font-semibold ${
                      order.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "delivered"
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handlePrint(order._id)}
                    className="text-[#001f3f] text-xl hover:underline"
                  >
                    <IoMdPrint />
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
