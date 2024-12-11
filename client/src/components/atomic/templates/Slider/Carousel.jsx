// import React, { useRef} from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import './Slider.css';
// import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// export default function Carousel({ activeColor }) {
//   const thumbsSwiperRef = useRef(null); // Используем useRef для thumbsSwiper

//   // Если данные еще не загружены, возвращаем null
//   if (!activeColor || !activeColor.img) {
//     return null;
//   }

//   return (
//     <>
//       <Swiper
//         style={{
//           '--swiper-navigation-color': '#fff',
//           '--swiper-pagination-color': '#fff',
//         }}
//         loop={true}
//         spaceBetween={10}
//         navigation={true}
//         thumbs={thumbsSwiperRef.current ? { swiper: thumbsSwiperRef.current } : undefined} // Проверка thumbsSwiperRef
//         modules={[FreeMode, Navigation, Thumbs]}
//         className="mySwiper2"
//       >
//         {activeColor.img.map((image, index) => (
//           <SwiperSlide key={index}>
//             <img src={image.img_link} alt={`product-image-${index}`} />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <Swiper
//         onSwiper={(swiper) => (thumbsSwiperRef.current = swiper)}
//         loop={true}
//         spaceBetween={10}
//         slidesPerView={4}
//         freeMode={true}
//         watchSlidesProgress={true}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className="mySwiper"
//       >
//         {activeColor.img.map((image, index) => (
//           <SwiperSlide key={index}>
//             <img src={image.img_link} alt={`product-thumbnail-${index}`} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </>
//   );
// }


import React, { useState, useRef } from 'react';
import './Slider.css'; // Создадим стили с нуля

export default function CustomSlider({ activeColor }) {
  const [currentIndex, setCurrentIndex] = useState(0); // Текущий индекс слайда
  const [isZoomed, setIsZoomed] = useState(false); // Зум-контроль
  const sliderRef = useRef(null);

  // Проверяем, если данные не загрузились
  if (!activeColor || !activeColor.img) {
    return null;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activeColor.img.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + activeColor.img.length) % activeColor.img.length
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="slider-container">
      <div className="slider" ref={sliderRef}>
        <button className="prev-button" onClick={handlePrev}>
          ❮
        </button>

        <div
          className={`slide ${isZoomed ? 'zoomed' : ''}`}
          onClick={toggleZoom} // Зум по клику на изображение
        >
          <img
            src={activeColor.img[currentIndex].img_link}
            alt={`product-image-${currentIndex}`}
          />
        </div>

        <button className="next-button" onClick={handleNext}>
          ❯
        </button>
      </div>

      <div className="thumbnails">
        {activeColor.img.map((image, index) => (
          <img
            key={index}
            src={image.img_link}
            alt={`thumbnail-${index}`}
            className={currentIndex === index ? 'active-thumbnail' : ''}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}