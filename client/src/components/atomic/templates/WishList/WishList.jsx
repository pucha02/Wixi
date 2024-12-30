import { WishlistItems } from "../../organisms/Wishlist/Wishlist";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const WishList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="wish-list-container">
        <div className="category-title">
          <Link to={"/"}>ГОЛОВНА</Link> / <Link to={"/wishlist"}>УЛЮБЛЕНЕ</Link>
        </div>
        <WishlistItems />
      </div>
    </div>
  );
};
