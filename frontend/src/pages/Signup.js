import React, { useState } from "react";
import loginSignupimage from "../images/user.png";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

import Footer from "../component/Footer";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    contactNumber: "",
    address: "",
    userType: "",
  });

  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProfileImage = async (e) => {
    const base64Image = await ImagetoBase64(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: base64Image,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!data.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!/^\d{10}$/.test(data.contactNumber)) {
      newErrors.contactNumber = "Invalid contact number (10 digits required)";
    }

    if (!isChecked) {
      newErrors.policy = "You must accept the Privacy Policy and Terms of Service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast(errorData.message);
        return;
      }

      const result = await response.json();
      toast(result.message);
      if (result.alert) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error, please try again later.");
    }
  };

  return (
    <>
    <div className="p-5 relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://media.istockphoto.com/id/1758774275/photo/rice-field-with-sunrise-or-sunset-in-moning-light.jpg?s=612x612&w=0&k=20&c=gOqDHS0qA5xkYOL_J6pG9mt-q6AB-flco6xL0wAeFU0=')` }}>
      
      <div className="absolute inset-0 bg-black opacity-35"></div> {/* Black overlay */}
      <div className="relative z-10 p-4 md:p-4">
        <div className="w-full max-w-md bg-white m-auto flex flex-col p-4 rounded-lg shadow-lg">
          <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
            <img src={data.image || loginSignupimage} alt="" className="w-full h-full" />
            <label htmlFor="profileImage">
              <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                <p className="text-sm p-1 text-white">Upload</p>
              </div>
              <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage} />
            </label>
          </div>
          <form className="w-full py-3 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.firstName} onChange={handleOnChange} />
            {errors.firstName && <p className="text-red-500 text-xs col-span-2">{errors.firstName}</p>}

            <input type="text" name="lastName" placeholder="Last Name" className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.lastName} onChange={handleOnChange} />
            
            <input type="email" name="email" placeholder="Email" className="col-span-2 mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.email} onChange={handleOnChange} />
            {errors.email && <p className="text-red-500 text-xs col-span-2">{errors.email}</p>}

            <input type="text" name="contactNumber" placeholder="Contact Number" className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.contactNumber} onChange={handleOnChange} />
            {errors.contactNumber && <p className="text-red-500 text-xs col-span-2">{errors.contactNumber}</p>}

            <select name="userType" className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.userType} onChange={handleOnChange}>
              <option value="">Select User Type</option>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
              <option value="vendor">Vendor</option>
            </select>

            <input type="text" name="address" placeholder="Address" className="col-span-2 mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.address} onChange={handleOnChange} />

            <div className="flex mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300">
  <input 
    type={showPassword ? "text" : "password"} 
    name="password" 
    placeholder="Password" 
    className="w-full bg-transparent border-none outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300" 
    value={data.password} 
    onChange={handleOnChange} 
  />
  <span onClick={handleShowPassword} className="flex text-xl cursor-pointer">{showPassword ? <BiShow /> : <BiHide />}</span>
</div>
{errors.password && <p className="text-red-500 text-xs col-span-2">{errors.password}</p>}

<div className="flex mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300">
  <input 
    type={showConfirmPassword ? "text" : "password"} 
    name="confirmPassword" 
    placeholder="Confirm Password" 
    className="w-full bg-transparent border-none outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300" 
    value={data.confirmPassword} 
    onChange={handleOnChange} 
  />
  <span onClick={handleShowConfirmPassword} className="flex text-xl cursor-pointer">{showConfirmPassword ? <BiShow /> : <BiHide />}</span>
</div>
{errors.confirmPassword && <p className="text-red-500 text-xs col-span-2">{errors.confirmPassword}</p>}


            <label className="col-span-2 flex items-center">
              <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="mr-2" />
              I accept the <Link to="/privacypolicy" className="text-green-700 mx-1">Privacy Policy</Link> and 
              <Link to="/terms" className="text-green-700 mx-1">Terms of Service</Link>
            </label>

            {errors.policy && <p className="text-red-500 text-xs col-span-2">{errors.policy}</p>}

            <button type="submit" className="col-span-2 bg-green-600 text-white py-2 rounded-full">Sign Up</button>
          </form>

          <p className="text-left text-base mt-2">Already have an account? <Link to="/login" className="text-green-700">Login</Link></p>
        </div>
      </div>
     
    </div> 
    <div>
      <Footer/>
    </div>
    </>

   
  );
}

export default Signup;
