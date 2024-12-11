import React from "react";
import "./Heart.css";
import { useSelector } from "react-redux";

export const ProductHeart = React.forwardRef(({ src, src2, toggleHeart, id, isLiked }, ref) => {
  return (
    <div className="heart-container" onClick={toggleHeart}>
      <img 
        src={isLiked ? src2 : src} 
        alt="" 
        ref={ref} 
        className={isLiked ? "liked" : ""} // Если найден, добавляем класс
      />
    </div>
  );
});

