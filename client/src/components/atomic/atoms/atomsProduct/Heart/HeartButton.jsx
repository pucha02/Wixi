import React from "react";

import { useSelector } from "react-redux";

export const ProductHeartButton = React.forwardRef(
  ({ src, src2, toggleHeart, id, isLiked }, ref) => {
    return (
      <div
        ref={ref}
        className={`heart-button-container ${isLiked ? "liked" : ""}`}
        onClick={toggleHeart}
      >
        {/* <img 
        src={isLiked ? src2 : src} 
        alt="" 
        ref={ref} 
        className={isLiked ? "liked" : ""} // Если найден, добавляем класс
      /> */}
        <div>{isLiked ? "ПРИБРАТИ" : " ДОДАТИ В УЛЮБЛЕНЕ"}</div>
      </div>
    );
  }
);
