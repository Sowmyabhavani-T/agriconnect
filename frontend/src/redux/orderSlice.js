import { createSlice } from '@reduxjs/toolkit';
 import { toast } from 'react-hot-toast';

 const orderSlice = createSlice({
  name: 'orders',
  initialState: {
   orders: [],
   loading: false,
   error: null,
  },
  reducers: {
   fetchOrdersStart(state) {
    state.loading = true;
    state.error = null;
   },
   fetchOrdersSuccess(state, action) {
    state.loading = false;
    state.orders = action.payload;
   },
   fetchOrdersFailure(state, action) {
    state.loading = false;
    state.error = action.payload;
   },
   cancelOrderStart(state, action) {
    const orderId = action.payload;
    state.orders = state.orders.map(order =>
     order._id === orderId ? { ...order, status: 'Cancelling' } : order
    );
   },
   cancelOrderSuccess(state, action) {
    const updatedOrder = action.payload;
    state.orders = state.orders.map(order =>
     order._id === updatedOrder._id ? updatedOrder : order
    );
   },
   cancelOrderFailure(state, action) {
    const { orderId, error } = action.payload;
    state.orders = state.orders.map(order =>
     order._id === orderId ? { ...order, status: 'Cancellation Failed' } : order
    );
    state.error = error;
   },
  },
 });

 export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  cancelOrderStart,
  cancelOrderSuccess,
  cancelOrderFailure,
 } = orderSlice.actions;

 // Async thunk action to cancel an order
 export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch(cancelOrderStart(orderId));
  try {
   const response = await fetch(`http://localhost:8000/orders/cancel/${orderId}`, {
    method: 'PATCH',
    headers: {
     'Content-Type': 'application/json', // Ensure you're sending JSON (though the body might be empty for this request)
    },
   });
   if (!response.ok) {
    const errorData = await response.json();
    dispatch(cancelOrderFailure({ orderId, error: errorData.message || 'Failed to cancel order' }));
    toast.error(errorData.message || 'Failed to cancel order');
    return;
   }
   const data = await response.json();
   dispatch(cancelOrderSuccess(data.order));
   toast.success('Order cancelled successfully!');
  } catch (error) {
   console.error('Error cancelling order:', error);
   dispatch(cancelOrderFailure({ orderId, error: 'An error occurred while cancelling the order' }));
   toast.error('An error occurred while cancelling the order.');
  }
 };

 export default orderSlice.reducer;