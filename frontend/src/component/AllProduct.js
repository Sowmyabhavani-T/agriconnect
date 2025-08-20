import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeatures from "../component/CardFeatures";
import { useNavigate } from "react-router-dom"; // Import useNavigate



const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const navigate = useNavigate(); // Initialize useNavigate

  //filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    navigate(`/category/${category.toLowerCase()}`); // Navigate to category page
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>
      

      {/* Categories Section */}
      <div className="my-5">
        
        

        {/* Product Categories */}
        <div className="flex flex-wrap justify-center gap-8 mb-5 overflow-x-auto scrollbar-none">
                  <div className="relative group w-96 h-72 overflow-hidden rounded-lg" onClick={() => handleFilterProduct("Fruits")}>
                      <img
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                          src="https://media.istockphoto.com/id/636301846/photo/various-ripe-fruits-for-healthy-eating.jpg?s=612x612&w=0&k=20&c=rBbFv4KYdP6x3PLjClbq8pUkDfN9fzENPTqUE8zoXfk="
                          alt="Fruits"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">Fruits</div>
                  </div>

                  <div className="relative group w-96 h-72  overflow-hidden rounded-lg" onClick={() => handleFilterProduct("Vegetable")}>
                      <img
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                          src="https://media.istockphoto.com/id/494390082/photo/superfood-background.jpg?s=612x612&w=0&k=20&c=tzVPmWZlPr7-75ozHsAs7VYSriCbucujupP1SuvA2Qw="
                          alt="Fruits"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">Vegetables</div>
                  </div>

                  <div className="relative group w-96 h-72 overflow-hidden rounded-lg" onClick={() => handleFilterProduct("Seeds")}>
                      <img
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                          src="https://media.istockphoto.com/id/1731830396/photo/sow-different-seeds-in-the-garden-selective-focus.jpg?s=612x612&w=0&k=20&c=qu5GhCS8x-_Mzwjo0_ROJgEIhQ5SLB1LmsR6MjrsPRs="
                          alt="Fruits"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">Seeds</div>
                  </div>
                  


              </div>

              <div className="flex flex-wrap justify-center gap-8 mb-5 overflow-x-auto scrollbar-none">
                  <div className="relative group w-96 h-72 overflow-hidden rounded-lg" onClick={() => handleFilterProduct("Fertilizers")}>
                      <img
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                          src="https://www.skynursery.com/wp-content/uploads/2020/08/gs_fertilizer_700w_5L9A9075.jpg"
                          alt="Fruits"
                      /> 
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">Fertilizers</div>
                  </div> 

                  <div className="relative group w-96 h-72 overflow-hidden rounded-lg" onClick={() => handleFilterProduct("Dairy Products")}> 
                      <img
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                          src="https://tse3.mm.bing.net/th?id=OIP.vhpAYCzEj8u-hx4ZmAc2wQHaEK&pid=Api&P=0&h=180"
                          alt="Fruits"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">Dairy Products</div>
                  </div>

                  <div className="relative group w-96 h-72 overflow-hidden rounded-lg" onClick={() => handleFilterProduct("Equiment")}>
                      <img
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                          src="https://5.imimg.com/data5/DE/KN/GLADMIN-52145984/agricultural-tools-500x500.png"
                          alt="Fruits"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">Equiment</div>
                  </div>

              </div>

        
        
      </div>

    
    </div>
  );
};

export default AllProduct;