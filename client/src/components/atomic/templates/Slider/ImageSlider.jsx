import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./ImageSlider.css";

const ImageSlider = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState({ scale: 1, x: 0, y: 0 });
  const swiperRef = useRef(null);
  const mainImageRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Проверить сразу при загрузке
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (images && images.length > 0 && images[0]?.img_link) {
      setSelectedImage(images[0].img_link);
    }
  }, [images]);

  const handleThumbnailClick = (img, index) => {
    setSelectedImage(img.img_link);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;

    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 30; // Процентная позиция по X
    const y = ((e.clientY - rect.top) / rect.height) * 30; // Процентная позиция по Y

    setZoom({ scale: 2, x, y }); // Устанавливаем масштаб и позицию
  };

  const handleMouseLeave = () => {
    setZoom({ scale: 1, x: 0, y: 0 }); // Возвращаем к исходному состоянию
  };

  return (
    <div className="slider-cont">
      {/* Вертикальные миниатюры */}
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        direction={isMobile ? "horizontal" : "vertical"} // Меняем направление
        slidesPerView={isMobile ? 3 : 2}
        spaceBetween={10}
        className="thumbnails"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img.img_link}
              alt={`Thumbnail ${index}`}
              className={`thumbnail ${selectedImage === img.img_link ? "active" : ""
                }`}
              onClick={() => handleThumbnailClick(img, index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>;
      {/* Основное изображение */}
      <div
        className="main-image"
        ref={mainImageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Main display"
            style={{
              transform: `scale(${zoom.scale}) translate(-${zoom.x}%, -${zoom.y}%)`,
              transformOrigin: `${zoom.x}% ${zoom.y}%`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
