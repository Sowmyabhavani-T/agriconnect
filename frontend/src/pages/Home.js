import React, { useEffect, useRef, useState } from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeatures from "../component/CardFeatures";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import Footer from "../component/Footer";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query")?.toLowerCase() || "";

  const homeProductCartList = productData
    .slice(9, 15)
    .filter((el) => el.name.toLowerCase().includes(searchQuery));

  const homeProductCartListVegetables = productData
    .filter((el) => el.category === "Vegetable" && el.name.toLowerCase().includes(searchQuery));

  const loadingArray = new Array(6).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 280;
  };

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 280;
  };

  const noMatch =
    searchQuery &&
    homeProductCartList.length === 0 &&
    homeProductCartListVegetables.length === 0;

  return (
    <>
      <div className="p-6 md:p-4">
        {/* Hero Section */}
        <div
          className="md:flex gap-4 py-4 relative min-h-[500px] items-center"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/182719058/photo/green-wheat-field-swaying-in-the-breeze-under-a-blue-sky.jpg?s=612x612&w=0&k=20&c=I5lpEJw9kWKIqZCWOufF_kUbI5Q_Xt8SNhHgl6Bfbeg=')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-5"></div>

          <div className="md:w-1/2 p-2 relative z-10">
            <h2 className="text-4xl md:text-7xl font-bold py-6">
              Fresh from the farm{" "}
              <span className="text-green-900">Straight to your home.</span>
            </h2>
            <p className="py-3 text-base text-white">
              Connecting farmers and buyers directly to ensure fresh produce,
              fair prices, and sustainable growth for all.
            </p>
            <Link to="/menucategory">
            <button className="font-bold bg-green-600 text-slate-200 px-4 py-2 rounded-sm">
              Order Now
            
            </button>
            </Link>
          </div>

          <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center relative z-10">
            {homeProductCartList.length > 0 ? (
              homeProductCartList.map((el) => (
                <HomeCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                  unitType={el.unitType}
                />
              ))
            ) : (
              <>
                {searchQuery ? (
                  <p className="text-red-600 text-lg mt-4">
                    ❌ No items matched your search.
                  </p>
                ) : (
                  loadingArray.map((el, index) => (
                    <HomeCard key={index + "loading"} loading="Loading.." />
                  ))
                )}
              </>
            )}
          </div>
        </div>

        {/* Vegetables Section */}
        {!noMatch && (
          <div className="mt-6">
            <div className="flex w-full items-center">
              <h2 className="font-bold text-2xl text-slate-800 mt-3 mb-3">
                Vegetables
              </h2>
              <div className="ml-auto flex gap-4">
                <button
                  className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
                  onClick={prevProduct}
                >
                  <GrPrevious />
                </button>
                <button
                  className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
                  onClick={nextProduct}
                >
                  <GrNext />
                </button>
              </div>
            </div>

            <div
              className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
              ref={slideProductRef}
            >
              {homeProductCartListVegetables.length > 0 ? (
                homeProductCartListVegetables.map((el) => (
                  <CardFeatures
                    key={el._id + "Vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                    unitType={el.unitType}
                  />
                ))
              ) : (
                loadingArrayFeature.map((el, index) => (
                  <CardFeatures
                    key={index + "cartLoading"}
                    loading="Loading..."
                  />
                ))
              )}
            </div>
          </div>
        )}

        {!noMatch && <AllProduct heading={"Your Product"} />}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;