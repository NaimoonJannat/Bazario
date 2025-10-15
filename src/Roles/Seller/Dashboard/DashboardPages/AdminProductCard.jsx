import { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const AdminProductCard = ({ product, onDelete }) => {
  const { _id, title, price, quantity, category, expireDate, createdAt, images } = product;
  const [hovered, setHovered] = useState(false);

  // Delete handler with SweetAlert only
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://bazario-server-pearl.vercel.app/products/${_id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();

          if (data.success) {
            onDelete(_id); // update UI
            Swal.fire("Deleted!", "Product has been removed.", "success");
          } else {
            Swal.fire("Error!", data.message || "Failed to delete product.", "error");
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <img
        src={images?.[0]}
        alt={title}
        className="w-full h-64 object-cover"
      />

      {/* Product Info */}
      <div className="p-4 space-y-2 text-gray-800">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p><span className="font-bold">Price:</span> {price} ৳</p>
        <p><span className="font-bold">Quantity:</span> {quantity}</p>
        <p><span className="font-bold">Category:</span> {category}</p>
        <p><span className="font-bold">Expire Date:</span> {expireDate}</p>
        <p><span className="font-bold">Added:</span> {String(createdAt).slice(0,10)}</p>
      </div>

      {/* Action Buttons */}
      {hovered && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] flex justify-between gap-2">
          <Link
            to={`/products/product/${_id}`}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <FaEye />
          </Link>
          <Link
            to={`/admin/update-product/${_id}`}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition"
          >
            <FaEdit />
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition"
          >
            <FaTrash /> 
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProductCard;
