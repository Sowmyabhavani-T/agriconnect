import React from "react";
//import { CiForkAndKnife } from "react-icons/ci";
import { GiFruitBowl } from "react-icons/gi";

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick} className="cursor-pointer text-center">
  <div className={`text-5xl p-4 rounded-full transition-all duration-300 shadow ${isActive ? "bg-green-600 text-white scale-105" : "bg-green-300 hover:bg-green-400"}`}>
    <GiFruitBowl />
  </div>
  <p className="text-sm font-medium capitalize mt-2">{category}</p>
</div>

  );
};

export default FilterProduct;