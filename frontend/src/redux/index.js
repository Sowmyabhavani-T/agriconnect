import {configureStore} from '@reduxjs/toolkit';
 import userSliceReducer from "./userSlice";
 import productSliceReducer from "./productSlice";
 import orderSliceReducer from "./orderSlice"; // Import your order slice reducer

 
// Load state from localStorage
const loadState = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (e) {
      console.warn("Failed to load state from localStorage", e);
      return undefined;
    }
  };
  
  
  // Save state to localStorage
  const saveState = (state) => {
    try {
      const userState = {
        user: state.user, // Only save the user slice
      };
      const serializedState = JSON.stringify(userState);
      localStorage.setItem('reduxState', serializedState);
    } catch (e) {
      console.warn("Failed to save state", e);
    }
  };
  

  
 const store= configureStore({
  reducer : {
   user: userSliceReducer,
   product: productSliceReducer,
   orders: orderSliceReducer, // Add your order slice reducer here with the key 'orders'
  },
    preloadedState: loadState(), // Load initial state from localStorage

 });

 store.subscribe(() => {
  saveState(store.getState()); // Save state to localStorage on every change
 }

    );


export default store;
 