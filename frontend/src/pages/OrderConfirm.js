import React from 'react';
import AllProduct from "../component/AllProduct";
import Footer from '../component/Footer';
import { MdCheckCircle } from "react-icons/md";

const OrderConfirm = () => {
  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
      
      {/* Confirmation Box */}
      <div className="bg-white border border-green-300 w-full max-w-xl mx-auto rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-fade-in">
        <MdCheckCircle className="text-green-600 text-6xl mb-3 animate-pop" />
        <h1 className="text-2xl md:text-3xl font-bold text-green-700">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2">Thank you for shopping with <span className="font-semibold text-green-700">AgriConnect</span>. Your order has been placed successfully.</p>
        <button
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300 shadow-sm"
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
        >
          Continue Shopping
        </button>
      </div>

      {/* Products */}
      <div className="mt-12">
        <AllProduct heading={'🛒 Explore More Products'} />
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirm;
