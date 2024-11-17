import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './Slider.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function Carousel({ activeColor }) {
  const thumbsSwiperRef = useRef(null); // Используем useRef для thumbsSwiper

  // Если данные еще не загружены, возвращаем null
  if (!activeColor || !activeColor.img) {
    return null;
  }

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiperRef.current ? { swiper: thumbsSwiperRef.current } : undefined} // Проверка thumbsSwiperRef
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {activeColor.img.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.img_link} alt={`product-image-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)} // Инициализируем thumbsSwiper через useRef
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {activeColor.img.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.img_link} alt={`product-thumbnail-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
