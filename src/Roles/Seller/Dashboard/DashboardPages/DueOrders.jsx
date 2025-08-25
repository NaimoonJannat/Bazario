import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router";
import Loader from "./../../../../Components/Loader";  

const DueOrders = () => {
  const [orders, setOrders] = useState([]);
  const [productsCache, setProductsCache] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // loader state

  const rowsPerPage = 6;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/orders");
      // Filter out delivered orders
      const dueOrders = res.data.filter(
        (order) => order.status === "pending" || order.status === "approved"
      );
      setOrders(dueOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
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
    await Promise.all(order.orders.map((item) => fetchProduct(item.productId)));
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updateData = { status: newStatus };

      if (newStatus === "delivered") {
        updateData.deliveredTime = new Date().toISOString();
      }

      await axios.put(`http://localhost:5000/orders/id/${orderId}`, updateData);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, ...updateData } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const totalPages = Math.ceil(orders.length / rowsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-4xl font-bold mb-6">Due Orders</h2>
        <Link to={"/dashboard/order-history"}>
          <div className="px-4 py-2 bg-[#001f3f] text-[#d4ff00] font-semibold rounded hover:text-[#001f3f] hover:bg-[#d4ff00]">
            Order History
          </div>
        </Link>
      </div>

      {/* Loader */}
      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          There is no Due Order Right now!
        </p>
      ) : (
        <div className="flex flex-col min-h-[500px]">
          <div className="overflow-x-auto flex-grow">
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
                {paginatedOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{order._id}</td>
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
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border rounded p-1"
                      >
                        <option
                          value="pending"
                          disabled={order.status !== "pending"}
                        >
                          Pending
                        </option>
                        <option
                          value="approved"
                          disabled={order.status === "delivered"}
                        >
                          Approved
                        </option>
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

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-5 py-2 text-sm text-[#d4ff00] capitalize transition-colors duration-200 bg-[#001f3f] border rounded-md gap-x-2 disabled:opacity-50 hover:text-[#001f3f] hover:bg-[#d4ff00]"
            >
              <span>Previous</span>
            </button>

            <div className="items-center hidden lg:flex gap-x-3">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-2 py-1 text-sm rounded-md ${
                    currentPage === i + 1
                      ? "text-[#001f3f] bg-[#d4ff00]"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-5 py-2 text-sm text-[#d4ff00] capitalize transition-colors duration-200 bg-[#001f3f] border rounded-md gap-x-2 disabled:opacity-50 hover:text-[#001f3f] hover:bg-[#d4ff00]"
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
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
