import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { getDeviceId } from "../../../../utils/checkPromocodeUsage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../../../redux/reducers/cartReducer";
import { CarouselListByTypes } from "../../../atomic/templates/CarouselListByTypes/CarouselListByTypes";
import { PromocodeForm } from "../../../atomic/molecules/PromocodeForm/PromocodeForm";
import { TotalCost } from "../../../atomic/atoms/Cart/TotalCost/TotalCost";
import { CartButton } from "../../../atomic/atoms/Cart/Button/CartButton";
import { CartItems } from "../../../atomic/organisms/CartItems/CartItems";
import { PromoModal } from "../../../atomic/organisms/PromoModal/PromoModal";
import { checkPromo } from "../../../../utils/checkPromocodeUsage";
import './Cart.css';

export const Cart = () => {
  const { items: products } = useSelector((state) => state.cart);

  const [activeIndex, setActiveIndex] = useState(0);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [localProducts, setLocalProducts] = useState([]);
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  const [promoUsed, setPromoUsed] = useState(false);
  const [discount, setDiscount] = useState(
    JSON.parse(localStorage.getItem("discount")) || 0
  );
  const [totalCost, setTotalCost] = useState(
    JSON.parse(localStorage.getItem("totalCost")) || 0
  );
  const [rawTotalCost, setRawTotalCost] = useState(0); // Новый стейт для хранения исходной стоимости без скидки
  const dispatch = useDispatch();
  const isAuthorized = !!localStorage.getItem("token");
  const cartItems = isAuthorized ? products || [] : localProducts || [];


  useEffect(() => {
    if (!isAuthorized) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setLocalProducts(localCart);
    }
  }, [products]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCart());
      localStorage.removeItem("cart");
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthorized && localProducts.length > 0) {
      try {
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (JSON.stringify(currentCart) !== JSON.stringify(localProducts)) {
          localStorage.setItem("cart", JSON.stringify(localProducts));
        }
      } catch (error) {
        console.error("Ошибка при сохранении данных в localStorage:", error);
      }
    }
  }, [localProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
    checkPromo(setPromoUsed, setPromoModalOpen)
  }, []);
  // Пересчёт итоговой стоимости
  useEffect(() => {
    const rawTotal = (cartItems || []).reduce((total, product) => {
      return total + product.cost * product.quantity;
    }, 0);

    setRawTotalCost(rawTotal); // Сохраняем исходную стоимость
    const discountedTotal = discount.discountPercentage > 0 ? rawTotal * (1 - discount.discountPercentage / 100) : rawTotal;

    setTotalCost(discountedTotal);
    localStorage.setItem("totalCost", JSON.stringify(discountedTotal));
  }, [cartItems, discount]);

  const saveDiscount = (discountValue) => {
    setDiscount(discountValue.discountPercentage);
    localStorage.setItem("discount", JSON.stringify(discountValue));
  };

  const updateTotalCost = (updatedCart) => {
    const rawTotal = updatedCart.reduce((total, product) => {
      return total + product.cost * product.quantity;
    }, 0);

    setRawTotalCost(rawTotal); // Обновляем исходную стоимость
    const discountedTotal = discount.discountPercentage > 0 ? rawTotal * (1 - discount.discountPercentage / 100) : rawTotal;

    setTotalCost(discountedTotal);
    localStorage.setItem("totalCost", JSON.stringify(discountedTotal));
  };
  console.log(localStorage.getItem("discount"))

  const handleSubmit = async (promoCodeTitle) => {
    try {
      const deviceId = await getDeviceId();
      const response = await fetch('http://16.171.32.44/api/promocode/check-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, promoCodeTitle: promoCodeTitle }),
      });

      const data = await response.json();
      if (data.isUsed) {
        alert(data.message || 'Ви вже використали цей промокод.');
      } else if (data.discountPercentage) {
        saveDiscount(data);
        alert(`Промокод застосовано! Ви отримали знижку ${data.discountPercentage}%`);
        window.location.reload()
      } else {
        alert(data.message || 'Промокод недійсний.');
      }
    } catch (error) {
      console.error('Ошибка при применении промокода:', error);
      alert('Помилка при застосуванні промокоду. Спробуйте пізніше.');
    }
  };
  return (
    <div className="cart-page">
      <div className="wish-list-container">
        <div className="category-title"><Link to={'/'}>ГОЛОВНА</Link> / <Link to={'/cart'}>КОШИК</Link></div>
        {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
        <CartItems updateTotalCost={updateTotalCost} deleteMessage={deleteMessage} setDeleteMessage={setDeleteMessage} />
        {cartItems.length > 0 && (
          <>
            <div className="promocode-form-block">
              <PromocodeForm handleSubmit={handleSubmit} />
            </div>
            <div>
              <TotalCost totalPrice={totalCost} oldPrice={rawTotalCost} />
            </div>
            <div className="cart-bottom-buttons">
              <Link to={`/category/productList/Костюм`}>
                <CartButton text={"ПРОДОВЖИТИ ПОКУПКИ"} />
              </Link>

              <Link to="/register-order">
                <CartButton text={"ПЕРЕЙТИ ДО ОФОРМЛЕННЯ"} />
              </Link>
            </div>
            {cartItems.map((item) => {
              const seenRelatedProducts = new Set();
              const uniqueRelatedProducts = item.relatedProducts
                ? item.relatedProducts.filter((product) => {
                  const productId = product.id || product._id;
                  if (seenRelatedProducts.has(productId)) {
                    return false;
                  }
                  seenRelatedProducts.add(productId);
                  return true;
                })
                : [];
              if (uniqueRelatedProducts.length === 0) {
                return null;
              }

              return (
                <div className="recently-viewed-container" key={item.id || item._id}>
                  <h2 className="product-item-view-head">РЕКОМЕНДУЄМО ПРИДБАТИ:</h2>
                  <CarouselListByTypes
                    type={null}
                    getdata={uniqueRelatedProducts}
                    countSlide={4}
                    setActiveIndex={setActiveIndex}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
      <PromoModal promoModalOpen={promoModalOpen} setPromoModalOpen={setPromoModalOpen} />
    </div>
  );
};