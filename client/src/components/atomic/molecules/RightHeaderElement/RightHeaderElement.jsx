import { RightHeaderImg } from "../../atoms/Header/RightHeaderImg/RightHeaderImg"
import { RightHeaderLabel } from "../../atoms/Header/RightHeaderLabel/RightHeaderLabel"
import './RightHeaderElement.css'

import { useEffect } from 'react';

export const RightHeaderElement = ({ src, label, onClick, notification = false, products = null, setNotification, className }) => {

    useEffect(() => {
        if (notification) {
            // Устанавливаем уведомление на 3 секунды
            const timer = setTimeout(() => {
                setNotification(false); // Скрываем уведомление через 3 секунды
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [notification]); // Запускаем эффект, когда notification изменяется

    return (
        <div className="right-header-el" onClick={onClick} >
            <RightHeaderImg src={src} className={className}/>
            <RightHeaderLabel label={label} />
            {notification && <div className="notification">{notification}</div>}
            {products ? <div className="right-header-el-count">{products?.length}</div> : ''}
        </div>
    );
};
