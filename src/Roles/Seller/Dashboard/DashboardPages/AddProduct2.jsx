import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CLOUD_NAME = "auraloom";
const UPLOAD_PRESET = "bazario_preset";
const FOLDER = "bazario";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  // Upload images to Cloudinary
  const uploadImages = async () => {
    const urls = [];

    for (const file of images) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", FOLDER);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      urls.push(response.data.secure_url);
    }

    return urls;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images
      const imageUrls = await uploadImages();

      // Get other form data
      const form = e.target;
      const title = form.title.value;
      const description = form.description.value;
      const category = form.category.value;
      const price = form.price.value;
      const expireDate = form.expireDate.value;
      const quantity = parseInt(form.quantity.value);
      const createdAt = new Date().toISOString();

      const newProduct = {
        title,
        description,
        category,
        price,
        expireDate,
        quantity,
        createdAt,
        images: imageUrls,
      };

      // Send to your backend
      const res = await axios.post("http://localhost:5000/products", newProduct);

      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire("Success!", "Product Added Successfully", "success");
        form.reset();
        setImages([]);
        setImagePreviews([]);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      Swal.fire("Error", "Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-[#03045e]">Add Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block font-semibold text-[#03045e] mb-2">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 p-2 mb-4"
          />
          <div className="grid grid-cols-3 gap-3">
            {imagePreviews.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`preview-${i}`}
                className="w-full h-32 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-[#03045e] font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Product title"
            />
          </div>
          <div>
            <label className="block text-[#03045e] font-semibold mb-1">Description</label>
            <textarea
              name="description"
              required
              className="w-full border rounded px-3 py-2"
              rows="3"
              placeholder="Write product details"
            />
          </div>
          <div>
            <label className="block text-[#03045e] font-semibold mb-1">Category</label>
            <input
              type="text"
              name="category"
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Category"
            />
          </div>
          <div>
            <label className="block text-[#03045e] font-semibold mb-1">Price</label>
            <input
              type="text"
              name="price"
              required
              className="w-full border rounded px-3 py-2"
              placeholder="$0.00"
            />
          </div>
          <div>
            <label className="block text-[#03045e] font-semibold mb-1">Expire Date</label>
            <input
              type="date"
              name="expireDate"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-[#03045e] font-semibold mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              required
              min={0}
              className="w-full border rounded px-3 py-2"
              placeholder="0"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0077b6] hover:bg-[#03045e] text-white font-semibold py-2 px-4 rounded"
            >
              {loading ? "Uploading..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
