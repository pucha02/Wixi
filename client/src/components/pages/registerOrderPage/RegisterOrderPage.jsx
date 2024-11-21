import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useGetDataUser from "../../../services/FetchUserData";

export const RegisterOrderPage = () => {
    const { getAllUserData } = useGetDataUser();
    const products = useSelector((state) => state.cart.items);

    const [orderDetails, setOrderDetails] = useState({
        number_section_NP: "",
        city: "",
        products: products,
        email: '',
        totalCost: products.reduce((total, product) => total + product.cost * product.quantity, 0),
        number_phone: ''
    });

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
                // Обновляем только поле email

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [getAllUserData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
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
        <div>
            <h2>Оформити замовлення</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Номер відділення НП:
                        <input
                            type="text"
                            name="number_section_NP"
                            value={orderDetails.number_section_NP}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="number_phone"
                            value={orderDetails.number_phone}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={orderDetails.email || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Місто:
                        <input
                            type="text"
                            name="city"
                            value={orderDetails.city}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <h3>Товари:</h3>
                    <ul>
                        {products.map((product) => (
                            <li key={product._id}>
                                {product.title} - Колір: {product.color}, Розмір: {product.size}, Кількість: {product.quantity}, Ціна: {product.cost}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <strong>Загальна вартість: {orderDetails.totalCost} грн</strong>
                </div>
                <button type="submit">Оформити замовлення</button>
            </form>
        </div>
    );
};
