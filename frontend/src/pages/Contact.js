import React from "react";
import Contactimage from "../images/Contact.webp";
import Footer from "../component/Footer";


const Contact = () => {
  return (
    <div className="font-sans">
     
      

      {/* Hero Section */}
      <div className="relative h-[400px] bg-green-600 text-white flex flex-col justify-center items-center text-center bg-cover bg-center" style={{ backgroundImage: `url(${Contactimage})` }}>
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-bold">Contact</h1>
        </div>
      </div>

      {/* Contact Info & Form */}
      <div className="grid md:grid-cols-2 p-8 gap-8 bg-gray-100">
        <div>
          <h2 className="text-green-700 text-3xl font-bold">Join AgriConnect</h2>
          <p className="text-gray-700 mt-4">
            How about applying your experience and knowledge to a new and exciting challenge?
          </p>
          <div className="mt-6 space-y-4">
            <p className="flex items-center text-gray-700"><span className="text-green-600 mr-2">📞</span> Call Us: +91 8247754500</p>
            <p className="flex items-center text-gray-700"><span className="text-green-600 mr-2">✉️</span> Email: tappitasailahari2004@gmail.com</p>
            <p className="flex items-center text-gray-700"><span className="text-green-600 mr-2">📍</span> Vishakapatnam</p>
          </div>
        </div>

        <form className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-green-700 text-2xl font-bold mb-4">Get in Touch</h2>
          <input type="text" placeholder="Name" className="w-full p-2 mb-4 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" />
          <input type="tel" placeholder="Phone" className="w-full p-2 mb-4 border rounded" />
          <input type="text" placeholder="Your Subject" className="w-full p-2 mb-4 border rounded" />
          <textarea placeholder="Message" className="w-full p-2 mb-4 border rounded h-24"></textarea>
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">SUBMIT</button>
        </form>
      </div>


      <Footer/>
      
    </div>
    
  );
};

export default Contact;
