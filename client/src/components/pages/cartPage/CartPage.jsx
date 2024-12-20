import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../../redux/reducers/cartReducer";
import { Modal } from "../../../common/Modal";
import { PromocodeForm } from "../../atomic/molecules/PromocodeForm/PromocodeForm";
import { TotalCost } from "../../atomic/atoms/Cart/TotalCost/TotalCost";
import { CartButton } from "../../atomic/atoms/Cart/Button/CartButton";
import { CartItems } from "../../atomic/organisms/CartItems/CartItems";
import useGetDataProduct from "../../../services/FetchData";
import { useRef } from "react";
import './Cart.css';

export const CartPage = ({ isModalOpen, setIsModalOpen }) => {
  const { items: products } = useSelector((state) => state.cart);
  const { getPromocode } = useGetDataProduct();
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
  const modalRef = useRef(null);
  const isAuthorized = !!localStorage.getItem("token");
  const cartItems = isAuthorized ? products || [] : localProducts || [];


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchCart());
      localStorage.removeItem("cart");
    } else {
      try {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setLocalProducts(localCart);
      } catch (error) {
        console.error("Ошибка при чтении данных из localStorage:", error);
      }
    }
  }, [dispatch, products]);

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

  // Пересчёт итоговой стоимости
  useEffect(() => {
    const rawTotal = (cartItems || []).reduce((total, product) => {
      return total + product.cost * product.quantity;
    }, 0);

    setRawTotalCost(rawTotal); // Сохраняем исходную стоимость
    const discountedTotal = discount > 0 ? rawTotal * (1 - discount / 100) : rawTotal;

    setTotalCost(discountedTotal);
    localStorage.setItem("totalCost", JSON.stringify(discountedTotal));
  }, [cartItems, discount]);

  useEffect(() => {
    const promoTimeoutDuration = 180000; // 60 секунд
    const savedStartTime = localStorage.getItem("promoStartTime");
  
    // Проверяем, был ли таймер запущен
    if (!savedStartTime) {
      // Если таймер ещё не запущен, сохраняем текущее время в localStorage
      const startTime = Date.now();
      localStorage.setItem("promoStartTime", startTime);
  
      // Запускаем проверку промокода
      const timeout = setTimeout(() => {
        checkPromoUsage();
        localStorage.removeItem("promoStartTime"); // Удаляем запись после срабатывания таймера
      }, promoTimeoutDuration);
  
      return () => clearTimeout(timeout); // Очищаем таймер при размонтировании
    } else {
      // Если таймер уже запущен, рассчитываем оставшееся время
      const elapsed = Date.now() - parseInt(savedStartTime, 10);
      const remainingTime = promoTimeoutDuration - elapsed;
  
      if (remainingTime > 0) {
        // Если время ещё не истекло, запускаем таймер с оставшимся временем
        const timeout = setTimeout(() => {
          checkPromoUsage();
          localStorage.removeItem("promoStartTime"); // Удаляем запись после срабатывания таймера
        }, remainingTime);
  
        return () => clearTimeout(timeout); // Очищаем таймер при размонтировании
      } else {
        // Если время уже истекло, сразу запускаем проверку
        checkPromoUsage();
        localStorage.removeItem("promoStartTime");
      }
    }
  }, []);

  const checkPromoUsage = async () => {
    try {
      const deviceId = await getDeviceId();
      const response = await fetch("http://16.171.32.44/api/promocode/check-promocode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deviceId, promoCodeTitle: "shop10" }),
      });

      const data = await response.json();
      if (data.isUsed) {
        setPromoUsed(true);
      } else {
        setPromoModalOpen(true);
      }
    } catch (error) {
      console.error("Ошибка при проверке промокода:", error);
    }
  };

  const saveDiscount = (discountValue) => {
    setDiscount(discountValue);
    localStorage.setItem("discount", JSON.stringify(discountValue));
  };

  const updateTotalCost = (updatedCart) => {
    const rawTotal = updatedCart.reduce((total, product) => {
      return total + product.cost * product.quantity;
    }, 0);

    setRawTotalCost(rawTotal); // Обновляем исходную стоимость
    const discountedTotal = discount > 0 ? rawTotal * (1 - discount / 100) : rawTotal;

    setTotalCost(discountedTotal);
    localStorage.setItem("totalCost", JSON.stringify(discountedTotal));
  };

  const getDeviceId = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  };

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
        saveDiscount(data.discountPercentage);
        alert(`Промокод застосовано! Ви отримали знижку ${data.discountPercentage}%`);
      } else {
        alert(data.message || 'Промокод недійсний.');
      }
    } catch (error) {
      console.error('Ошибка при применении промокода:', error);
      alert('Помилка при застосуванні промокоду. Спробуйте пізніше.');
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="cart-modal-block">
          <h1 className="cart-title">Кошик</h1>
          <CartItems updateTotalCost={updateTotalCost} />
          {cartItems.length > 0 && (
            <>
              <div className="promocode-form-block">
                <PromocodeForm handleSubmit={handleSubmit} />
              </div>
              <div>
                <TotalCost totalPrice={totalCost} oldPrice={rawTotalCost} />
              </div>
              <div className="cart-bottom-buttons">
                <CartButton handleClick={() => setIsModalOpen(false)} text={"ПРОДОВЖИТИ ПОКУПКИ"} />
                <Link to="/register-order">
                  <CartButton text={"ПЕРЕЙТИ ДО ОФОРМЛЕННЯ"} />
                </Link>
              </div>
            </>
          )}
        </div>
      </Modal>

      <Modal isOpen={promoModalOpen} onClose={() => setPromoModalOpen(false)} className={'border'}>
        <div className="promo-modal">
          <div className="promo-modal-head">Даруємо знижку</div>
          <div className="promo-modal-sub-head">-10% на весь асортимент</div>
          <div className="promo-modal-promocode">з промокодом</div>
          <div className="promo-modal-promocode-name">
            <p>shop10</p>
          </div>
          <div className="promo-modal-bottom">
            <p>
              для активації введіть промокод у відповідному полі під час оформлення замовлення*
            </p>
          </div>
        </div>
      </Modal>
    </>

  );
};


