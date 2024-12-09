import { useNavigate } from "react-router-dom";
import { BurgerMenuButton } from "../../molecules/BurgerMenuButton/BurgerMenuButton"
import { RightHeaderElement } from "../../molecules/RightHeaderElement/RightHeaderElement"
import { SearchLoupe } from "../../atoms/Header/SearchLoupe/SearchLoupe"
import ClientLoginForm from "../../organisms/ClientLoginForm/ClientLoginForm"
import ClientRegistrationForm from "../../organisms/ClientRegistrationForm/ClientRegistrationForm"
import { Logo } from "../../atoms/Header/Logo/Logo"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import { CartPage } from "../../../pages/cartPage/CartPage"
import CategoryList from "../categoryList/CategoryList"
import './Header.css'

import SearchBar from "../../molecules/SearchBar/SearchBar"
import LogoImg from '../../../../assets/svg/Logo-Wixi.svg'
import CartImg from '../../../../assets/svg/cart.svg'
import PersonalCabinetImg from '../../../../assets/svg/person.svg'
import HeartImg from '../../../../assets/svg/little-heart.svg'
import PhoneImg from '../../../../assets/svg/phone.svg'
import SearchLoupeImg from '../../../../assets/svg/loupe.svg'


export const Header = ({notification, setNotification}) => {
    const [viewCategories, setViewCategories] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
    const [isModalOpenReg, setIsModalOpenReg] = useState(false);

    const navigate = useNavigate();
    const userId = localStorage.getItem('token');

    const handleToggleCategories = () => {
        setViewCategories(!viewCategories);
    };

    const handleAccountClick = () => {
        if (userId) {
            navigate('/profile');
        } else {
            setIsModalOpenLogin(true);
        }
    };

    const products = useSelector((state) => state.cart.items);

    return (
        <div className="header">
            <div className="header-top">
                <p>Безкоштовна доставка при повній оплаті на замовлення від 3000 грн</p>
            </div>
            <div className="header-bottom-block">
                <div className="header-bottom">
                    <div className="left-elements-block">
                        <BurgerMenuButton 
                            handleToggleCategories={handleToggleCategories} 
                            viewCategories={viewCategories} 
                        />
                        <div className="search-block">
                            <SearchLoupe src={SearchLoupeImg} />
                            <SearchBar />
                        </div>
                    </div>
                    <div className="logo-block">
                        <Link to={'/'}>
                            <Logo src={LogoImg} />
                        </Link>
                    </div>
                    <div className="right-elements-block">
                        {/* <RightHeaderElement src={PhoneImg} /> */}
                        <RightHeaderElement 
                            src={PersonalCabinetImg} 
                            label={'Акаунт'} 
                            onClick={handleAccountClick} // Добавлено обработчик
                        />
                        <RightHeaderElement src={HeartImg} label={'Вішлист'} />
                        <RightHeaderElement 
                            src={CartImg} 
                            label={'Кошик'} 
                            onClick={() => setIsModalOpen(true)} 
                            notification={notification}
                            setNotification={setNotification}
                            products={products}
                        />
                        
                    </div>
                </div>
                <CartPage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                <div className="client-login-form-block">
                    <ClientLoginForm 
                        isModalOpen={isModalOpenLogin} 
                        setIsModalOpen={setIsModalOpenLogin} 
                        setIsModalOpenLogin={setIsModalOpenLogin} 
                        setIsModalOpenReg={setIsModalOpenReg} 
                    />
                </div>
                <div className="client-reg-form-block">
                    <ClientRegistrationForm 
                        isModalOpen={isModalOpenReg} 
                        setIsModalOpen={setIsModalOpenReg} 
                        setIsModalOpenLogin={setIsModalOpenLogin} 
                        setIsModalOpenReg={setIsModalOpenReg} 
                    />
                </div>
            </div>
            {viewCategories && <CategoryList />}
        </div>
    );
};