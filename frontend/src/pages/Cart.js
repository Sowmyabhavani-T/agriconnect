// Cart.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../component/CartProduct";
import emptyCartImage from "../images/emptyCartImage.gif";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import { setCartItems } from "../redux/productSlice";
import Footer from "../component/Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user.email) {
        toast.error("You need to be logged in to view your cart.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/cart/${user.email}`);
        const data = await response.json();

        if (response.ok) {
          dispatch(setCartItems(data));
        } else {
          toast.error("Failed to fetch cart items.");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("An error occurred while fetching cart items.");
      }
    };

    fetchCartItems();
  }, [user.email, dispatch]);

  const totalPrice = productCartItem?.reduce(
    (acc, curr) => acc + (curr.productId.price * curr.quantity), 0
  );

  const totalQty = productCartItem?.reduce(
    (acc, curr) => acc + curr.quantity, 0
  );

  const handlePayment = async () => {
    if (!user.email) {
      toast("You are not logged in!");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }
  
    if (paymentMethod === "cod") {
      toast.success("Order confirmed! You will receive your order soon.");
      navigate("/order-confirmed");
      return;
    }
  
    const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
    if (!stripePublicKey) {
      console.error("Stripe public key is undefined. Check your .env file.");
      toast.error("Payment configuration error.");
      return;
    }
  
    const stripePromise = await loadStripe(stripePublicKey);
  
    const orderData = {
      email: user.email,
      customer_name: `${user.firstName} ${user.lastName}`,
      customer_address: address || "No address provided",
      items: productCartItem?.map((item) => ({
        name: item.productId.name,
        price: parseInt(item.productId.price),
        qty: item.quantity,
      })),
    };
  
    try {
      const res = await fetch("http://localhost:8000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
  
      if (!res.ok) {
        console.error("API Error:", await res.text());
        toast.error("Payment failed. Please try again.");
        return;
      }
  
      const { sessionId } = await res.json();
      toast("Redirecting to payment gateway...");
  
      // Wait for the redirect to complete before performing any other actions
      const { error } = await stripePromise.redirectToCheckout({ sessionId: sessionId });
  
      if (error) {
        toast.error("Payment failed. Please try again.");
        return;
      }
  
      // After successful payment, create an order
      const orderResponse = await fetch("http://localhost:8000/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          items: productCartItem.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
          })),
          totalAmount: totalPrice,
        }),
      });
  
      if (!orderResponse.ok) {
        console.error("Order creation failed:", await orderResponse.text());
        toast.error("Failed to create order.");
        return;
      }
  
      toast.success("Order created successfully!");
      navigate("/order-confirmed"); // Navigate after successful order creation
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  
  return (
    <>
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">🛒 Your Cart</h2>

        {productCartItem.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-xl p-4">
              {productCartItem.map((el) => (
                <CartProduct
                  key={el._id}
                  _id={el._id}
                  id={el.productId._id}
                  name={el.productId.name}
                  image={el.productId.image}
                  category={el.productId.category}
                  qty={el.quantity}
                  total={el.productId.price * el.quantity}
                  price={el.productId.price}
                />
              ))}
            </div>

            {/* Summary */}
            <div className="w-full lg:w-1/3 bg-white shadow-xl rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">🧾 Summary</h3>

              <div className="flex justify-between text-gray-600">
                <span>Total Quantity</span>
                <span className="font-semibold">{totalQty}</span>
              </div>

              <div className="flex justify-between text-gray-600 border-b pb-2">
                <span>Total Price</span>
                <span className="font-bold text-green-600">₹ {totalPrice}</span>
              </div>

              {/* Address */}
              <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              {/* Payment */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Select Payment Method</label>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-green-600"
                  />
                  <span>Pay via Card</span>
                </div>

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
                  onClick={handlePayment}
                >
                  Pay Now
                </button>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-green-600"
                  />
                  <span>Cash on Delivery</span>
                </div>

                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition duration-200"
                  onClick={async () => {
                    if (!user.email) {
                      toast("You are not logged in!");
                      setTimeout(() => navigate("/login"), 1000);
                      return;
                    }

                    try {
                      const orderResponse = await fetch("http://localhost:8000/orders/create", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          userEmail: user.email,
                          items: productCartItem.map((item) => ({
                            productId: item.productId._id,
                            quantity: item.quantity,
                            price: item.productId.price
                          })),
                          totalAmount: totalPrice,
                          address: address,
                          paymentMode: "COD"
                        }),
                      });

                      if (!orderResponse.ok) {
                        console.error("Order creation failed:", await orderResponse.text());
                        toast.error("Failed to create order.");
                        return;
                      }

                      toast.success("Order confirmed! You will receive your order soon.");
                      navigate("/order-confirmed");
                    } catch (error) {
                      console.error("COD Order Error:", error);
                      toast.error("An error occurred while placing your order.");
                    }
                  }}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16">
            <img src={emptyCartImage} className="w-64 mb-4" alt="Empty Cart" />
            <p className="text-2xl font-semibold text-gray-600">Your cart is empty!</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;