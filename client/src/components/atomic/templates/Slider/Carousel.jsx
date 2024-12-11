import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom'; // Добавляем стили для Zoom
import './Slider.css';
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';

export default function Carousel({ activeColor }) {
  const thumbsSwiperRef = useRef(null);

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
        thumbs={thumbsSwiperRef.current ? { swiper: thumbsSwiperRef.current } : undefined}
        zoom={true} // Включаем зум
        modules={[FreeMode, Navigation, Thumbs, Zoom]} // Добавляем модуль Zoom
        className="mySwiper2"
      >
        {activeColor.img.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container"> {/* Контейнер для зума */}
              <img src={image.img_link} alt={`product-image-${index}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)}
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
