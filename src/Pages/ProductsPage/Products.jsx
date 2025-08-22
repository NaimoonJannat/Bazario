import { useLoaderData } from "react-router";
import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";

const Products = () => {
  const products = useLoaderData();

  // State for filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Get unique categories from backend data
  const categories = [...new Set(products.map((p) => p.category))];

  // Get min and max price
  const minPrice = Math.min(...products.map((p) => Number(p.price)));
  const maxPrice = Math.max(...products.map((p) => Number(p.price)));

  // Set default price range
  useMemo(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // Apply filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    const matchesDateAdded = dateAdded ? product.createdAt.slice(0, 10) >= dateAdded : true;
    const matchesExpiryDate = expiryDate ? product.expireDate.slice(0, 10) <= expiryDate : true;
    const matchesPrice =
      Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1];

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDateAdded &&
      matchesExpiryDate &&
      matchesPrice
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row">
        {/* Filters Section */}
        <div className="w-full md:w-1/3 border-r-2 border-[#d4ff00] max-h-screen p-4 space-y-6 bg-[#001f3f] text-white">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-[#d4ff00]"
            />
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
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date Added */}
          <div>
            <label className="block text-sm font-medium mb-1">Date Added</label>
            <input
              type="date"
              value={dateAdded}
              onChange={(e) => setDateAdded(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-[#d4ff00]"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-[#d4ff00]"
            />
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
                  setPriceRange([Number(e.target.value), priceRange[1]])
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
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-1/2 px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-[#d4ff00]"
              />
            </div>
            <p className="text-sm mt-2 text-gray-400">
              {priceRange[0]} ৳ - {priceRange[1]} ৳
            </p>
          </div>
        </div>

        {/* Products Section (unchanged) */}
        <div className="text-center space-y-4 w-full md:w-2/3">
          <h2 className="text-3xl text-white font-bold">
            Total <span className="text-[#d4ff00]">{filteredProducts.length}</span> Products
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
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
