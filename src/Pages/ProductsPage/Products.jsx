import { useLoaderData, useSearchParams } from "react-router";
import { useContext, useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { AuthContext } from "../../Provider/AuthProvider";

const Products = () => {
  const products = useLoaderData();
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  // --- Filters ---
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [dateAddedMonth, setDateAddedMonth] = useState(""); // "YYYY-MM"
  const [expireYear, setExpireYear] = useState(""); // "YYYY"
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    if (user?.email && search.trim() !== "") {
      fetch(`https://bazario-server-pearl.vercel.app/users/${user.email}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: search }),
      }).catch((err) => console.error("Failed to save search:", err));
    }
  }, [search]);

  const handleView = (product) => {
    if (user?.email) {
      fetch(`https://bazario-server-pearl.vercel.app/users/${user.email}/viewed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      }).catch((err) => console.error("Failed to save viewed product:", err));
    }
  };

  // --- Pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Unique categories & expire years from backend
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const expireYears = useMemo(
    () =>
      [...new Set(products.map((p) => String(p.expireDate).slice(0, 4)))]
        .filter(Boolean)
        .sort(),
    [products]
  );

  // Min/Max price from backend
  const minPrice = useMemo(
    () => (products.length ? Math.min(...products.map((p) => Number(p.price))) : 0),
    [products]
  );
  const maxPrice = useMemo(
    () => (products.length ? Math.max(...products.map((p) => Number(p.price))) : 0),
    [products]
  );

  // Initialize price range when data loads
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, dateAddedMonth, expireYear, priceRange]);

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const title = (product.title || "").toLowerCase();
    const matchesSearch = title.includes(search.toLowerCase());

    const matchesCategory = category ? product.category === category : true;

    // createdAt like "2025-08-16T..." → "2025-08"
    const productMonth = String(product.createdAt || "").slice(0, 7);
    const matchesDateAdded = dateAddedMonth ? productMonth == dateAddedMonth : true;

    // expireDate like "2028-12-20" → year "2028"
    const productExpireYear = String(product.expireDate || "").slice(0, 4);
    const matchesExpireYear = expireYear ? productExpireYear === expireYear : true;

    const price = Number(product.price);
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

    // --- New logic: quantity > 0 and not expired ---
    const now = new Date();
    const expireDate = product.expireDate ? new Date(product.expireDate) : null;
    const isAvailable = product.quantity > 0 && (!expireDate || expireDate >= now);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDateAdded &&
      matchesExpireYear &&
      matchesPrice &&
      isAvailable
    );
  });

  // Pagination for filtered results
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setDateAddedMonth("");
    setExpireYear("");
    setPriceRange([minPrice, maxPrice]);
    setCurrentPage(1);
  };

  return (
    <div className="">
      {/* The container */}
      <div className="flex flex-col md:flex-row min-h-screen md:h-screen md:overflow-hidden">

        {/* ================= LEFT: FILTERS ================= */}
        <div className="w-full md:w-1/3 border-r-2 border-[#d4ff00] md:h-screen p-4 bg-[#001f3f] text-white md:overflow-y-auto md:sticky md:top-0">

          {/* Header + Reset */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button
              onClick={resetFilters}
              title="Reset filters"
              aria-label="Reset filters"
              className="w-9 h-9 rounded-full border border-[#d4ff00] flex items-center justify-center hover:bg-gray-800 transition"
            >
              {/* inline reset icon (circular arrow) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-[#d4ff00]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70">
                  {/* search icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-[#d4ff00]"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Added (Month + Year) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date Added (Month & Year)
              </label>
              <input
                type="month"
                value={dateAddedMonth}
                onChange={(e) => setDateAddedMonth(e.target.value)} // "YYYY-MM"
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-[#d4ff00]"
              />
              <p className="text-xs text-gray-400 mt-1">
                Shows products added on this month. Set both year and month too see the result
              </p>
            </div>

            {/* Expire Year */}
            <div>
              <label className="block text-sm font-medium mb-1">Expire Year</label>
              <select
                value={expireYear}
                onChange={(e) => setExpireYear(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-[#d4ff00]"
              >
                <option value="">Any Year</option>
                {expireYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={priceRange[0]}
                  min={minPrice}
                  max={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value || minPrice), priceRange[1]])
                  }
                  className="w-1/2 px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-[#d4ff00]"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  min={priceRange[0]}
                  max={maxPrice}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value || maxPrice)])
                  }
                  className="w-1/2 px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-[#d4ff00]"
                />
              </div>
              <p className="text-sm mt-2 text-gray-400">
                {priceRange[0]} ৳ - {priceRange[1]} ৳
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: PRODUCTS (unchanged layout) ================= */}
        <div className="text-center space-y-4 w-full md:w-2/3 md:overflow-y-auto md:h-screen p-6">

          <h2 className="text-3xl text-white font-bold">
            Total <span className="text-[#d4ff00]">{filteredProducts.length}</span> Products
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentProducts.map((product) => (
              <div key={product._id} onClick={() => handleView(product)} className="cursor-pointer">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === 1
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-[#d4ff00] text-[#001f3f] hover:bg-[#a8cc00]"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentPage === i + 1
                    ? "bg-[#001f3f] text-[#d4ff00] border-2 border-[#d4ff00]"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === totalPages
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-[#d4ff00] text-[#001f3f] hover:bg-[#a8cc00]"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
