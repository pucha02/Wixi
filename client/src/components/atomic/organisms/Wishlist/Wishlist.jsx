import React, { useState } from "react";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { Link } from "react-router-dom";
import { ProductColor } from "../../atoms/atomsProduct/Color/Color";
import { CartButton } from "../../atoms/Cart/Button/CartButton";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromWishlist } from "../../../../redux/reducers/wishlistReducer";

export const WishlistItems = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSize, setActiveSize] = useState(null);

  const wishListItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId) => {
    // Обновление локального состояния и LocalStorage
    const updatedList = wishListItems.filter(
      (product) => product._id !== productId
    );

    localStorage.setItem("wishlist", JSON.stringify(updatedList));

    // Удаление из Redux
    dispatch(removeItemFromWishlist({ _id: productId }));
  };

  return (
    <div>
      <ul className="wish-list">
        {wishListItems.length === 0 ? (
          <div>Ваш вішлист порожній.</div>
        ) : (
          wishListItems.map((product) => (
            <li className="wish-item" key={product._id || product.id}>
              <ProductImage src={product.img} />
              <div className="wish-item-data">
                <div className="wish-product-description">{product.title}</div>
                <div className="wish-item-cost">{product.cost} UAH</div>
                <div className="wish-product-description-size-color">
                  <ProductColor
                    colorname={product.color}
                    isAvailable={true}
                    index={activeIndex}
                    setActiveIndex={setActiveIndex}
                    setActiveSize={setActiveSize}
                  />
                </div>
                <div className="">
                  {product.color?.sizes?.reduce(
                    (total, size) => total + size.availableQuantity,
                    0
                  ) > 0 ? (
                    <div className="availability-text">В НАЯВНОСТІ</div>
                  ) : (
                    <div className="availability-text none">
                      НЕМАЄ У НАЯВНОСТІ
                    </div>
                  )}
                </div>
                <div className="wishlist-btns">
                  <CartButton
                    text={"ВИДАЛИТИ"}
                    handleClick={() =>
                      handleRemoveFromWishlist(product._id || product.id)
                    }
                  />
                  <br />
                  <br />
                  <Link
                    to={`/category/productList/${product.category}/${product.title}`}
                  >
                    <CartButton text={"ПЕРЕЙТИ ДО ТОВАРУ"} />
                  </Link>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
