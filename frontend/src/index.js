import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Sell from './pages/Sell';
import About from './pages/About';
import Contact from './pages/Contact';
import Newproduct from './pages/Newproduct';
import Login from './pages/login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import store from './redux/index';
import {Provider} from 'react-redux';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import ForgotPassword from './pages/ForgotPassword';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import OrderConfirm from './pages/OrderConfirm';
import MenuCategory from './pages/MenuCategory';
import CategoryPage from './pages/CategoryPage';
import Order from './pages/Order';
import EditProfile from './pages/EditProfile';


const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index element={<Signup/>}/>
        {/* <Route path='menu' element={<Menu/>}/> */}
        <Route path='home' element={<Home/>}/>
        <Route path='/menu/:filterby' element={<Menu/>}/>
        <Route path='sell' element={<Sell/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='newproduct' element={<Newproduct/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='wishlist' element={<Wishlist/>}/>
        <Route path='success' element={<Success/>}/>
        <Route path='cancel' element={<Cancel/>}/>
        <Route path='order-confirmed' element={<OrderConfirm/>}/>
        
        <Route path='cart' element={<Cart/>}/>
        <Route path='forgotpassword' element={<ForgotPassword/>}/>
        <Route path='terms' element={<TermsOfService/>}/>
        <Route path='privacypolicy' element={<PrivacyPolicy/>}/>
        <Route path='editprofile' element={<EditProfile/>}/>
        
        <Route path='menucategory' element={<MenuCategory/>}/>
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/home/menu/:filterby" element={<Menu />} />
        <Route path="/category/fruits/menu/:filterby" element={<Menu />} />
        <Route path="/category/vegetable/menu/:filterby" element={<Menu />} />
        <Route path="/category/seeds/menu/:filterby" element={<Menu />} />
        <Route path="/category/flowers/menu/:filterby" element={<Menu />} /> 
        <Route path="/orders" element={<Order/>} />         

    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
