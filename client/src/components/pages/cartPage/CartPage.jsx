import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../../redux/reducers/cartReducer";
import { Modal } from "../../../common/Modal";
import { PromocodeForm } from "../../atomic/molecules/PromocodeForm/PromocodeForm";
import { TotalCost } from "../../atomic/atoms/Cart/TotalCost/TotalCost";
import { CartButton } from "../../atomic/atoms/Cart/Button/CartButton";
import { CartItems } from "../../atomic/organisms/CartItems/CartItems";
import './Cart.css';

export const CartPage = ({ isModalOpen, setIsModalOpen }) => {
  const { items: products } = useSelector((state) => state.cart);
  const [localProducts, setLocalProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(
    JSON.parse(localStorage.getItem("totalCost")) || 0
  );
    const dispatch = useDispatch();

  const isAuthorized = !!localStorage.getItem("token");
  const cartItems = isAuthorized ? products || [] : localProducts || [];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
        dispatch(fetchCart());
        localStorage.removeItem("cart"); // Удалить локальную корзину для авторизованных пользователей
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
    const newTotal = (cartItems || []).reduce((total, product) => {
      return total + product.cost * product.quantity;
   }, 0);
   
  
    setTotalCost(newTotal);
    localStorage.setItem("totalCost", JSON.stringify(newTotal));
  }, [cartItems]);

  console.log(localStorage.getItem("cart"))

  const updateTotalCost = (updatedCart) => {
    const newTotal = updatedCart.reduce((total, product) => {
      return total + product.cost * product.quantity;
    }, 0);
  
    setTotalCost(newTotal); // Обновляем состояние
    localStorage.setItem("totalCost", JSON.stringify(newTotal)); // Сохраняем в localStorage
  };
  

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="cart-modal-block">
        <h1 className="cart-title">Ваш кошик</h1>
        {/* <div className="cart-header">
          <div>КІЛЬКІСТЬ</div>
          <div>ВАРТІСТЬ</div>
        </div> */}
        <CartItems
          updateTotalCost={updateTotalCost} // Передаем callback для обновления общей стоимости
        />
        <div className="promocode-form-block">
          <PromocodeForm />
        </div>
        <div>
          <TotalCost totalPrice={totalCost} />
        </div>
        <div className="cart-bottom-buttons">
          <CartButton text={"ПРОДОВЖИТИ ПОКУПКИ"} />
          <Link to="/register-order">
            <CartButton text={"ПЕРЕЙТИ ДО ОФОРМЛЕННЯ"} />
          </Link>
        </div>
      </div>
    </Modal>
  );
};
