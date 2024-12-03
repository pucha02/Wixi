import './Heart.css';

export const ProductHeart = ({ src, isLiked, toggleHeart }) => {
  return (
    <div className="heart-container" onClick={toggleHeart}>
      <img src={src} alt="" className={isLiked ? "liked" : ""} />
    </div>
  );
};
