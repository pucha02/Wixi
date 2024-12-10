import React, { useState, useEffect } from "react";
import { fetchDataUser } from "../../../../utils/userDataOperations";
import "./OrdersList.css";

export const OrdersList = () => {
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState({
        number_section_NP: '',
        firstname: '',
        lastname: '',
        coment: '',
        email: '',
        number_phone: '',
        area: '',
        city: '',
        warehouse: '',
        products: [],
        status: '',
        order_number: ''
    });

    useEffect(() => {
        fetchDataUser(setUser, setOrderDetails, setIsLoading);
        console.log(orderDetails)
        window.scrollTo(0, 0);
    }, []);

    const toggleOrder = (orderId) => {
        setExpandedOrder((prev) => (prev === orderId ? null : orderId));
    };

    if (isLoading) {
        return <div className="loading">Завантаження...</div>;
    }

    return (
        <div className="orders-container">
            {orderDetails.products.length > 0 ? (
                orderDetails.products.map((order, index) => (
                    <div className="order-card" key={index}>
                        {/* Заголовок заказа */}
                        <div className="order-header">
                            <div className="order-summary">

                                <div className="order-info">
                                    <img src={order.products[0].img} alt="" />
                                    <div className="order-total">{order.totalCost} UAH</div>
                                    <div>ЗАМОВЛЕННЯ №: {order.order_number}, {order.date}  <div
                                        className={`order-status ${order.status === "Оформлено" ? "status-delivered" : "status-canceled"
                                            }`}
                                    >
                                        {order.status}
                                    </div></div>
                                </div>

                            </div>
                            <div
                                className={`toggle-arrow ${expandedOrder === index ? "expanded" : ""}`}
                                onClick={() => toggleOrder(index)}
                            >
                                {expandedOrder === index ? "▴" : "▾"}
                            </div>
                        </div>
                        {/* Детали заказа */}
                        {expandedOrder === index && (
                            <div className="order-details">
                                {order.products.map((item, itemIndex) => (
                                    <div className="order-item" key={itemIndex}>
                                        <div className="item-image">
                                            <img src={item.img} alt={item.title} />
                                        </div>
                                        <div className="order-item-info-block">
                                            <div className="item-info">
                                                <div className="item-title">{item.title}</div>
                                                <div className="item-details">
                                                    КОЛІР {item.color}, РОЗМІР {item.size}
                                                </div>
                                            </div>
                                            <div className="order-details-quantity-cost">
                                                <div className="item-quantity">{item.quantity} ШТ</div>
                                                <div className="item-cost">{item.cost} UAH</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="order-total-cost">ДО СПЛАТИ: {order.totalCost} UAH</div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="no-orders">У вас немає замовлень.</div>
            )}
        </div>

    );
};
