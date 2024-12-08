import { handleRemoveItem } from "../../../../utils/cartOperations";
import { removeItem, updateCartItemQuantity } from "../../../../redux/reducers/cartReducer";
import React, { useEffect, useState } from "react";
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
  const isAuthorized = !!localStorage.getItem("token");
  const cartItems = isAuthorized ? products : localProducts;
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
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
    <ul className="cart-list">
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
                {product.title}
                <div className="cart-product-description-size-color">
                  РОЗМІР: {product.size}, КОЛІР: {product.color ? product.color.color_name : 'Не вказано'}
                </div>
              </div>
              <div className="cart-item-quantity-cost">
                <ProductQuantitySelector
                  count={product.quantity}
                  setCount={(newCount) =>
                    handleQuantityChange(newCount, product, isAuthorized, localProducts, setLocalProducts, dispatch, updateCartItemQuantity)
                  }
                />
              </div>
              <div className="cart-item-cost">{product.cost}$</div>
              <img
                className="bucket-img"
                onClick={() => handleRemoveItem(product._id, product, dispatch, removeItemCart, localProducts, (updatedProducts) => setLocalProducts(updatedProducts), removeItem)}
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
