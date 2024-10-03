import React, { useState, useEffect } from 'react';
import { UserProfileInfoLabelAtom } from '../../atoms/UserProfile/UserProfileInfoLabel';

function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchDataUser = async () => {
            const token = localStorage.getItem('token');
        
            try {
                const response = await fetch('http://localhost:5000/get-information-for-user-account', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Помилка при отриманні даних користувача:', error);
            }
        };

        fetchDataUser();
    }, []);

    if (!user) return <p>Завантаження...</p>;

    return (
        <div>
            <h2>Ваш акаунт</h2>
            <UserProfileInfoLabelAtom user={user.number_phone}/>
            <UserProfileInfoLabelAtom user={user.firstname}/>
            <UserProfileInfoLabelAtom user={user.lastname}/>
            <UserProfileInfoLabelAtom user={user.email}/>
        </div>
    );
}

export default UserProfile;
