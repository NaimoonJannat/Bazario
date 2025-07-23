import React from 'react';

const AddProduct = () => {
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
              src="https://static-01.daraz.com.bd/p/baebfcbe79f2dab34f0d4c68921c01c7.png"
              alt="Thumbnail"
              className="w-full h-auto rounded-xl border"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl border overflow-hidden">
                <img
                  src="https://static-01.daraz.com.bd/p/6e19588a7da9821c358c9c65d401942a.png"
                  alt={`Variant ${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
            <div className="aspect-square border-dashed border-2 border-[#001f3f] flex items-center justify-center rounded-xl cursor-pointer">
              <span className="text-[#001f3f] text-3xl">+</span>
            </div>
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

            <div>
              <label className="block mb-1 font-medium text-[#001f3f]">Categories</label>
              <select className="w-full border rounded-lg px-4 py-2">
                <option>Accessories</option>
                <option>Electronics</option>
                <option>Home</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-[#001f3f]">Base Price</label>
              <input type="text" className="w-full text-[#001f3f] border rounded-lg px-4 py-2" placeholder="$0.00" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-[#001f3f]">Price & Discount</label>
              <div className="flex flex-wrap gap-4 mt-2">
                <label className="flex text-[#001f3f] items-center gap-2">
                  <input type="radio" name="discount" defaultChecked className="form-radio text-[#001f3f]" />
                  No Discount
                </label>
                <label className="flex text-[#001f3f] items-center gap-2">
                  <input type="radio" name="discount" className="form-radio text-[#001f3f]" />
                  Percentage %
                </label>
                <label className="flex text-[#001f3f] items-center gap-2">
                  <input type="radio" name="discount" className="form-radio text-[#001f3f]" />
                  Bundling
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-[#001f3f]">Status</label>
              <select className="w-full border text-[#001f3f] rounded-lg px-4 py-2">
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
