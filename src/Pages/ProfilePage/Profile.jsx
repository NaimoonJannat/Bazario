import React, { useState } from "react";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);

  // Example data (later this will come from backend/user context)
  const user = {
    name: "Naimoon Jannat",
    email: "naimoonjannat@gmail.com",
    photoURL:
      "https://lh3.googleusercontent.com/a/ACg8ocJ57DQTw_tk0TPy1ZuVf7tXXXsCo43Ifyb9YYhzLcouadNqnsc=s96-c",
    role: "user",
    joined: "Jan 2024",
    cart: [
      { productId: "68839e3664a6d3c386da5d38", quantity: 17 },
      { productId: "68839d9064a6d3c386da5d36", quantity: 1 },
      { productId: "68839ea664a6d3c386da5d39", quantity: 1 },
    ],
    address: "",
    phone: "",
  };

  // Derived stats
  const totalOrders = 12; // placeholder
  const totalSpent = 325; // placeholder
  const cartItemsCount = user.cart.length; // count unique products

  return (
    <div className="min-h-screen bg-[#001f3f] text-white flex flex-col items-center">
      {/* Banner */}
      <div className="relative w-full h-48 bg-gradient-to-r from-blue-600 to-indigo-800">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 w-full max-w-4xl px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-300">Joined: {user.joined}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="card bg-gray-800 shadow-xl text-center p-4 rounded-2xl">
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>

          <div className="card bg-gray-800 shadow-xl text-center p-4 rounded-2xl">
            <h2 className="text-lg font-semibold">Cart Items</h2>
            <p className="text-2xl font-bold">{cartItemsCount}</p>
          </div>

          <div className="card bg-gray-800 shadow-xl text-center p-4 rounded-2xl">
            <h2 className="text-lg font-semibold">Total Spent</h2>
            <p className="text-2xl font-bold">${totalSpent}</p>
          </div>

          <div className="card bg-gray-800 shadow-xl text-center p-4 rounded-2xl">
            <h2 className="text-lg font-semibold">Role</h2>
            <p className="text-2xl font-bold capitalize">{user.role}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-gray-900 rounded-2xl shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Address:</span> {user.address || "Not set"}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone || "Not set"}</p>

          <button
            onClick={() => setOpenModal(true)}
            className="btn btn-primary w-full mt-6"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Update Profile Modal */}
      {openModal && (
        <dialog id="update_modal" className="modal modal-open">
          <div className="modal-box bg-gray-900 text-white">
            <h3 className="font-bold text-lg mb-4">Update Profile</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="input input-bordered w-full bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Profile Picture URL</label>
                <input
                  type="text"
                  defaultValue={user.photoURL}
                  className="input input-bordered w-full bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Address</label>
                <input
                  type="text"
                  defaultValue={user.address}
                  placeholder="Enter address"
                  className="input input-bordered w-full bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input
                  type="text"
                  defaultValue={user.phone}
                  placeholder="Enter phone number"
                  className="input input-bordered w-full bg-gray-800 text-white"
                />
              </div>
              <div className="modal-action flex justify-between">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Profile;
