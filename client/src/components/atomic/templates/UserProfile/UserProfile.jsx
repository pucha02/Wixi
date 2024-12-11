import React, { useState, useEffect } from 'react';
import { ContactInfo } from '../../molecules/UserProfileInfoForm/ContactInfo/ContactInfo';
import { DeliveryInfo } from '../../molecules/UserProfileInfoForm/DeliveryInfo/DeliveryInfo';
import { validateFields } from '../../../../utils/ValidateForm';
import UserProfileMobileMenu from '../../molecules/UserProfileMenu/UserProfileMobileMenu';
import { OrdersList } from '../OrderList/OrderList';
import { fetchDataUser, handleLogout, handleSave } from '../../../../utils/userDataOperations';
import { useNavigate } from "react-router-dom";
import { CartButton } from '../../atoms/Cart/Button/CartButton';
import { handleChangeInput } from '../../../../utils/handleChangeInput';
import UserProfileMenu from '../../molecules/UserProfileMenu/UserProfileMenu';
import UserProfImg from '../../../../assets/svg/user_profile.svg'
import UserProfDeliveryImg from '../../../../assets/svg/user_profile_delivery.svg'
import UserProfOrderImg from '../../../../assets/svg/user_profile_order.svg'
import UserProfPromocodeImg from '../../../../assets/svg/user_profile_promocode.svg'
import UserProfLogoutImg from '../../../../assets/svg/user_profile_logout.svg'
import './UserProfile.css'

function UserProfile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("personalData");
    const [validationErrors, setValidationErrors] = useState({});

    const [orderDetails, setOrderDetails] = useState({
        number_section_NP: "",
        firstname: "",
        lastname: "",
        coment: "",
        city: "",
    });

    const navigate = useNavigate();
    useEffect(() => {
        fetchDataUser(setUser, setOrderDetails, setIsLoading);
        window.scrollTo(0, 0);
    }, []);

    const tabs = [
        { id: "personalData", label: "ОСОБИСТІ ДАНІ", src: UserProfImg },
        { id: "deliveryAddress", label: "АДРЕСА ДОСТАВКИ", src: UserProfDeliveryImg },
        { id: "orderHistory", label: "ІСТОРІЯ ЗАМОВЛЕНЬ", src: UserProfOrderImg },
        { id: "promocodes", label: "МОЇ ПРОМОКОДИ", src: UserProfPromocodeImg },
        // { id: "logout", label: "ВИЙТИ", src: UserProfLogoutImg, onClick: () => handleLogout(setUser, navigate) }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "personalData":
                return (
                    <form onSubmit={(e) => handleSave(e, setUser, orderDetails)}>
                        <ContactInfo
                            userData={orderDetails}
                            validationErrors={validationErrors}
                            handleChange={(e) =>
                                handleChangeInput(e, setOrderDetails, orderDetails)
                            }
                        />
                        <CartButton type="submit" text={"ЗБЕРЕГТИ"} />
                    </form>
                );
            case "deliveryAddress":
                return (
                    <div className="user-profile-delivery-form">
                        <DeliveryInfo
                            userData={orderDetails}
                            validationErrors={validationErrors}
                            handleChange={(e) =>
                                handleChangeInput(e, setOrderDetails, orderDetails)
                            }
                        />

                    </div>
                );

            case "orderHistory":
                return <div><OrdersList /></div>;
            case "promocodes":
                return <div>Мої промокоди</div>;
            case "logout":
                return <div>Вихід</div>;
            default:
                return null;
        }
    };

    if (isLoading) return <p>Завантаження...</p>; // Отображение загрузки

    return (
        <div className="profile-tabs">
            <div className="profile-tabs-container">
                <div className='comp-pers-cab'>
                    <UserProfileMenu tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
                <div className='mobile-pers-cab'>
                    <UserProfileMobileMenu
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        renderContent={renderTabContent}
                        handleLogout={handleLogout}
                        navigate={navigate}
                        setUser={setUser}
                    />
                </div>
                <div className="tab-content-container">
                    <div className="tab-content-profile">{renderTabContent()}</div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
