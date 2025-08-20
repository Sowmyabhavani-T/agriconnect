import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import CardFeatures from "./CardFeatures";

const AllProductMenu = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  //filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-8 px-4">
  <h2 className="font-bold text-3xl text-center text-green-700 mb-8">{heading}</h2>

  {/* Category Filter */}
  <div className="flex gap-4 justify-center overflow-x-auto scrollbar-none pb-4 mb-6">
    {categoryList.length > 0 ? (
      categoryList.map((el) => (
        <FilterProduct
          category={el}
          key={el}
          isActive={el.toLowerCase() === filterby.toLowerCase()}
          onClick={() => handleFilterProduct(el)}
        />
      ))
    ) : (
      <p className="text-gray-500">Loading categories...</p>
    )}
  </div>

  {/* Products Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
    {dataFilter.length > 0
      ? dataFilter.map((el) => (
          <CardFeatures
            key={el._id}
            id={el._id}
            image={el.image}
            name={el.name}
            category={el.category}
            price={el.price}
            unitType={el.unitType}
            description={el.description}
          />
        ))
      : loadingArrayFeature.map((_, index) => (
          <CardFeatures loading="Loading..." key={index + "allProduct"} />
        ))}
  </div>
</div>

  );
};

export default AllProductMenu;