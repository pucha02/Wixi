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

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-conf" onClick={onClose}>
      <div className="modal-content-conf">
        <p>ДІЙСНО БАЖАЄТЕ ВИДАЛИТИ ТОВАР?</p>
        <button onClick={onConfirm}>ТАК</button>
        <button onClick={onClose}>НІ</button>
      </div>
    </div>
  );
};

export const CartItems = ({ updateTotalCost, deleteMessage, setDeleteMessage }) => {
  const { items: products = [], loading, error } = useSelector((state) => state.cart);
  const [localProducts, setLocalProducts] = useState([]);
  const [prevIsAuthorized, setPrevIsAuthorized] = useState(null);
  const isAuthorized = !!localStorage.getItem("token");
  const cartItems = useMemo(() => (isAuthorized ? products : localProducts), [isAuthorized, products, localProducts]);
  const [modalData, setModalData] = useState({ isOpen: false, product: null });
  const dispatch = useDispatch();

  const handleQuantityChangeWrapper = (newCount, product) => {
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

  const openModal = (product) => {
    setModalData({ isOpen: true, product });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, product: null });
  };

  const confirmDeletion = () => {
    if (modalData.product) {
      handleRemoveItem(
        modalData.product._id,
        modalData.product,
        dispatch,
        removeItemCart,
        localProducts,
        (updatedProducts) => setLocalProducts(updatedProducts),
        removeItem,
        updateTotalCost
      );
      setDeleteMessage("ТОВАР УСПІШНО ВИДАЛЕНО"); // Установить сообщение
      setTimeout(() => setDeleteMessage(""), 3000);
    }
    closeModal();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
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
    <>
      <ConfirmationModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        onConfirm={confirmDeletion}
      />
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
                  {product.title.toUpperCase()}
                  <div className="cart-product-description-size-color">
                    <div className="cart-product-description-size">
                      КОЛІР: {isAuthorized ? product.color.toUpperCase() : product.color.color_name.toUpperCase()}
                    </div>
                    <div className="cart-product-description-color">
                      РОЗМІР: {product.size}
                    </div>
                  </div>
                </div>
                <div className="cart-item-quantity-cost">
                  <ProductQuantitySelector
                    count={product.quantity}
                    maxCount={product.availableQuantity}
                    setCount={(newCount) =>
                      handleQuantityChangeWrapper(newCount, product)
                    }
                  />
                </div>
                <div className="cart-item-cost">
                  {Math.round(product.cost * product.quantity)} UAH
                </div>
                <img
                  className="bucket-img"
                  onClick={() => openModal(product)}
                  src={BucketImg}
                  alt=""
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
};