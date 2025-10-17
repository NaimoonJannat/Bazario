import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CLOUD_NAME = 'auraloom';
const BAZARIO_PRESET = 'bazario_preset';
const FOLDER = 'bazario';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stateQuantity, setStateQuantity] = useState(0);
  const [images, setImages] = useState([]); // New images to upload
  const [imagePreviews, setImagePreviews] = useState([]); // New + existing
  const [existingImages, setExistingImages] = useState([]); // Original images
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // Fetch product data
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://bazario-server-pearl.vercel.app/products/${id}`);
        if (res.data) {
          setProductData(res.data);
          setStateQuantity(res.data.quantity);
          setExistingImages(res.data.images || []);
          setImagePreviews(res.data.images || []);
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch product data", "error");
      }
    };
    fetchProduct();
  }, [id]);

  const handleDecrease = () =>
    setStateQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  const handleIncrease = () => setStateQuantity((prev) => prev + 1);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const handleRemoveImage = (index) => {
    // Remove from existing images or new images
    if (index < existingImages.length) {
      const newExisting = [...existingImages];
      newExisting.splice(index, 1);
      setExistingImages(newExisting);
      setImagePreviews([...newExisting, ...images.map(f => URL.createObjectURL(f))]);
    } else {
      const newImages = [...images];
      newImages.splice(index - existingImages.length, 1);
      setImages(newImages);
      setImagePreviews([...existingImages, ...newImages.map(f => URL.createObjectURL(f))]);
    }
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

  const handleUpdate = async event => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = form.price.value;
    const expireDate = form.expireDate.value;
    const quantity = Number(stateQuantity);

    try {
      const uploadedUrls = await uploadImages();
      const updatedProduct = {
        title,
        description,
        category,
        price,
        expireDate,
        quantity,
        images: [...existingImages, ...uploadedUrls],
      };

      const res = await axios.put(
        `https://bazario-server-pearl.vercel.app/products/${id}`,
        updatedProduct
      );

      if (res.data.success) {
        Swal.fire("Success", "Product updated successfully", "success");
        navigate('/dashboard/products'); // Redirect to products page
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update product", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!productData) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-[#001f3f]">Update Product</h2>

      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Product Images */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-[#001f3f]">Product Image</h3>

            <div className="mb-4">
              {imagePreviews[0] ? (
                <div className="relative">
                  <img src={imagePreviews[0]} alt="Thumbnail" className="w-full h-auto rounded-xl border" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(0)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
                  >Remove</button>
                </div>
              ) : (
                <h2 className='text-[#001f3f]'>Upload Your Product images</h2>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {imagePreviews.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl border overflow-hidden">
                  <img src={img} alt={`Variant ${i + 1}`} className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i + 1)}
                    className="absolute top-1 right-1 bg-red-600 text-white px-1 py-0.5 rounded text-xs"
                  >×</button>
                </div>
              ))}
              <label className="aspect-square border-dashed border-2 border-[#001f3f] flex items-center justify-center rounded-xl cursor-pointer">
                <span className="text-[#001f3f] text-3xl">+</span>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-[#001f3f]">Product Detail</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-[#001f3f]">Product Name</label>
                <input required type="text" name="title" defaultValue={productData.title} className="w-full text-[#001f3f] border rounded-lg px-4 py-2" />
              </div>

              <div>
                <label className="block mb-1 font-medium text-[#001f3f]">Description</label>
                <textarea required name="description" defaultValue={productData.description} className="w-full border text-[#001f3f] rounded-lg px-4 py-2" rows="5"></textarea>
              </div>

              <div>
                <label className="block mb-1 font-medium text-[#001f3f]">Category</label>
                <input required type="text" name="category" defaultValue={productData.category} className="w-full border text-[#001f3f] rounded-lg px-4 py-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-[#001f3f]">Expiration Date</label>
                  <input required type="date" name="expireDate" defaultValue={productData.expireDate} className="w-full border text-[#001f3f] rounded-lg px-4 py-2" />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-[#001f3f]">Quantity</label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button type="button" onClick={handleDecrease} className="px-3 py-2 bg-[#001f3f] text-[#d4ff00] text-xl">−</button>
                    <input
                      required
                      type="number"
                      name="quantity"
                      value={stateQuantity}
                      onChange={(e) => setStateQuantity(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full text-center px-2 py-2 text-[#001f3f] outline-none"
                      min={0}
                    />
                    <button type="button" onClick={handleIncrease} className="px-3 py-2 bg-[#001f3f] text-[#d4ff00] text-xl">+</button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-[#001f3f]">Price</label>
                <input required type="text" name="price" defaultValue={productData.price} className="w-full text-[#001f3f] border rounded-lg px-4 py-2" />
              </div>

              <input
                className="btn btn-soft btn-success text-[#d4ff00] bg-[#001f3f]"
                value={loading ? "Updating..." : "Update Product"}
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

export default UpdateProduct;
