import Header from './component/Header';  // Adjust the path based on where the Header component is located
import { Outlet } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product); // Access specific slice
  
  useEffect(() => {
    (async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
        const resData = await res.json();
        console.log(resData);
        dispatch(setDataProduct(resData)); // Pass fetched data
    })();
  }, [dispatch]);

  console.log(productData); // Verify data
  return (
    <>
      
      <Toaster />
      <div>
        <Header />
        <main className='pt-12 bg-slate-100 min-h-[calc(100vh)]'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
