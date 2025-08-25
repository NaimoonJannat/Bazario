import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router";

const DueOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [productsCache, setProductsCache] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchProduct = async (productId) => {
    if (productsCache[productId]) {
      return productsCache[productId];
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/products/${productId}`
      );
      setProductsCache((prev) => ({ ...prev, [productId]: res.data }));
      return res.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  const toggleExpand = async (orderId) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  return (
    <div className="p-4">
      {/* Header section  */}
            <div className='flex flex-row justify-between items-center'>
                 <h2 className="text-5xl">Due Orders</h2>
              <Link to={"/order-history"}>
              <div className="px-4 py-2 bg-[#001f3f] text-[#d4ff00] font-semibold rounded hover:text-[#001f3f] hover:bg-[#d4ff00]">
                Order History
              </div>
              </Link>
            </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#001f3f] text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID No</th>
              <th className="py-3 px-4 text-left">Customer Info</th>
              <th className="py-3 px-4 text-left">Ordered At</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Note</th>
              <th className="py-3 px-4 text-left">List</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{order._id.slice(-6)}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-semibold">{order.name}</p>
                      <p>{order.phone}</p>
                      <p className="text-sm text-gray-500">{order.address}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(order.orderedAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      defaultValue={order.status}
                      className="border rounded p-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">{order.note}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleExpand(order._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaList size={20} />
                    </button>
                  </td>
                </tr>

                {/* Expanded row for order details */}
                {expandedRow === order._id && (
                  <tr>
                    <td colSpan="6" className="bg-gray-50 p-4">
                      <h3 className="font-semibold mb-2">Ordered Products:</h3>
                      <ul className="space-y-2">
                        {order.orders.map((item, i) => (
                          <li
                            key={i}
                            className="flex justify-between border-b pb-2"
                          >
                            <span>
                              {productsCache[item.productId]?.name ||
                                "Loading..."}
                              {"  "}x {item.quantity}
                            </span>
                            <span>
                              ৳
                              {(productsCache[item.productId]?.price || 0) *
                                item.quantity}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 text-right space-y-1">
                        <p>Subtotal: ৳{order.subtotal}</p>
                        <p>Delivery: ৳{order.delivery}</p>
                        <p className="font-bold">
                          Total: ৳{order.subtotal + order.delivery}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DueOrders;
