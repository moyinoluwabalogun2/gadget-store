import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/ImageSlider.css';

const ImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="image-slider">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="slide-image">
              <img src={image} alt={`Product view ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;