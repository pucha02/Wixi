import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { DeliveryInfo } from "../../../atomic/molecules/OrderForm/DeliveryInfo/DeliveryInfo";
import { ComentInfo } from "../../../atomic/molecules/OrderForm/CommentInfo/CommentInfo";
import { ContactInfo } from "../../../atomic/molecules/OrderForm/ContactInfo/ContactInfo";
import { PaymentInfo } from "../../../atomic/molecules/OrderForm/PaymentInfo/PaymentInfo";
import { handleChangeInput } from "../../../../utils/handleChangeInput";
import { CartItems } from "../../organisms/CartItems/CartItems";
import { TotalCost } from "../../atoms/Cart/TotalCost/TotalCost";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../../../redux/reducers/cartReducer";
import { CartButton } from "../../atoms/Cart/Button/CartButton";
import useGetDataUser from "../../../../services/FetchUserData";
import "./RegisterOrder.css"

export const RegisterOrder = () => {
    const { getAllUserData } = useGetDataUser();
    const products = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [validationErrors, setValidationErrors] = useState({});
    const [localProducts, setLocalProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(() => {
        const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
        return initialCart.reduce((total, product) => total + product.cost * product.quantity, 0);
      });
      
    const [orderDetails, setOrderDetails] = useState({
        number_section_NP: "",
        firstname: "",
        lastname: "",
        coment: "",
        city: "",
        products: products,
        email: '',
        totalCost: products.reduce((total, product) => total + product.cost * product.quantity, 0),
        number_phone: ''
    });

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



    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllUserData();
                console.log(result);
                if (result) {
                    setOrderDetails((prevDetails) => ({
                        ...prevDetails,
                        email: result.email || '',
                    }));
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const currentCart = products.length > 0 ? products : localProducts;
        const newTotal = currentCart.reduce((total, product) => total + product.cost * product.quantity, 0);
        setTotalCost(newTotal);
        localStorage.setItem("totalCost", JSON.stringify(newTotal));
    }, [products, localProducts]);

    const updateTotalCost = (updatedCart) => {
        const newTotal = updatedCart.reduce((total, product) => total + product.cost * product.quantity, 0);
        setTotalCost(newTotal);
        localStorage.setItem("totalCost", JSON.stringify(newTotal));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/orders/register-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderDetails),
            });
            if (response.ok) {
                alert("Замовлення успішно оформлено!");
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
            <div className="register-order-block-container">
                <form className="register-order-form" onSubmit={handleSubmit}>
                    <ContactInfo userData={orderDetails} validationErrors={validationErrors} handleChange={(e) => handleChangeInput(e, setOrderDetails, orderDetails)} />
                    <DeliveryInfo userData={orderDetails} validationErrors={validationErrors} handleChange={(e) => handleChangeInput(e, setOrderDetails, orderDetails)} />
                    <PaymentInfo userData={orderDetails} validationErrors={validationErrors} handleChange={(e) => handleChangeInput(e, setOrderDetails, orderDetails)} />
                    <ComentInfo userData={orderDetails} validationErrors={validationErrors} handleChange={(e) => handleChangeInput(e, setOrderDetails, orderDetails)} />
                </form>
                <div className="register-order-products-block">
                    <div className="register-order-products-head">ВАШЕ ЗАМОВЛЕННЯ</div>
                    <CartItems updateTotalCost={updateTotalCost} />
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
        </div>
    );
};
