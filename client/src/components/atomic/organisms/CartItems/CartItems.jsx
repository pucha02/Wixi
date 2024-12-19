import { handleRemoveItem } from "../../../../utils/cartOperations";
import { removeItem, updateCartItemQuantity } from "../../../../redux/reducers/cartReducer";
import React, { useEffect, useState, useRef } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeItemCart } from "../../../../redux/reducers/cartReducer";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductQuantitySelector } from "../../molecules/QuantitySelector/QuantitySelector";
import { handleQuantityChange } from "../../../../utils/cartOperations";
import './CartItems.css';

import BucketImg from '../../../../assets/svg/bucket.svg';

export const CartItems = ({ updateTotalCost }) => {
  const { items: products = [], loading, error } = useSelector((state) => state.cart);
  const [localProducts, setLocalProducts] = useState([]);
  const [prevIsAuthorized, setPrevIsAuthorized] = useState(null);
  const isAuthorized = !!localStorage.getItem("token");
  const cartItems = useMemo(() => (isAuthorized ? products : localProducts), [isAuthorized, products, localProducts]);
  const dispatch = useDispatch();
  const scrollPosition = useRef(0);
  const listRef = useRef(null);

  // const saveScrollPosition = () => {
  //   if (modalRef.current) {
  //     scrollPosition.current = modalRef.current.scrollTop;
  //   }
  // };

  // const restoreScrollPosition = () => {
  //   if (modalRef.current) {
  //     modalRef.current.scrollTop = scrollPosition.current;
  //   }
  // };

  const handleQuantityChangeWrapper = (newCount, product) => {
    // saveScrollPosition();
    handleQuantityChange(
      newCount,
      product,
      isAuthorized,
      localProducts,
      setLocalProducts,
      dispatch,
      updateCartItemQuantity,
      updateTotalCost
    );
  };
  console.log(cartItems)
  // useEffect(() => {
  //   restoreScrollPosition();
  // });
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Сохраняем гостевую корзину при входе
      const guestCart = localStorage.getItem("cart");
      if (guestCart) {
        localStorage.setItem("guestCart", guestCart);
      }
      dispatch(fetchCart());
    } else {
      try {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setLocalProducts(localCart);
      } catch (error) {
        console.error("Ошибка при чтении данных из localStorage:", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthorized && prevIsAuthorized) {
      // Восстанавливаем гостевую корзину при выходе
      const guestCart = localStorage.getItem("guestCart");
      if (guestCart) {
        localStorage.setItem("cart", guestCart);
        setLocalProducts(JSON.parse(guestCart));
      }
    }
    setPrevIsAuthorized(isAuthorized);
  }, [isAuthorized, prevIsAuthorized]);

  useEffect(() => {
    if (!isAuthorized && localProducts.length > 0) {
      try {
        localStorage.setItem("cart", JSON.stringify(localProducts));
      } catch (error) {
        console.error("Ошибка при сохранении данных в localStorage:", error);
      }
    }
  }, [localProducts, isAuthorized]);

  useEffect(() => {
    if (cartItems.length > 0) {
      updateTotalCost(cartItems);
    }
  }, [cartItems, updateTotalCost]);

  return (
    <ul className="cart-list" ref={listRef}>
      {loading && isAuthorized ? (
        <div>Завантаження кошика...</div>
      ) : error && isAuthorized ? (
        <div>Сталася помилка: {error}</div>
      ) : cartItems.length === 0 ? (
        <div>Ваш кошик порожній.</div>
      ) : (
        cartItems.map((product) => (
          <li className="cart-item" key={product._id || product.id}>
            <ProductImage src={product.img} />
            <div className="cart-item-data">
              <div className="cart-product-description">
                {product.title.toUpperCase()}
                <div className="cart-product-description-size-color">
                  РОЗМІР: {product.size}, КОЛІР: {isAuthorized ? product.color.toUpperCase() : product.color.color_name.toUpperCase()}
                </div>

              </div>
              <div className="cart-item-quantity-cost">
                <ProductQuantitySelector
                  count={product.quantity}
                  setCount={(newCount) =>
                    handleQuantityChangeWrapper(newCount, product, isAuthorized, localProducts, setLocalProducts, dispatch, updateCartItemQuantity, updateTotalCost)
                  }
                />
              </div>
              <div className="cart-item-cost">{Math.round(product.cost)} UAH</div>
              <img
                className="bucket-img"
                onClick={() => handleRemoveItem(product._id, product, dispatch, removeItemCart, localProducts, (updatedProducts) => setLocalProducts(updatedProducts), removeItem, updateTotalCost)}
                src={BucketImg}
                alt=""
              />
            </div>
          </li>
        ))
      )}
    </ul>
  );
};
