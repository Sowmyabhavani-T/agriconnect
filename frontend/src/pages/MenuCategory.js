import React from 'react';
import AllProductMenu from '../component/AllProductMenu';
import Footer from '../component/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const MenuCategory = () => {
    const sliderImages = [
        "https://images.unsplash.com/photo-1561222533-cfecd626a066?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1663127123513-a11369f67c8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1664302148512-ddea30cd2a92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlc2glMjB2ZWdldGFibGVzfGVufDB8fDB8fHww",
        "https://www.skynursery.com/wp-content/uploads/2020/08/gs_fertilizer_700w_5L9A9075.jpg",
      ];
    

  return (
    <>
    <div className="px-4 md:px-8">
      {/* Carousel Section */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1} 
        loop={true}
        autoplay={{ delay: 2500 }}
        modules={[Autoplay]}
        className="mt-4 rounded-2xl overflow-hidden shadow-lg mb-6"
      >
        {sliderImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index}`} className="w-full h-[250px] md:h-[400px] object-cover" />
          </SwiperSlide> 
        ))}
      </Swiper>

      {/* All Products Section */}
      <AllProductMenu heading={"All Products"} />
      
    </div>

        <div>
          <Footer/>
        </div>
    </>
  );
};

export default MenuCategory;
