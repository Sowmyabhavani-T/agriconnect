import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure, cancelOrder } from '../redux/orderSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user.email) return;
      dispatch(fetchOrdersStart());
      try {
        const response = await fetch(`http://localhost:8000/orders/${user.email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        dispatch(fetchOrdersSuccess(data));
      } catch (error) {
        dispatch(fetchOrdersFailure(error.message));
        toast.error(error.message);
      }
    };
    fetchOrders();
  }, [dispatch, user.email]);

  const handleCancelOrder = async (orderId) => {
    try {
      await dispatch(cancelOrder(orderId));
      navigate('/cancel');
    } catch (error) {
      toast.error("Order cancellation failed.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-green-50 to-white min-h-screen transition-colors duration-500">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
        📝 Your Orders
      </h2>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 transition duration-500 ease-out transform opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Order ID: {order._id}
              </h3>
              <div className="text-gray-700 space-y-1">
                <p><span className="font-medium">Email:</span> {order.userEmail}</p>
                <p><span className="font-medium">Total Amount:</span> ₹ {order.totalAmount}</p>
                <p><span className="font-medium">Order Date:</span> {new Date(order.orderDate).toLocaleString()}</p>
                <p><span className="font-medium">Status:</span> {order.status}</p>
              </div>

              <h4 className="mt-4 font-semibold text-green-600">Items:</h4>
              <ul className="divide-y divide-gray-100 mt-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-4 py-2">
                    <img
                      src={item.productId?.image}
                      alt={item.productId?.name}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                    <div className="text-sm text-gray-800">
                      <p className="font-semibold">{item.productId?.name}</p>
                      <p>Quantity: {item.quantity} | ₹ {item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {order.status === 'Shipped' && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="bg-red-500 hover:bg-red-600 transition text-white font-semibold py-2 px-6 rounded-lg mt-4"
                >
                  Cancel Order
                </button>
              )}
              {order.status === 'Cancelling' && (
                <p className="text-yellow-500 font-semibold mt-2">Cancelling...</p>
              )}
              {order.status === 'Cancellation Failed' && (
                <p className="text-red-500 font-semibold mt-2">Cancellation Failed.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-2xl font-medium text-gray-500">You have no orders yet!</p>
        </div>
      )}
    </div>
  );
};

export default Order;
