import React, { useState } from 'react';

const AddProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [manualCategory, setManualCategory] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const handleDecrease = () => {
    setQuantity(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...newImages]);
  };

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-[#001f3f]">Add Product</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Product Images */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-[#001f3f]">Product Image</h3>
          <p className="text-sm text-[#001f3f] mb-4">Set your thumbnail product.</p>

          <div className="mb-4">
            <img
              src={selectedImages[0] || 'https://static-01.daraz.com.bd/p/baebfcbe79f2dab34f0d4c68921c01c7.png'}
              alt="Thumbnail"
              className="w-full h-auto rounded-xl border"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {(selectedImages.length ? selectedImages : Array.from({ length: 6 })).map((img, i) => (
              <div key={i} className="aspect-square rounded-xl border overflow-hidden">
                <img
                  src={
                    typeof img === 'string'
                      ? img
                      : 'https://static-01.daraz.com.bd/p/6e19588a7da9821c358c9c65d401942a.png'
                  }
                  alt={`Variant ${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
            <label className="aspect-square border-dashed border-2 border-[#001f3f] flex items-center justify-center rounded-xl cursor-pointer">
              <span className="text-[#001f3f] text-3xl">+</span>
              <input
                type="file"
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

          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-[#001f3f]">Product Name</label>
              <input type="text" className="w-full text-[#001f3f] border rounded-lg px-4 py-2" placeholder="Product name" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-[#001f3f]">Description</label>
              <textarea className="w-full border text-[#001f3f] rounded-lg px-4 py-2" rows="5" placeholder="Product description"></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-[#001f3f]">Select Category</label>
                <select className="w-full border text-[#001f3f] rounded-lg px-4 py-2">
                  <option>Accessories</option>
                  <option>Electronics</option>
                  <option>Food</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium text-[#001f3f]">Or Enter New Category</label>
                <input
                  type="text"
                  value={manualCategory}
                  onChange={(e) => setManualCategory(e.target.value)}
                  className="w-full border text-[#001f3f] rounded-lg px-4 py-2"
                  placeholder="Custom category"
                />
              </div>
            </div>

            {/* Expiration Date & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-[#001f3f]">Expiration Date</label>
                <input type="date" className="w-full border text-[#001f3f] rounded-lg px-4 py-2" />
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
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
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
              <input type="text" className="w-full text-[#001f3f] border rounded-lg px-4 py-2" placeholder="$0.00" />
            </div>

            <button className="btn btn-soft btn-success text-[#d4ff00] bg-[#001f3f]" type="submit">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
