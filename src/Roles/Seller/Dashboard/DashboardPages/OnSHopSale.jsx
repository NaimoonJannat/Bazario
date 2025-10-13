import React, { useState, useEffect } from "react";
import axios from "axios";

const OnShopSale = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [cashGiven, setCashGiven] = useState("");

  // Fetch products from backend
  useEffect(() => {
    axios
      .get("https://bazario-server-pearl.vercel.app/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: Number(item.quantity) + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Delete product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const change = cashGiven ? Number(cashGiven) - subtotal : 0;

  const printBill = () => {
    const billWindow = window.open("", "PRINT", "height=600,width=800");
    billWindow.document.write("<html><head><title>Bill</title></head><body>");
    billWindow.document.write("<h2>Shop No: 12345</h2>");
    billWindow.document.write("<h3>Customer Bill</h3>");
    billWindow.document.write("<hr>");
    cart.forEach((item) => {
      billWindow.document.write(
        `<p>${item.title} x ${item.quantity} = ${Number(item.price) * Number(item.quantity)} Tk</p>`
      );
    });
    billWindow.document.write("<hr>");
    billWindow.document.write(`<p>Subtotal: ${subtotal} Tk</p>`);
    billWindow.document.write(`<p>Cash Given: ${cashGiven} Tk</p>`);
    billWindow.document.write(`<p>Change: ${change} Tk</p>`);
    billWindow.document.write("</body></html>");
    billWindow.document.close();
    billWindow.print();
  };

  return (
    <div className="p-10 text-black">
      <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-[#001f3f]">
        On-Shop Sale
      </h2>
      <div className="p-4 md:flex gap-4">
        {/* Left: Cart */}
        <div className="md:w-1/2 bg-white shadow p-4 rounded mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Selected Products</h2>
          {cart.length === 0 && <p>No products added yet</p>}
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.title} x {item.quantity}
              </span>
              <div className="flex items-center gap-2">
                <span>{Number(item.price) * Number(item.quantity)} Tk</span>
                <button
                  className="text-red-500 font-bold hover:text-red-700"
                  onClick={() => removeFromCart(item._id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
          {cart.length > 0 && (
            <>
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Subtotal:</span>
                <span>{subtotal} Tk</span>
              </div>

              <div className="mt-2">
                <input
                  type="number"
                  placeholder="Cash Given"
                  className="border p-2 w-full mb-2"
                  value={cashGiven}
                  onChange={(e) => setCashGiven(e.target.value)}
                />
                {cashGiven && (
                  <div className="flex justify-between font-bold">
                    <span>Change:</span>
                    <span>{change} Tk</span>
                  </div>
                )}
              </div>

              <button
                className="mt-4 bg-[#001f3f] text-[#d4ff00] px-4 py-2 rounded w-full hover:bg-[#d4ff00] hover:text-[#001f3f]"
                onClick={printBill}
              >
                Print Bill
              </button>
            </>
          )}
        </div>

        {/* Right: Products */}
        <div className="md:w-1/2 bg-gray-50 shadow p-4 rounded">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <input
            type="text"
            placeholder="Search product..."
            className="border p-2 w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="max-h-[400px] overflow-y-auto">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="flex justify-between items-center p-2 mb-2 bg-white rounded shadow cursor-pointer hover:bg-gray-100"
                onClick={() => addToCart(product)}
              >
                <span>{product.title}</span>
                <span>{product.price} Tk</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnShopSale;
