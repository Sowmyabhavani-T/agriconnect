import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AllProduct from '../component/AllProduct';
import { addCartItem } from '../redux/productSlice';
import Footer from '../component/Footer';
import { FaWhatsapp } from 'react-icons/fa'; 
import { MdEmail } from 'react-icons/md'; // Email icon
import { addToWishlist } from '../redux/productSlice';

const Menu = () => {
  const { filterby } = useParams();
  const productData = useSelector((state) => state.product.productList);
  
  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  const dispatch = useDispatch();

  /*const handleAddCartProduct = (e) => {
      dispatch(addCartItem(productDisplay));
  };*/

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(productDisplay));
  };

  

  return (
    <div className='p-2 md:p-4'>
      <div className='w-full max-w-4xl m-auto md:flex bg-white'>
        <div className='max-w-sm shadow overflow-hidden w-full p-5'>
          <img src={productDisplay.image} className='hover:scale-105 transition-all h-full' alt={productDisplay.name} />
        </div>
        <div className='p-4 flex flex-col gap-1'>
          <h3 className='font-semibold text-slate-700 capitalize text-2xl md:text-4xl'>{productDisplay.name}</h3>
          <p className='text-slate-500 font-medium'>{productDisplay.category}</p>
          <div className='flex items-center gap-2'>
  <p className='font-bold'>
    <span className='text-red-600'>₹</span>
    <span>{productDisplay.price}</span>
  </p>
  <p className='text-slate-500 font-medium'>{productDisplay.unitType}</p>
</div>
{/*<p className='font-medium'>Seller Email: {productDisplay.sellerEmail}</p>*} 
          {/*<p className='font-medium'>Seller Contact Number: {productDisplay.contactNumber}</p> */}
          {/* Email Contact */}
<a
  href={`mailto:${productDisplay.sellerEmail}`}
  className="flex items-center gap-2 text-green-600 font-medium hover:underline mt-1"
>
  <MdEmail size={20} />
  <span>Email Seller</span>
</a>

          <a
  href={`https://wa.me/${productDisplay.contactNumber}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-green-600 font-medium hover:underline mt-1"
>
  <FaWhatsapp size={20} />
  <span>Contact Seller</span>
</a>
          
           {/* <button className='font-semibold text-lg bg-green-600 hover:bg-green-700 text-white rounded mt-2 py-1 min-w-[100px]' onClick={handleAddCartProduct}>Add Cart</button>*/}
            <button className='w-1/2 font-semibold text-lg bg-green-600 hover:bg-green-700 rounded text-white mt-2 py-1 min-w-[100px]' onClick={handleAddToWishlist}>Add to Wishlist</button>
          
          <div className=''>
            <p className='text-slate-600 font-medium'>Description</p>
            <p className='text-slate-900'>{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <div>
        <AllProduct heading={'Related Products'} />
      </div>
      <Footer />
    </div>
  );
};

export default Menu;