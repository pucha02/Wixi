import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeItemCart } from "../../../redux/reducers/cartReducer";
import { Modal } from "../../../common/Modal"; // Подключаем компонент модального окна
import { ProductImage } from "../../atomic/atoms/atomsProduct/Image/Image";
import { ProductQuantitySelector } from "../../atomic/molecules/QuantitySelector/QuantitySelector";
import BucketImg from '../../../assets/svg/bucket.svg'
import './Cart.css'

export const CartPage = ({ isModalOpen, setIsModalOpen }) => {
  const { items: products, loading, error } = useSelector((state) => state.cart);
  const [count, setCount] = useState(0)
  const [localProducts, setLocalProducts] = useState([]);


  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCart()).then(() => {
        // Убедитесь, что данные обновляются после завершения асинхронного запроса
        const updatedProducts = JSON.parse(localStorage.getItem("cart")) || [];
        setLocalProducts(updatedProducts);
      });
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setLocalProducts(localCart);
    }
  }, [dispatch]);


  const isAuthorized = !!localStorage.getItem("token");

  const handleRemoveItem = (productId, product) => {
    if (isAuthorized) {
      const userId = localStorage.getItem("userid");

      dispatch(removeItemCart({ userId, productId, item: product })).then(() => {
        dispatch(fetchCart());
      });
    } else {
      const updatedCart = localProducts.filter(item => item._id !== productId);
      setLocalProducts(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const cartItems = isAuthorized ? products : localProducts;
  console.log(cartItems)
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      {loading && isAuthorized ? (
        <div>Завантаження кошика...</div>
      ) : error && isAuthorized ? (
        <div>Сталася помилка: {error}</div>
      ) : cartItems.length === 0 ? (
        <div>Ваш кошик порожній.</div>
      ) : (
        <div>
          <h1 className="cart-title">Ваш кошик</h1>
          <div className="cart-header">
            <div>КІЛЬКІСТЬ</div>
            <div>ВАРТІСТЬ</div>
          </div>
          <ul className="cart-list">
            {cartItems.map((product) => (
              <li className="cart-item" key={product._id || product.id}>
                <ProductImage src={product.img} />
                <div className="cart-product-description">
                  {product.title}
                  <div className="cart-product-description-size-color">
                    РОЗМІР: {product.size}, КОЛІР: {product.color}
                  </div>
                </div>
                <div className="cart-item-quantity-cost">
                  <ProductQuantitySelector count={product.quantity} setCount={setCount} />
                </div>
                <div className="cart-item-cost">{product.cost}$</div>
               
                <img onClick={() => handleRemoveItem(product._id, product)} src={BucketImg} alt="" />
              </li>
            ))}
          </ul>
          <Link to="/register-order">
            <button>Перейти до оформлення</button>
          </Link>
        </div>

      )}
    </Modal>

  );
};
