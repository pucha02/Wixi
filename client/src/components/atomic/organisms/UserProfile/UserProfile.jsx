import React, { useState, useEffect } from 'react';
import { UserProfileInfoLabelAtom } from '../../atoms/UserProfile/UserProfileInfoLabel';
import { UserProfileLogoutButton } from '../../atoms/UserProfile/UserProfileLogoutButton';

function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchDataUser();
    }, []);

    const fetchDataUser = async () => {
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('http://localhost:5000/api/auth/get-information-for-user-account', {
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

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/logout-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
    
            if (response.ok) {
                setUser(null);
                localStorage.removeItem('token');
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    

    if (!user) return <p>Не авторизован</p>;

    return (
        <div>
            <h2>Ваш акаунт</h2>
            <UserProfileInfoLabelAtom user={user.number_phone}/>
            <UserProfileInfoLabelAtom user={user.firstname}/>
            <UserProfileInfoLabelAtom user={user.lastname}/>
            <UserProfileInfoLabelAtom user={user.email}/>
            <UserProfileLogoutButton logout={handleLogout}/>
        </div>
    );
}

export default UserProfile;