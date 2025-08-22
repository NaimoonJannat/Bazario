import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { FaBoxOpen, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = () => {
  const incomingOrders = [
    { id: 1, customer: "Alice", product: "Headphones", time: "2 mins ago" },
    { id: 2, customer: "Bob", product: "Mic", time: "5 mins ago" },
    { id: 3, customer: "Charlie", product: "Webcam", time: "10 mins ago" },
  ];

  const restockItems = ["Mouse", "Keyboard", "Charger", "Speakers"];
  const expiredItems = ["USB Cable", "Webcam Cover", "Old Adapter"];

  const pieData = [
    { name: 'Electronics', value: 400 },
    { name: 'Accessories', value: 300 },
    { name: 'Cables', value: 300 },
    { name: 'Others', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const barData = [
    { name: 'Jan', sales: 400 },
    { name: 'Feb', sales: 300 },
    { name: 'Mar', sales: 500 },
    { name: 'Apr', sales: 600 },
    { name: 'May', sales: 700 },
  ];

  return (
    <div className="bg-[#d4ff00] text-[#001f3f] p-6 rounded-lg">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Dashboard</h1>

      {/* Incoming Orders */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Incoming Orders</h2>
        <ul className="space-y-2">
          {incomingOrders.map(order => (
            <li key={order.id} className="bg-white text-[#001f3f] p-4 rounded shadow flex items-center gap-4">
              <FaBoxOpen className="text-xl" />
              <div>
                <p><strong>{order.customer}</strong> ordered <strong>{order.product}</strong></p>
                <span className="text-sm text-gray-500">{order.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Restock Items Slider */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Needs Restocking Soon</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {restockItems.map((item, idx) => (
            <div key={idx} className="min-w-[200px] bg-white p-4 rounded shadow flex items-center gap-3">
              <FaExclamationTriangle className="text-red-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expired Items Slider */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Expired Items</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {expiredItems.map((item, idx) => (
            <div key={idx} className="min-w-[200px] bg-white p-4 rounded shadow flex items-center gap-3">
              <FaClock className="text-yellow-600" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#001f3f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
