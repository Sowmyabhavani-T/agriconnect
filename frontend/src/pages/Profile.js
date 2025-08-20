import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || !user.email) {
    return <div className="p-8 text-center text-gray-600">Loading user data...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-[30%] bg-white p-8 shadow-lg border-r border-gray-200">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user.image || "https://via.placeholder.com/120"}
              alt="Profile"
              className="rounded-full w-32 h-32 mb-4 border-4 border-green-500 shadow"
            />
            <Link
              to="/editprofile"
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
              title="Edit Profile"
            >
              <FaPencilAlt className="text-green-700 w-4 h-4" />
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
            {user.firstName || ""} {user.lastName || ""}
          </h2>

          <div className="text-base text-gray-700 space-y-3 w-full">
            <p><span className="font-semibold">Email:</span> {user.email || "N/A"}</p>
            <p><span className="font-semibold">Contact:</span> {user.contactNumber || "N/A"}</p>
            <p><span className="font-semibold">Address:</span> {user.address || "N/A"}</p>
            <p><span className="font-semibold">User Type:</span> {user.userType || "N/A"}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md text-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 flex flex-col items-center justify-start">
        <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
          Your Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-[1100px]">
          {/* Orders */}
          <Link
            to="/orders"
            className="bg-white p-8 h-56 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.03] transform transition duration-300 border border-green-100"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Your Orders</h2>
            <p className="text-gray-600 text-lg">
              View and manage your recent orders, track shipments, and initiate returns.
            </p>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="bg-white p-8 h-56 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.03] transform transition duration-300 border border-green-100"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Your Wishlist</h2>
            <p className="text-gray-600 text-lg">
              View items you’ve saved for later and track price changes.
            </p>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="bg-white p-8 h-56 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.03] transform transition duration-300 border border-green-100"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Your Cart</h2>
            <p className="text-gray-600 text-lg">
              Manage items in your shopping cart before checkout.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;