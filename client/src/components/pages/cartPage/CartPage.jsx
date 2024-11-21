import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeItemCart } from "../../../redux/reducers/cartReducer";

export const CartPage = () => {
  const { items: products, loading, error } = useSelector((state) => state.cart);
  const [localProducts, setLocalProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCart());
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setLocalProducts(localCart);
    }
  }, [dispatch]);

  const isAuthorized = !!localStorage.getItem("token");

  if (loading && isAuthorized) {
    return <div>Завантаження кошика...</div>;
  }

  if (error && isAuthorized) {
    return <div>Сталася помилка: {error}</div>;
  }

  const cartItems = isAuthorized ? products : localProducts;

  const handleRemoveItem = (productId) => {
    if (isAuthorized) {
      const userId = localStorage.getItem("userid");
      console.log(productId)
      dispatch(removeItemCart({ userId, productId }));
    } else {
      const updatedCart = localProducts.filter(item => item._id !== productId);
      setLocalProducts(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  if (cartItems.length === 0) {
    return <div>Ваш кошик порожній.</div>;
  }

  return (
    <div>
      <h1>Ваш кошик</h1>
      <ul>
        {cartItems.map((product) => (
          <li key={product._id || product.id}>
            {product.title} - ${product.cost} (Кількість: {product.quantity})
            <button onClick={() => handleRemoveItem(product._id)}>
              Видалити
            </button>
          </li>
        ))}
      </ul>
      <Link to="/register-order">
        <button>Перейти до оформлення</button>
      </Link>
    </div>
  );
};
