import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './Slider.css'; // Вы можете оставить этот файл для других стилей
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function Carousel({ activeColor }) {
  const thumbsSwiperRef = useRef(null); // Ссылка для миниатюр
  const [scale, setScale] = useState(1); // Стейт для зума
  const [lastTouch, setLastTouch] = useState(null); // Для отслеживания предыдущего касания

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Два пальца — начинаем зум
      const [touch1, touch2] = e.touches;
      const distance = Math.sqrt(
        Math.pow(touch1.clientX - touch2.clientX, 2) +
          Math.pow(touch1.clientY - touch2.clientY, 2)
      );
      setLastTouch(distance);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && lastTouch !== null) {
      const [touch1, touch2] = e.touches;
      const distance = Math.sqrt(
        Math.pow(touch1.clientX - touch2.clientX, 2) +
          Math.pow(touch1.clientY - touch2.clientY, 2)
      );
      const newScale = Math.min(Math.max(scale * (distance / lastTouch), 1), 3); // Ограничиваем зум от 1 до 3
      setScale(newScale);
      setLastTouch(distance);
    }
  };

  const handleTouchEnd = () => {
    setLastTouch(null); // Сбрасываем состояние
  };

  // Стиль для изображения с возможностью масштабирования
  const imageStyle = {
    transform: `scale(${scale})`,
    transition: 'transform 0.3s',
    touchAction: 'none', // Отключаем стандартное поведение
    width: '100%',
    height: 'auto',
    display: 'block',
    transformOrigin: 'center center', // Точка масштабирования
  };

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
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {activeColor.img.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              style={imageStyle} // Применяем стиль к изображению
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
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
