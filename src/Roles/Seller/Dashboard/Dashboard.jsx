import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";
import axios from "axios";

const COLORS = ['#06b6d4', '#0891b2', '#06b6a4', '#0ea5a0', '#14b8a6', '#06b6d4'];

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes, ordersRes, favRes] = await Promise.all([
          axios.get("http://localhost:5000/users"),
          axios.get("http://localhost:5000/products"),
          axios.get("http://localhost:5000/orders"),
          axios.get("http://localhost:5000/favorite"),
        ]);
        setUsers(usersRes.data);
        setProducts(productsRes.data);
        setOrders(ordersRes.data);
        setFavorites(favRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  const revenueData = (() => {
    const monthly = {};
    orders.forEach(order => {
      const month = new Date(order.orderedAt).toLocaleString("default", { month: "short" });
      monthly[month] = (monthly[month] || 0) + (order.subtotal + order.delivery);
    });
    return Object.keys(monthly).map(m => ({ name: m, revenue: monthly[m] }));
  })();

  const categoryData = (() => {
    const catMap = {};
    products.forEach(p => {
      catMap[p.category] = (catMap[p.category] || 0) + 1;
    });
    return Object.keys(catMap).map((c) => ({ name: c, value: catMap[c] }));
  })();

  const orderStatusData = (() => {
    const statusMap = {};
    orders.forEach(o => {
      statusMap[o.status] = (statusMap[o.status] || 0) + 1;
    });
    return Object.keys(statusMap).map(s => ({ status: s, count: statusMap[s] }));
  })();

  const totalRevenue = orders.reduce((acc, o) => acc + (o.subtotal + o.delivery), 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalProducts = products.length;

  return (
    <div className="p-4 sm:p-6 bg-gray-900 text-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">📊 Dashboard</h1>
        <div className="flex items-center bg-gray-800 px-3 py-2 rounded shadow w-full sm:w-auto">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none w-full sm:w-40 bg-transparent text-gray-200 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {[
          { title: "Users", value: totalUsers },
          { title: "Products", value: totalProducts },
          { title: "Orders", value: totalOrders },
          { title: "Revenue", value: `$${totalRevenue}` },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow flex flex-col items-center"
          >
            <FaDollarSign className="text-teal-400 text-xl sm:text-2xl mb-2" />
            <h2 className="text-base sm:text-lg font-semibold">{stat.title}</h2>
            <p className="text-lg sm:text-xl font-bold text-teal-300">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Revenue Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow"
        >
          <h2 className="font-semibold mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", color: "#fff" }} />
              <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow"
        >
          <h2 className="font-semibold mb-4">Product Categories</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ color: "#ddd" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Orders Status Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow lg:col-span-2"
        >
          <h2 className="font-semibold mb-4">Orders by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="status" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", color: "#fff" }} />
              <Bar dataKey="count" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
