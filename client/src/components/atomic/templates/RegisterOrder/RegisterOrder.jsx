import { useState, useEffect } from "react";
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
    const [totalCost, setTotalCost] = useState(0);

    const [orderDetails, setOrderDetails] = useState({
        number_section_NP: "",
        firstname: "",
        lastname: "",
        coment: "",
        products: [],
        email: '',
        totalCost: 0,
        number_phone: '',
        area: '',
        city: '',
        warehouse: '',
        status: "Оформлено",
        order_number: "test123"
    });

    const isAuthorized = !!localStorage.getItem("token");
    const cartItems = isAuthorized ? products || [] : localProducts || [];

    // Загрузка корзины
    useEffect(() => {
        if (isAuthorized) {
            dispatch(fetchCart());
        } else {
            const localCart = JSON.parse(localStorage.getItem("cart")) || [];
            setLocalProducts(localCart);
        }
    }, [dispatch, isAuthorized]);

    // Загрузка данных пользователя
    useEffect(() => {
        fetchDataUser(setUser, setOrderDetails, setIsLoading);
        window.scrollTo(0, 0);
    }, []);

    // Пересчет общей стоимости корзины
    useEffect(() => {
        const currentCart = isAuthorized ? products || [] : localProducts || [];
        const newTotalCost = currentCart.reduce((total, product) => total + product.cost * product.quantity, 0);

        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            products: currentCart,
            totalCost: newTotalCost,
        }));

        setTotalCost(newTotalCost);
        localStorage.setItem("totalCost", JSON.stringify(newTotalCost));
    }, [products, localProducts, isAuthorized]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://16.171.32.44/api/orders/register-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderDetails),
            });
            if (response.ok) {
                alert("Замовлення успішно оформлено!");
                console.log(orderDetails);
            } else {
                alert("Сталася помилка при оформленні замовлення.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Сталася помилка при оформленні замовлення.");
        }
    };

    return (
        <div className="register-order-block">
            <div className="category-title"><Link to={'/'}>ГОЛОВНА</Link> / <Link to={'/register-order'}>ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</Link></div>

            <form className="register-order-block-container" onSubmit={handleSubmit}>

                <div className="register-order-form">
                    <ContactInfo userData={orderDetails} validationErrors={validationErrors} handleChange={(e) => handleChangeInput(e, setOrderDetails, orderDetails)} />
                    <DeliveryInfo userData={orderDetails} validationErrors={validationErrors} handleChange={(e) => handleChangeInput(e, setOrderDetails, orderDetails)} />
                    <PaymentInfo userData={orderDetails} validationErrors={validationErrors} handleChange={(e) => handleChangeInput(e, setOrderDetails, orderDetails)} />
                    <ComentInfo userData={orderDetails} validationErrors={validationErrors} handleChange={(e) => handleChangeInput(e, setOrderDetails, orderDetails)} />
                    <div className="mobile-create-order">
                        <div>
                            <TotalCost totalPrice={totalCost} />
                        </div>
                        <div className="checkboxes-block">
                            <div className="checkbox-block">
                                <input type="checkbox" /> <div>Я ПРИЙМАЮ ПОЛІТИКУ КОНФІДЕНЦІЙНОСТІ</div>
                            </div>
                            <div className="checkbox-block">
                                <input type="checkbox" /> <div>Я ПРИЙМАЮ ПОЛІТИКУ КОНФІДЕНЦІЙНОСТІ</div>
                            </div>
                        </div>
                        <CartButton text={'Оформити замовлення'} type="submit" />
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
                            <input type="checkbox" /> <div>Я ПРИЙМАЮ ПОЛІТИКУ КОНФІДЕНЦІЙНОСТІ</div>
                        </div>
                        <div className="checkbox-block">
                            <input type="checkbox" /> <div>Я ПРИЙМАЮ ПОЛІТИКУ КОНФІДЕНЦІЙНОСТІ</div>
                        </div>
                    </div>
                    <CartButton text={'Оформити замовлення'} type="submit" />
                </div>
            </form>
        </div>
    );
};
