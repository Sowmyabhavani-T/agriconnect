import React from 'react';
import { Link } from 'react-router-dom';
import { addCartItem } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../redux/productSlice';
import { toast } from 'react-hot-toast';

const CardFeatures = ({ image, name, price, category, loading, id, unitType }) => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);

  const handleAddCartProduct = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, productId: id }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ _id: id, name, price, category, image }));
  };

  return (
    <div className="w-full min-w-[250px] max-w-[200px] bg-white hover:shadow-xl drop-shadow-md p-4 px-4 cursor-pointer flex flex-col rounded-xl transition-transform hover:scale-105 duration-200">
      {image ? (
        <>
          <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-40 flex justify-center items-center overflow-hidden">
              <img src={image} alt={name} className="max-h-full object-contain" />
            </div>
            <h3 className="text-center font-semibold text-slate-700 capitalize text-base md:text-lg mt-4 truncate">{name}</h3>
            <p className="text-center text-slate-500 text-sm">{category}</p>
          </Link>
          <div className="flex items-center justify-center gap-2 mt-1">
            <p className="font-bold">
              <span className="text-red-600">₹</span>
              <span>{price}</span>
            </p>
            <p className="text-slate-500 text-sm">{unitType}</p>
          </div>
          <div className="flex flex-col mt-2">
            <button className="font-semibold text-sm bg-green-600 hover:bg-green-700 rounded text-white py-1 px-2 mb-1" onClick={handleAddToWishlist}>
              Add to Wishlist
            </button>
            <button className="font-semibold text-sm bg-green-600 hover:bg-green-700 text-white rounded py-1 px-2" onClick={handleAddCartProduct}>
              Add Cart
            </button>
          </div>
        </>
      ) : (
        <div className="min-h-[200px] flex justify-center items-center"><p>{loading}</p></div>
      )}
    </div>
  );
};

export default CardFeatures;
