import { useLoaderData } from "react-router";
import { useState } from "react";
import ProductCard from "./ProductCard";

const Products = () => {
  const products = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Slice products for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Handlers
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      {/* The container */}
      <div className="flex flex-col md:flex-row">
        {/* Filters */}
        <div className="w-full md:w-1/3 border-r-2 border-[#d4ff00] max-h-screen">
          {/* Filters will go here */}
        </div>

        {/* Products */}
        <div className="text-center space-y-4 w-full md:w-2/3">
          <h2 className="text-3xl text-white font-bold">
            Total <span className="text-[#d4ff00]">{products.length}</span> Products
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === 1
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-[#d4ff00] text-[#001f3f] hover:bg-[#a8cc00]"
              }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentPage === index + 1
                    ? "bg-[#001f3f] text-[#d4ff00] border-2 border-[#d4ff00]"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={handleNext}
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
