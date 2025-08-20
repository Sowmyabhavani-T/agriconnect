import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { FaRegUserCircle, FaHeart } from "react-icons/fa";
import { BsCartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const userData = useSelector((state) => state.user);
    const productList = useSelector((state) => state.product.productList);
    const cartItemNumber = useSelector((state) => state.product.cartItem.length);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowMenu = () => {
        setShowMenu(prev => !prev);
    };

    const handleLogout = () => {
        dispatch(logoutRedux());
        toast("Logout Successful!!!");
        setShowMenu(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const matchedCategory = productList.find(item =>
                item.category.toLowerCase() === searchQuery.toLowerCase()
            );
            const matchedProduct = productList.find(item =>
                item.name.toLowerCase() === searchQuery.toLowerCase()
            );

            if (matchedCategory && !matchedProduct) {
                navigate(`/category/${matchedCategory.category.toLowerCase()}`);
            } else if (matchedProduct) {
                navigate(`/product/${matchedProduct._id}`);
            } else {
                navigate(`/?query=${encodeURIComponent(searchQuery.trim())}`);
            }

            setSearchQuery("");
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const matchedCategory = productList.find(item =>
            item.category.toLowerCase() === suggestion.toLowerCase()
        );
        const matchedProduct = productList.find(item =>
            item.name.toLowerCase() === suggestion.toLowerCase()
        );

        if (matchedCategory && !matchedProduct) {
            navigate(`/category/${matchedCategory.category.toLowerCase()}`);
        } else if (matchedProduct) {
            navigate(`/menu/${matchedProduct._id}`);
        } else {
            navigate(`/?query=${encodeURIComponent(suggestion)}`);
        }

        setSearchQuery("");
        setShowSuggestions(false);
    };

    const filteredSuggestions = productList
        ?.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ? item.name : item.category)
        .filter((value, index, self) => self.indexOf(value) === index)
        .slice(0, 5);

    return (
        <header className='fixed shadow-md w-full h-14 px-2 md:px-4 bg-green-600 z-50 flex items-center justify-between'>
            <Link to="/" className='h-10'>
                <img src={logo} alt="Logo" className='h-full' />
            </Link>

            <div className="relative flex-grow mx-4 max-w-xl hidden md:block">
                <form onSubmit={handleSearchSubmit} className="flex">
                    <input
                        type="text"
                        placeholder="Search for products or categories..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        className="w-full px-4 py-1 rounded-l-full border border-green-300 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-green-800 text-white px-4 py-1 rounded-r-full hover:bg-green-900"
                    >
                        Search
                    </button>
                </form>

                {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
                    <ul className="absolute z-50 bg-white w-full mt-1 rounded shadow-md max-h-48 overflow-y-auto">
                        {filteredSuggestions.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(item)}
                                className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex items-center gap-4 md:gap-6 text-white">
                <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
                    <Link to="/home">Home</Link>
                    <Link to="/menucategory">Menu</Link>
                    {(userData.userType === "farmer" || userData.userType === "vendor") && <Link to="/sell">Sell</Link>}
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </nav>

                <Link to="/wishlist" className="text-2xl">
                    <FaHeart />
                </Link>

                <div className="text-2xl relative">
                    <Link to="/cart">
                        <BsCartFill />
                        <div className="absolute -top-1 -right-1 text-white bg-red-600 h-4 w-4 rounded-full text-xs flex items-center justify-center">
                            {cartItemNumber}
                        </div>
                    </Link>
                </div>

                <div className="relative">
                    <div className="text-2xl cursor-pointer" onClick={handleShowMenu}>
                        {userData.image ? (
                            <img src={userData.image} className="w-8 h-8 rounded-full drop-shadow-md" alt="User" />
                        ) : (
                            <FaRegUserCircle />
                        )}
                    </div>

                    <AnimatePresence>
                        {showMenu && (
                            <motion.div
                                className="absolute right-0 top-10 bg-gray-50 shadow-xl rounded-lg w-52 z-50 border border-gray-200"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex flex-col py-2 text-slate-800 font-medium">
                                    {userData.email ? (
                                        <>
                                            <Link
                                                to="/profile"
                                                onClick={() => setShowMenu(false)}
                                                className="px-4 py-2 hover:bg-green-200 transition-colors"
                                            >
                                                🧑 Your Profile
                                            </Link>
                                            <Link
                                                to="/orders"
                                                onClick={() => setShowMenu(false)}
                                                className="px-4 py-2 hover:bg-green-200 transition-colors"
                                            >
                                                📦 Your Orders
                                            </Link>
                                        </>
                                    ) : (
                                        <Link
                                            to="/login"
                                            onClick={() => setShowMenu(false)}
                                            className="px-4 py-2 hover:bg-green-200 transition-colors"
                                        >
                                            🔐 Login
                                        </Link>
                                    )}
                                    <hr className="my-1 border-gray-300" />
                                    <Link
                                        to="/terms"
                                        onClick={() => setShowMenu(false)}
                                        className="px-4 py-2 hover:bg-green-100 text-sm transition-colors"
                                    >
                                        📄 Terms of Service
                                    </Link>
                                    <Link
                                        to="/privacy"
                                        onClick={() => setShowMenu(false)}
                                        className="px-4 py-2 hover:bg-green-100 text-sm transition-colors"
                                    >
                                        🔒 Privacy Policy
                                    </Link>
                                    {userData.email && (
                                        <>
                                            <Link
                                                to="/help"
                                                onClick={() => setShowMenu(false)}
                                                className="px-4 py-2 hover:bg-green-100 text-sm transition-colors"
                                            >
                                                🆘 Help Center
                                            </Link>
                                            <hr className="my-1 border-gray-300" />
                                            <button
                                                onClick={handleLogout}
                                                className="px-4 py-2 text-left hover:bg-red-200 text-red-600 transition-colors"
                                            >
                                                🚪 Logout
                                            </button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Header;