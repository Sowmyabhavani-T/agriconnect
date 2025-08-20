import React, { useState } from "react";
import loginSignupimage from "../images/user.png";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import { fetchWishlist } from "../redux/productSlice";
import { setCartItems } from "../redux/productSlice";
import Footer from "../component/Footer";
import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } from "../redux/orderSlice";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state);

  const handleshowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(userData.user.firstName + dataRes.message);
      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        dispatch(fetchWishlist());

        const cartResponse = await fetch(`http://localhost:8000/cart/${email}`);
        const cartItems = await cartResponse.json();

        // Fetch orders
                dispatch(fetchOrdersStart());
                try {
                    const ordersResponse = await fetch(`http://localhost:8000/orders/${email}`);
                    const ordersData = await ordersResponse.json();
                    dispatch(fetchOrdersSuccess(ordersData));
                } catch (error) {
                    dispatch(fetchOrdersFailure(error.message));
                    toast.error("Failed to fetch orders");
                }
        dispatch(setCartItems(cartItems)); //
        setTimeout(() => navigate("/home"), 1000);
      }
    } else {
      alert("Please enter required fields");
    }
  };

  return (
    <>
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url('https://media.istockphoto.com/id/1364083209/photo/technology-in-the-field-digital-tablet.jpg?s=612x612&w=0&k=20&c=4iAxXyg7_UkMIiRxnd1pzM22khU5nlNzC6yPEjSTF2o=')` }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Login Form */}
      <div className="relative p-6 w-full max-w-sm bg-white rounded-lg shadow-lg z-10">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginSignupimage} alt="login" className="w-full p-2" />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-transparent border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span className="flex text-xl cursor-pointer" onClick={handleshowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white py-2 rounded-full mt-4">
            Login
          </button>
        </form>

        <p className="text-center text-base mt-2">
          Don't have an account? <Link to="/Signup" className="text-green-700">Sign Up</Link>
        </p>

        <p className="text-center text-base mt-2">
          <Link to="/forgotpassword" className="text-green-700">Forgot Password?</Link>
        </p>
      </div>
     
    </div>
    <div>
          <Footer/>
        </div>
    </>

  );
}

export default Login;