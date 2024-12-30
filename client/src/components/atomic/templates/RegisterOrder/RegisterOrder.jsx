import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeliveryInfo } from "../../../atomic/molecules/OrderForm/DeliveryInfo/DeliveryInfo";
import { ComentInfo } from "../../../atomic/molecules/OrderForm/CommentInfo/CommentInfo";
import { ContactInfo } from "../../../atomic/molecules/OrderForm/ContactInfo/ContactInfo";
import { PaymentInfo } from "../../../atomic/molecules/OrderForm/PaymentInfo/PaymentInfo";
import { handleChangeInput } from "../../../../utils/handleChangeInput";
import { CartItems } from "../../organisms/CartItems/CartItems";
import { TotalCost } from "../../atoms/Cart/TotalCost/TotalCost";
import { fetchCart } from "../../../../redux/reducers/cartReducer";
import { CartButton } from "../../atoms/Cart/Button/CartButton";
import { Link } from "react-router-dom";
import { fetchDataUser } from "../../../../utils/userDataOperations";
import "./RegisterOrder.css";

export const RegisterOrder = () => {
    const products = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [validationErrors, setValidationErrors] = useState({});
    const [localProducts, setLocalProducts] = useState([]);
    const [discount, setDiscount] = useState(
        JSON.parse(localStorage.getItem("discount")) || 0
    ); // Загружаем скидку из localStorage
    const [totalCost, setTotalCost] = useState(0);

    const [orderDetails, setOrderDetails] = useState({
        number_section_NP: "",
        firstname: "",
        lastname: "",
        coment: "",
        products: [],
        email: "",
        totalCost: 0,
        number_phone: "",
        area: "",
        city: "",
        warehouse: "",
        status: "Оформлено",
        order_number: "test123",
    });

    const [modal, setModal] = useState({
        isOpen: false,
        title: "",
        message: "",
    });

    const isAuthorized = !!localStorage.getItem("token");
    const cartItems = isAuthorized ? products || [] : localProducts || [];

    useEffect(() => {
        if (isAuthorized) {
            dispatch(fetchCart());
        } else {
            const localCart = JSON.parse(localStorage.getItem("cart")) || [];
            setLocalProducts(localCart);
        }
    }, [dispatch, isAuthorized]);

    useEffect(() => {
        fetchDataUser(setUser, setOrderDetails, setIsLoading);
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const currentCart = isAuthorized ? products || [] : localProducts || [];
        const rawTotal = currentCart.reduce(
            (total, product) => total + product.cost * product.quantity,
            0
        );

        const discountedTotal = discount > 0 ? rawTotal * (1 - discount / 100) : rawTotal;

        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            products: currentCart,
            totalCost: discountedTotal,
        }));

        setTotalCost(discountedTotal);
        localStorage.setItem("totalCost", JSON.stringify(discountedTotal));
    }, [products, localProducts, isAuthorized, discount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/orders/register-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderDetails),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                // Успішне оформлення замовлення
                localStorage.removeItem("discount");
                setModal({
                    isOpen: true,
                    title: "Успіх!",
                    message: "Замовлення успішно оформлено!",
                });
            } else {
                // Помилка при оформленні замовлення
                setModal({
                    isOpen: true,
                    title: "Помилка!",
                    message: result.message || "Сталася помилка під час оформлення замовлення.",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            setModal({
                isOpen: true,
                title: "Помилка!",
                message: "Сталася помилка під час оформлення замовлення.",
            });
        }
    };
    
    

    return (
        <div className="register-order-block">
            <Modal
                isOpen={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
                title={modal.title}
                message={modal.message}
            />
            <div className="category-title">
                <Link to={"/"}>ГОЛОВНА</Link> / <Link to={"/register-order"}>ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</Link>
            </div>

            <form className="register-order-block-container" onSubmit={handleSubmit}>
                <div className="register-order-form">
                    <ContactInfo
                        userData={orderDetails}
                        validationErrors={validationErrors}
                        handleChange={(e) =>
                            handleChangeInput(e, setOrderDetails, orderDetails)
                        }
                    />
                    <DeliveryInfo
                        orderDetails={orderDetails}
                        setOrderDetails={setOrderDetails}
                        validationErrors={validationErrors}
                        handleChange={(e) =>
                            handleChangeInput(e, setOrderDetails, orderDetails)
                        }
                    />
                    <PaymentInfo
                        userData={orderDetails}
                        validationErrors={validationErrors}
                        handleChange={(e) =>
                            handleChangeInput(e, setOrderDetails, orderDetails)
                        }
                    />
                    <ComentInfo
                        userData={orderDetails}
                        validationErrors={validationErrors}
                        handleChange={(e) =>
                            handleChangeInput(e, setOrderDetails, orderDetails)
                        }
                    />
                    <div className="mobile-create-order">
                        <div>
                            <TotalCost totalPrice={totalCost} />
                        </div>
                        <div className="checkboxes-block">
                            <div className="checkbox-block">
                                <input type="checkbox" />{" "}
                                <div>Я ПРИЙМАЮ ПОЛІТИКУ КОНФІДЕНЦІЙНОСТІ</div>
                            </div>
                            <div className="checkbox-block">
                                <input type="checkbox" />{" "}
                                <div>МЕНІ МОЖНА НЕ ТЕЛЕФОНУВАТИ ДЛЯ ПІДТВЕРДЖЕННЯ</div>
                            </div>
                        </div>
                        <CartButton text={"Оформити замовлення"} type="submit" />
                    </div>
                </div>
                <div className="register-order-products-block">
                    <div className="register-order-products-head">ВАШЕ ЗАМОВЛЕННЯ</div>
                    <CartItems updateTotalCost={setTotalCost} />
                    <div>
                        <TotalCost totalPrice={totalCost} />
                    </div>
                    <div className="checkboxes-block">
                        <div className="checkbox-block">
                            <div className="filter-checkbox" style={{ marginTop: "0" }}>
                                <input type="checkbox" />
                            </div>
                            <div style={{ fontFamily: "Helvetica Neue Cyr Thin" }}>
                                Я ПРИЙМАЮ ПОЛІТИКУ КОНФІДЕНЦІЙНОСТІ
                            </div>
                        </div>
                        <div className="checkbox-block">
                            <div className="filter-checkbox" style={{ marginTop: "0" }}>
                                <input type="checkbox" />
                            </div>
                            <div style={{ fontFamily: "Helvetica Neue Cyr Thin" }}>
                                МЕНІ МОЖНА НЕ ТЕЛЕФОНУВАТИ ДЛЯ ПІДТВЕРДЖЕННЯ
                            </div>
                        </div>
                    </div>
                    <CartButton text={"Оформити замовлення"} type="submit" />
                </div>
            </form>
        </div>
    );
};

const Modal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div style={{ textAlign: "center" }} className="modal-content">
                <h2>{title}</h2>
                <p style={{ marginTop: "20px" }}>{message}</p>
                <button className="modal-close" onClick={onClose}>
                    ✖
                </button>
            </div>
        </div>
    );
};
