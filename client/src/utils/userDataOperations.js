export const fetchDataUser = async (setUser, setOrderDetails, setIsLoading) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Токен не найден в localStorage");
        return;
    }

    try {
        const response = await fetch(
            "http://16.171.32.44/api/auth/get-information-for-user-account",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Ошибка сервера:", errorMessage);
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setUser(data);

        setOrderDetails((prev) => ({
            ...prev,
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            email: data.email || "",
            number_phone: data.number_phone || "",
            area: data.area || "",
            city: data.city || "",
            warehouse: data.warehouse || "",
            products: data.orders,
            status: "Оформлено",
            order_number: 'test123',
        }));

        setIsLoading(false);
    } catch (error) {
        console.error("Помилка при отриманні даних користувача:", error);
        setIsLoading(false);
    }
};

export const handleLogout = async (setUser, navigate) => {
    try {
        const response = await fetch(
            "http://16.171.32.44/api/auth/logout-user",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        if (response.ok) {
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("cart");
            navigate('/');
            window.location.reload(); // Перезагрузка страницы
        } else {
            console.error("Logout failed:", response.statusText);
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
};


export const handleSave = async (e, setUser, orderDetails) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Токен не найден в localStorage");
        return;
    }

    try {
        const response = await fetch("http://16.171.32.44/api/auth/update-user-information", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderDetails), // Отправляем обновленные данные
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Ошибка сервера:", errorMessage);
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        console.log("Дані успішно оновлено:", data);
        alert("Ваші дані успішно збережено!");
        setUser(data.user); // Обновляем состояние с новыми данными
    } catch (error) {
        console.error("Помилка при збереженні даних користувача:", error);
    }
};

export const handleSaveDelivery = async (e, selectedArea, selectedCity, selectedWarehouse) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Токен не найден в localStorage');
        return;
    }

    try {
        const response = await fetch(
            'http://16.171.32.44/api/auth/update-delivery-information',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    area: selectedArea ? selectedArea.label : '',
                    city: selectedCity ? selectedCity.label : '',
                    warehouse: selectedWarehouse ? selectedWarehouse.label : '',
                }),
            }
        );

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Ошибка сервера:', errorMessage);
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        console.log('Дані доставки успішно оновлено:', data);
        alert('Ваші дані доставки успішно збережено!');
    } catch (error) {
        console.error('Помилка при збереженні даних доставки:', error);
    }
};
