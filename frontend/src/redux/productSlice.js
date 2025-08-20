// productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
  wishlist: [], // Wishlist state
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = action.payload;
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) { 
        toast("Item already added to cart!");
      } else {
        toast("Item added to cart!");
        const total = action.payload.price;
        state.cartItem = [...state.cartItem, { ...action.payload, quantity: 1, total: total }];
      }
    },
    deleteCartItem: (state, action) => {
      toast("One item removed!");
      state.cartItem = state.cartItem.filter((el) => el._id !== action.payload);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        state.cartItem[index].quantity += 1;
        state.cartItem[index].total = state.cartItem[index].productId.price * state.cartItem[index].quantity;
      }
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1 && state.cartItem[index].quantity > 1) {
        state.cartItem[index].quantity -= 1;
        state.cartItem[index].total = state.cartItem[index].productId.price * state.cartItem[index].quantity;
      }
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addWishlistItem: (state, action) => {
      state.wishlist = [...state.wishlist, action.payload];
    },
    removeWishlistItem: (state, action) => {
      state.wishlist = state.wishlist.filter((el) => el._id !== action.payload);
    },
    setCartItems: (state, action) => {
      state.cartItem = action.payload;
    },
  },
});

// ✅ Export the local reducer actions
export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  setWishlist,
  addWishlistItem,
  removeWishlistItem,
  setCartItems,
} = productSlice.actions;

// ✅ Async thunk action to remove item from cart in the backend
export const removeCartItem = (cartItemId) => async (dispatch, getState) => {
  const userEmail = getState().user.email; // Assuming user email is in your user slice
  if (!userEmail) {
    toast.error("User not logged in.");
    return;
  }
  try {
    const response = await fetch("http://localhost:8000/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail, cartItemId }), // Send cartItemId to backend
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(deleteCartItem(cartItemId)); // Update frontend after successful backend removal
      toast.success("Item removed from cart!");
    } else {
      toast.error(data.message || "Failed to remove item from cart.");
    }
  } catch (error) {
    console.error("❌ Error removing item from cart:", error);
    toast.error("Failed to remove item from cart.");
  }
};

// ✅ Fetch Wishlist from API
export const fetchWishlist = () => async (dispatch, getState) => {
  const userEmail = getState().user.email;
  console.log("📤 Fetching wishlist for:", userEmail);
  try {
    const response = await fetch(`http://localhost:8000/wishlist/${userEmail}`);
    const data = await response.json();

    console.log("📥 Wishlist API Response:", data);

    if (response.ok) {
      dispatch(setWishlist(data));
    } else {
      toast.error("Failed to fetch wishlist");
    }
  } catch (error) {
    console.error("❌ Wishlist Fetch API Error:", error);
    toast.error("Error fetching wishlist");
}
};

// ✅ Add Wishlist Item
export const addToWishlist = (product) => async (dispatch, getState) => {
  const userEmail = getState().user.email;
  console.log("📤 Sending wishlist request:", { userEmail, productId: product._id });
  try {
    const response = await fetch("http://localhost:8000/wishlist/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail, productId: product._id }),
    });

    const data = await response.json();
    console.log("📥 Wishlist API Response:", data);

    if (response.ok) {
      dispatch(addWishlistItem(product));
      toast.success("Added to wishlist!");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("❌ Wishlist API Error:", error);
    toast.error("Failed to add to wishlist");
  }
};

export default productSlice.reducer;