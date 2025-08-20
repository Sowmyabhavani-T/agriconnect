import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../redux/productSlice";
import WishlistProduct from "../component/WishlistProduct";
import Footer from "../component/Footer";


const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.product.wishlist);
  const userEmail = useSelector((state) => state.user.email);

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchWishlist(userEmail));  // Ensure user-specific wishlist
    }
  }, [dispatch, userEmail]);

  console.log("Wishlist Data:", wishlist); // Debugging API response

  return (
    <>
<div className="py-12 px-4 sm:px-8 md:px-12 bg-gradient-to-br from-white to-green-50 min-h-screen transition-all">
  <h2 className="font-bold text-4xl text-green-700 text-center mb-10">
    💚 Your Wishlist
  </h2>

  {wishlist?.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
      {wishlist.map((el) => (
        <WishlistProduct 
          key={el._id}
          id={el.productId?._id}
          image={el.productId?.image || "default-image-url"} 
          name={el.productId?.name || "Unnamed Product"} 
          category={el.productId?.category || "Unknown"} 
          price={el.productId?.price || "N/A"} 
          unitType={el.productId?.unitType || "N/A"}
        />
      ))}
    </div>
  ) : (
    <div className="text-center mt-16">
      <p className="text-xl text-gray-500">Your wishlist is empty!</p>
    </div>
  )}

  
</div>
<div>
  <Footer />
</div>

</>

  );
};

export default Wishlist;