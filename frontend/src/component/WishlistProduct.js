import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlistItem } from "../redux/productSlice"; // Keep the frontend update for immediate UI feedback
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const WishlistProduct = ({ id, image, name, category, price ,unitType}) => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email); // Get user email from Redux

  const handleRemoveFromWishlist = async () => {
    if (!userEmail) {
      toast.error("User  not logged in.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/wishlist/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, productId: id }), // Ensure productId is sent correctly
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(removeWishlistItem(id)); // Update frontend after successful backend removal
        toast.success(`${name} removed from Wishlist`);
      } else {
        toast.error(data.message || "Failed to remove from Wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from Wishlist");
    }
  };

  const handleAddToCart = async () => {
    if (!userEmail) {
      toast.error("User  not logged in.");
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
        toast.success(`${name} added to Cart`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    
    <div className="w-72 h-[400px] bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden p-5 flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
  {/* Product Image */}
  <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
  <img src={image} alt={name} className="w-36 h-36 object-cover rounded-xl border border-gray-200" />

  {/* Product Info */}
  <div className="text-center mt-4 space-y-1">
    <h3 className="font-semibold text-lg text-gray-800 truncate">{name}</h3>
    <p className="text-gray-500 text-sm">{category}</p>
    <div className='flex items-center gap-4'>
  <p className='font-bold'>
    <span className='text-red-600'>₹</span>
    <span>{price}</span>
  </p>
  <p className='text-slate-500 font-medium'>{unitType}</p>
</div>
  </div>
  </Link>

  {/* Buttons */}
  <div className="flex flex-col gap-3 mt-5 w-full">
    <button
      onClick={handleAddToCart}
      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300"
    >
      Add to Cart
    </button>
    <button
      onClick={handleRemoveFromWishlist}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300"
    >
      Remove
    </button>
  </div>
  
</div>


  );
};

export default WishlistProduct;