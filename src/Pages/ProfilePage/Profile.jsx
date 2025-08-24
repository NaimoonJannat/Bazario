import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#001f3f] text-white flex flex-col items-center">
      {/* Banner */}
      <div className="relative w-full h-48 bg-gradient-to-r from-blue-600 to-indigo-800">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src="https://lh3.googleusercontent.com/a/ACg8ocJ57DQTw_tk0TPy1ZuVf7tXXXsCo43Ifyb9YYhzLcouadNqnsc=s96-c"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 w-full max-w-4xl px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Naimoon Jannat</h1>
          <p className="text-gray-300">Joined: Jan 2024</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="card bg-gray-800 shadow-xl text-center p-4 rounded-2xl">
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-2xl font-bold">12</p>
          </div>

          <div className="card bg-gray-800 shadow-xl text-center p-4 rounded-2xl">
            <h2 className="text-lg font-semibold">Cart Items</h2>
            <p className="text-2xl font-bold">19</p>
          </div>

          <div className="card bg-gray-800 shadow-xl text-center p-4 rounded-2xl">
            <h2 className="text-lg font-semibold">Total Spent</h2>
            <p className="text-2xl font-bold">$325</p>
          </div>

          <div className="card bg-gray-800 shadow-xl text-center p-4 rounded-2xl">
            <h2 className="text-lg font-semibold">Role</h2>
            <p className="text-2xl font-bold">User</p>
          </div>
        </div>

        {/* Editable Details */}
        <div className="bg-gray-900 rounded-2xl shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                defaultValue="Naimoon Jannat"
                className="input input-bordered w-full bg-gray-800 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Profile Picture URL</label>
              <input
                type="text"
                defaultValue="https://lh3.googleusercontent.com/a/ACg8ocJ57DQTw_tk0TPy1ZuVf7tXXXsCo43Ifyb9YYhzLcouadNqnsc=s96-c"
                className="input input-bordered w-full bg-gray-800 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Address</label>
              <input
                type="text"
                placeholder="Enter address"
                className="input input-bordered w-full bg-gray-800 text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="input input-bordered w-full bg-gray-800 text-white"
              />
            </div>
            <button className="btn btn-primary w-full">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
