// import React, { useState, useEffect } from 'react';
// import { UserProfileInfoLabelAtom } from '../../atoms/UserProfile/UserProfileInfoLabel';
// import { UserProfileLogoutButton } from '../../atoms/UserProfile/UserProfileLogoutButton';

// function UserProfile() {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         fetchDataUser();
//     }, []);

//     const fetchDataUser = async () => {
//         const token = localStorage.getItem('token');
    
//         try {
//             const response = await fetch('http://localhost:5001/api/auth/get-information-for-user-account', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const data = await response.json();
//             setUser(data);
//         } catch (error) {
//             console.error('Помилка при отриманні даних користувача:', error);
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             const response = await fetch('http://localhost:5001/api/auth/logout-user', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//             });
    
//             if (response.ok) {
//                 setUser(null);
//                 localStorage.removeItem('token');
//             } else {
//                 console.error('Logout failed:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error logging out:', error);
//         }
//     };
    

//     if (!user) return <p>Завантаження...</p>;

//     return (
//         <div>
//             <h2>Ваш акаунт</h2>
//             <UserProfileInfoLabelAtom user={user.number_phone}/>
//             <UserProfileInfoLabelAtom user={user.firstname}/>
//             <UserProfileInfoLabelAtom user={user.lastname}/>
//             <UserProfileInfoLabelAtom user={user.email}/>
//             <UserProfileLogoutButton logout={handleLogout}/>
//         </div>
//     );
// }

// export default UserProfile;

import React, { useState, useEffect } from 'react';
import { UserProfileInfoLabelAtom } from '../../atoms/UserProfile/UserProfileInfoLabel';
import { UserProfileLogoutButton } from '../../atoms/UserProfile/UserProfileLogoutButton';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDataUser();
    }, []);

    const fetchDataUser = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/auth/get-information-for-user-account', {
                method: 'GET',
                credentials: 'include', 
            });

            
    
            if (!response.ok) {
                console.log('Response headers:', response.headers);
            
        console.log('Response status:', response.status); 
                throw new Error(`Ошибка: ${response.statusText}`);
            }
    
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
            setError(error.message);
        }
    };
    

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/auth/logout-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Отправляем cookies с запросом
            });

            if (response.ok) {
                setUser(null);
                // Cookies автоматически удаляются сервером при логауте
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (error) return <p>{error}</p>;
    if (!user) return <p>Завантаження...</p>;

    return (
        <div>
            <h2>Ваш акаунт</h2>
            <UserProfileInfoLabelAtom label="Номер телефону" user={user.number_phone}/>
            <UserProfileInfoLabelAtom label="Ім'я" user={user.firstname}/>
            <UserProfileInfoLabelAtom label="Прізвище" user={user.lastname}/>
            <UserProfileInfoLabelAtom label="Email" user={user.email}/>
            <UserProfileLogoutButton logout={handleLogout}/>
        </div>
    );
}

export default UserProfile;