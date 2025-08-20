import React from 'react';
import AllProduct from "../component/AllProduct";
import Footer from '../component/Footer';
import { MdCancel } from "react-icons/md";

const Cancel = () => {
  return (
    <>
      <div className="p-6 md:p-10 bg-gradient-to-br from-red-50 via-white to-red-100 min-h-screen">

        {/* Payment Cancel Box */}
        <div className="bg-white border border-red-300 w-full max-w-xl mx-auto rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-fade-in">
          <MdCancel className="text-red-600 text-6xl mb-3 animate-pop" />
          <h1 className="text-2xl md:text-3xl font-bold text-red-700">Payment Cancelled</h1>
          <p className="text-gray-600 mt-2">Your transaction was not completed. Feel free to explore more products on <span className="font-semibold text-red-700">AgriConnect</span>.</p>
          <button
            className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition duration-300 shadow-sm"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
          >
            Continue Shopping
          </button>
        </div>

        {/* Products Section */}
        <div className="mt-12">
          <AllProduct heading={'🛒 Continue Shopping'} />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Cancel;
