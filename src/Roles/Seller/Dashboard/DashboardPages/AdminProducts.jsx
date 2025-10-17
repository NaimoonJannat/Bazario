import { useLoaderData } from "react-router";
import { useState, useMemo } from "react";
import AdminProductCard from "./AdminProductCard";

const AdminProducts = () => {
  const products = useLoaderData() || []; // Ensure it's always an array
  const [allProducts, setAllProducts] = useState(products);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Number of products per page

  // Robust search filter
  const filteredProducts = useMemo(() => {
    if (!search) return allProducts;

    const lowerSearch = search.toLowerCase();

    return allProducts.filter((p) => {
      // Search in multiple fields safely
      return (
        (p.name && p.name.toLowerCase().includes(lowerSearch)) ||
        (p.title && p.title.toLowerCase().includes(lowerSearch)) ||
        (p.description && p.description.toLowerCase().includes(lowerSearch))
      );
    });
  }, [search, allProducts]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  
// Remove deleted product from UI
const handleDeleteUI = (id) => {
  // Remove product from UI
  setAllProducts((prev) => prev.filter((p) => p._id !== id));

  // Reset pagination to page 1
  setCurrentPage(1);

  // Scroll to top of page
  window.scrollTo({ top: 0, behavior: "smooth" });
};



  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
        Admin Products ({filteredProducts.length})
      </h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset to first page on search
          }}
          className="w-full md:w-1/3 p-2 md:p-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {currentProducts.map((product) => (
            <AdminProductCard
              key={product._id}
              product={product}
              onDelete={handleDeleteUI}
              className="p-3 md:p-4"
            />
          ))}
        </div>
      ) : (
        <p className="text-white text-center mt-10">
          No products found.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded-md ${
                num === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
