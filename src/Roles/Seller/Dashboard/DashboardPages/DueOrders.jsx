import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router";

const DueOrders = () => {
  const [orders, setOrders] = useState([]);
  const [productsCache, setProductsCache] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const openModal = async (order) => {
    // fetch all product details first
    await Promise.all(order.orders.map((item) => fetchProduct(item.productId)));
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="p-4">
         {/* Header section  */}
            <div className='flex flex-row justify-between items-center'>
                 <h2 className="text-4xl font-bold mb-6">Due Orders</h2>
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
              <tr key={order._id} className="border-b hover:bg-gray-50">
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
                    onClick={() => openModal(order)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaList size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold mb-4">Order Details</h3>

            <div className="mb-4">
              <p>
                <span className="font-semibold">Customer:</span>{" "}
                {selectedOrder.name}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedOrder.phone}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {selectedOrder.address}
              </p>
            </div>

            <h4 className="font-semibold mb-2">Products</h4>
            <ul className="divide-y">
              {selectedOrder.orders.map((item, i) => {
                const product = productsCache[item.productId];
                return (
                  <li key={i} className="flex justify-between py-2">
                    <span>
                      {product ? product.title : "Loading..."} x {item.quantity}
                    </span>
                    <span>
                      ৳
                      {product
                        ? parseInt(product.price) * item.quantity
                        : "..."}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 text-right space-y-1">
              <p>Subtotal: ৳{selectedOrder.subtotal}</p>
              <p>Delivery: ৳{selectedOrder.delivery}</p>
              <p className="font-bold">
                Total: ৳{selectedOrder.subtotal + selectedOrder.delivery}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-[#001f3f] text-white px-4 py-2 rounded-lg hover:bg-[#003366]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DueOrders;
