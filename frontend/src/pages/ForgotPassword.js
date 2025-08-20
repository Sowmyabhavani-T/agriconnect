import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email || !newPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/resetpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      toast.error("Server Error");
    }
  };

  return (
    <>
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 relative"
      style={{
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661900503280-36c1b4be3a66?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
     
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="p-6 w-full max-w-md bg-white shadow-lg rounded-lg z-10">
        <h2 className="text-2xl font-bold text-center text-black">Reset Password</h2>
        <form className="mt-4 flex flex-col" onSubmit={handleResetPassword}>
          <label htmlFor="email" className="text-black">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="newPassword" className="text-black">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white py-2 rounded-full mt-4"
          >
            Reset Password
          </button>
        </form>
      </div>
      
    </div>
    <div>
      <Footer/>

    </div>
    </>
  );
};

export default ForgotPassword;
