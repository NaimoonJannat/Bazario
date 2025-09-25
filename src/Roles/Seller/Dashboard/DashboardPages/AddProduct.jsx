import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const CLOUD_NAME = 'auraloom';
const BAZARIO_PRESET = 'bazario_preset';
const FOLDER = 'bazario';

const AddProduct = () => {
  const [stateQuantity, setStateQuantity] = useState(0);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDecrease = () =>
  setStateQuantity((prev) => (prev > 0 ? prev - 1 : 0));
const handleIncrease = () => setStateQuantity((prev) => prev + 1);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const uploadImages = async () => {
    const urls = [];

    for (const file of images) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', BAZARIO_PRESET);
      formData.append('folder', FOLDER);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      urls.push(response.data.secure_url);
    }

    return urls;
  };

  const handleAddButton = async event => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;

    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = form.price.value;
    const expireDate = form.expireDate.value;
    const quantity = Number(stateQuantity);
    const createdAt = new Date().toISOString();

    try {
      const imageUrls = await uploadImages();

      const newProduct = {
        title,
        description,
        category,
        price,
        expireDate,
        quantity,
        createdAt,
        images: imageUrls
      };

      const res = await axios.post('https://bazario-server-pearl.vercel.app/products', newProduct);

      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          title: "Success!",
          text: "Product Added Successfully",
          icon: "success",
          confirmButtonText: 'Ok'
        });
        form.reset();
        setImages([]);
        setImagePreviews([]);
        setStateQuantity(0);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      Swal.fire("Error", "Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-[#001f3f]">Add Product</h2>

      <form onSubmit={handleAddButton}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Product Images */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-[#001f3f]">Product Image</h3>
            <p className="text-sm text-[#001f3f] mb-4">Set your thumbnail product.</p>

            <div className="mb-4">
              {imagePreviews[0] ? (
                <img
                  src={imagePreviews[0]}
                  alt="Thumbnail"
                  className="w-full h-auto rounded-xl border"
                />
              ) : (
                <h2 className='text-[#001f3f]'>Upload Your Product images</h2>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {imagePreviews.slice(1).map((img, i) => (
                <div key={i} className="aspect-square rounded-xl border overflow-hidden">
                  <img
                    src={img}
                    alt={`Variant ${i + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
              <label className="aspect-square border-dashed border-2 border-[#001f3f] flex items-center justify-center rounded-xl cursor-pointer">
                <span className="text-[#001f3f] text-3xl">+</span>
                <input
                  type="file"
                  required
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-[#001f3f]">Product Detail</h3>
            <p className="text-sm text-[#001f3f] mb-4">Set your product information.</p>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-[#001f3f]">Product Name</label>
                <input required type="text" name="title" className="w-full text-[#001f3f] border rounded-lg px-4 py-2" placeholder="Product name" />
              </div>

              <div>
                <label className="block mb-1 font-medium text-[#001f3f]">Description</label>
                <textarea required name="description" className="w-full border text-[#001f3f] rounded-lg px-4 py-2" rows="5" placeholder="Product description"></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-[#001f3f]">Category</label>
                  <input required
                    type="text"
                    name="category"
                    className="w-full border text-[#001f3f] rounded-lg px-4 py-2"
                    placeholder="Category"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-[#001f3f]">Expiration Date</label>
                  <input required type="date" name="expireDate" className="w-full border text-[#001f3f] rounded-lg px-4 py-2" />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-[#001f3f]">Quantity</label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      className="px-3 py-2 bg-[#001f3f] text-[#d4ff00] text-xl"
                    >
                      −
                    </button>
                  <input
                  required
  type="number"
  name="quantity"
  value={stateQuantity}
  onChange={(e) => setStateQuantity(Math.max(0, Number(e.target.value) || 0))}
  className="w-full text-center px-2 py-2 text-[#001f3f] outline-none"
  min={0}
/>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="px-3 py-2 bg-[#001f3f] text-[#d4ff00] text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-[#001f3f]">Price</label>
                <input required type="text" name="price" className="w-full text-[#001f3f] border rounded-lg px-4 py-2" placeholder="$0.00" />
              </div>

              <input required
                className="btn btn-soft btn-success text-[#d4ff00] bg-[#001f3f]"
                value={loading ? "Uploading..." : "Add Product"}
                type="submit"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
