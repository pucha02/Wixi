import React from "react";
import "./Heart.css";


export const ProductHeart = React.forwardRef(({ src, toggleHeart, id }, ref) => {
  const storedArray = JSON.parse(localStorage.getItem("wishlist")) || []; // Защита от null

  // Проверяем, есть ли объект с таким id
  const foundItem = storedArray.find((item) => item._id === id);

  return (
    <div className="heart-container" onClick={toggleHeart}>
      <img 
        src={src} 
        alt="" 
        ref={ref} 
        className={foundItem ? "liked" : ""} // Если найден, добавляем класс
      />
    </div>
  );
});
