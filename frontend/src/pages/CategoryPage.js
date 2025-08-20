import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CardFeatures from "../component/CardFeatures";
import Footer from "../component/Footer";

import AllProductMenu from "../component/AllProductMenu";

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL
  const productData = useSelector((state) => state.product.productList);
  
  // Filter products by category
  const filteredProducts = productData.filter((el) => el.category.toLowerCase() === category.toLowerCase());

  return (
    <>
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4 capitalize">{category}</h2>

      <div className="flex flex-wrap justify-center gap-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((el) => (
            <CardFeatures key={el._id} id={el._id} image={el.image} name={el.name} category={el.category} price={el.price} unitType={el.unitType} />
          ))
        ) : (
          <p className="text-gray-600 text-center">No products found in this category.</p>
        )}
      </div>
      <AllProductMenu/>
      
    </div>
    <div>
      <Footer/>
    </div>
    </>
  );
};

export default CategoryPage;
