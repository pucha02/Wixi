import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
  const [discount, setDiscount] = useState(
    JSON.parse(localStorage.getItem("discount")) || 0
  ); // Загружаем скидку из localStorage
  const [totalCost, setTotalCost] = useState(
    JSON.parse(localStorage.getItem("totalCost")) || 0
  );
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const isAuthorized = !!localStorage.getItem("token");
  const cartItems = isAuthorized ? products || [] : localProducts || [];

  // Загрузка корзины
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
  }, [dispatch]);

  // Сохранение локальной корзины
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

  // Пересчёт итоговой стоимости при изменении корзины или скидки
  useEffect(() => {
    const rawTotal = (cartItems || []).reduce((total, product) => {
      return total + product.cost * product.quantity;
    }, 0);

    const discountedTotal = discount > 0 ? rawTotal * (1 - discount / 100) : rawTotal;

    setTotalCost(discountedTotal);
    localStorage.setItem("totalCost", JSON.stringify(discountedTotal));
  }, [cartItems, discount]);

  // Сохранение скидки
  const saveDiscount = (discountValue) => {
    setDiscount(discountValue);
    localStorage.setItem("discount", JSON.stringify(discountValue));
  };

  const updateTotalCost = (updatedCart) => {
    const rawTotal = updatedCart.reduce((total, product) => {
      return total + product.cost * product.quantity;
    }, 0);

    const discountedTotal = discount > 0 ? rawTotal * (1 - discount / 100) : rawTotal;

    setTotalCost(discountedTotal);
    localStorage.setItem("totalCost", JSON.stringify(discountedTotal));
  };
  // xmf55472ss
  const handleSubmit = async (promoCodeTitle) => {
    try {
      const promoCode = await getPromocode(promoCodeTitle);
      if (promoCode?.discountPercentage) {
        const discountPercentage = Number(promoCode.discountPercentage);
        if (!isNaN(discountPercentage)) {
          saveDiscount(discountPercentage); // Сохраняем скидку
          alert(`Промокод застосовано! Ви отримали знижку ${discountPercentage}%`);
        } else {
          alert("Некоректний відсоток знижки у промокоді.");
        }
      } else {
        alert("Неправильний промокод або він недійсний.");
      }
    } catch (error) {
      console.error("Ошибка при применении промокода:", error);
      alert("Помилка при застосуванні промокоду. Спробуйте пізніше.");
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="cart-modal-block">
        <h1 className="cart-title">Кошик</h1>
        <CartItems
          updateTotalCost={updateTotalCost} // Передаём callback для обновления общей стоимости
        />
        {cartItems.length > 0 && (
          <>
            <div className="promocode-form-block">
              <PromocodeForm handleSubmit={handleSubmit} />
            </div>
            <div>
              <TotalCost totalPrice={totalCost} />
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
  );
};
