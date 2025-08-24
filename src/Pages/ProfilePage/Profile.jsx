import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./../../Provider/AuthProvider";

const Profile = () => {
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({
    name: "",
    photoURL: "",
    address: "",
    phone: "",
  });

  const { user } = useContext(AuthContext); // renamed from me

  // Fetch user data from backend
  useEffect(() => {
    if (!user?.email) return; // wait until authUser exists

    const fetchUser = async () => {
      try {
        const API_URL = `http://localhost:5000/users/${user.email}`;
        const res = await fetch(API_URL);
        const data = await res.json();
        setProfileUser(data);
        setEditData({
          name: data.name,
          photoURL: data.photoURL,
          address: data.address,
          phone: data.phone,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!profileUser) {
    return <p className="text-center text-white mt-10">User not found</p>;
  }

  // Cart info
  const numberOfCartProducts = profileUser.cart?.length || 0;
  const totalQuantity = profileUser.cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalShoppingPrice = 0; // placeholder

  // Update handler
  const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const API_URL = `http://localhost:5000/users/${user.email}/profile`; // add /profile
    const res = await fetch(API_URL, {
      method: "PATCH", // change from PUT to PATCH
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });
    const updated = await res.json();

    if (updated.success) { // use updated.success from backend
      Swal.fire("Updated!", "Profile updated successfully.", "success");
      setProfileUser({ ...profileUser, ...editData });
      document.getElementById("edit_modal").close();
    } else {
      Swal.fire("No Change", updated.message || "Nothing was updated.", "info");
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Failed to update profile.", "error");
  }
};


  return (
    <div className="min-h-screen bg-[#001f3f] text-white p-6">
      {/* Banner */}
      <div className="relative w-full h-56 bg-cover bg-center rounded-xl" style={{ backgroundImage: "url('/cover2.jpg')" }}>
  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
    <img
      src={profileUser.photoURL}
      alt="Profile"
      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
    />
  </div>
</div>

      {/* User Info */}
      <div className="mt-20 text-center w-full md:w-4/5 mx-auto">
        <h1 className="text-3xl font-bold">{profileUser.name}</h1>
        <p className="text-gray-300">{profileUser.email}</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 bg-blue-900 text-[#d4ff00] rounded-xl shadow-md">
            <h2 className="text-xl font-bold">{numberOfCartProducts}</h2>
            <p className="text-gray-300">Products in Cart</p>
          </div>
          <div className="p-4 bg-blue-900 text-[#d4ff00]  rounded-xl shadow-md">
            <h2 className="text-xl font-bold">{totalQuantity}</h2>
            <p className="text-gray-300">Total Quantity</p>
          </div>
          <div className="p-4 bg-blue-900 text-[#d4ff00] rounded-xl shadow-md">
            <h2 className="text-xl font-bold">{totalShoppingPrice}৳</h2>
            <p className="text-gray-300">Total Shopping</p>
          </div>
          <div className="p-4 bg-blue-900 text-[#d4ff00] rounded-xl shadow-md">
            <h2 className="text-xl font-bold">{profileUser.role}</h2>
            <p className="text-gray-300">Role</p>
          </div>
        </div>

        <div className="mt-8 text-left max-w-md mx-auto space-y-3">
          <p><span className="font-bold">Address:</span> {profileUser.address || "Not set"}</p>
          <p><span className="font-bold">Phone:</span> {profileUser.phone || "Not set"}</p>
        </div>

        <button
          className="mt-6 btn btn-primary bg-[#d4ff00] text-[#001f3f] border-2 border-[#001f3f] hover:text-[#d4ff00] hover:bg-[#001f3f] transition-0.5"
          onClick={() => document.getElementById("edit_modal").showModal()}
        >
          Edit Profile
        </button>
      </div>

      {/* Update Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box bg-[#001f3f] text-white">
          <h3 className="font-bold text-lg mb-4">Update Profile</h3>
          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="input input-bordered w-full bg-gray-800 text-white"
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={editData.photoURL}
              onChange={(e) => setEditData({ ...editData, photoURL: e.target.value })}
              className="input input-bordered w-full bg-gray-800 text-white"
            />
            <input
              type="text"
              placeholder="Address"
              value={editData.address}
              onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              className="input input-bordered w-full bg-gray-800 text-white"
            />
            <input
              type="text"
              placeholder="Phone"
              value={editData.phone}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              className="input input-bordered w-full bg-gray-800 text-white"
            />
            <div className="modal-action">
              <button type="submit" className="btn btn-primary bg-[#d4ff00] text-[#001f3f] border-2 border-[#001f3f] hover:text-[#d4ff00] hover:bg-[#001f3f] transition-0.5">Save</button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("edit_modal").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
