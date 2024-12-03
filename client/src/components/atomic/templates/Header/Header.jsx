import { BurgerMenuButton } from "../../molecules/BurgerMenuButton/BurgerMenuButton"
import { RightHeaderElement } from "../../molecules/RightHeaderElement/RightHeaderElement"
import { SearchLoupe } from "../../atoms/Header/SearchLoupe/SearchLoupe"
import { Logo } from "../../atoms/Header/Logo/Logo"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import CategoryList from "../categoryList/CategoryList"
import './Header.css'

import SearchBar from "../../molecules/SearchBar/SearchBar"
import LogoImg from '../../../../assets/svg/Logo-Wixi.svg'
import CartImg from '../../../../assets/svg/cart.svg'
import PersonalCabinetImg from '../../../../assets/svg/person.svg'
import HeartImg from '../../../../assets/svg/little-heart.svg'
import PhoneImg from '../../../../assets/svg/phone.svg'
import SearchLoupeImg from '../../../../assets/svg/loupe.svg'


export const Header = () => {
    const [viewCategories, setViewCategories] = useState(false)

    const handleToggleCategories = () => {
        setViewCategories(!viewCategories)
    }

    const products = useSelector((state => state.cart.items))
    return (
        <div className="header">
            <div className="header-top">
                <p>Безкоштовна доставка при повній оплаті на замовлення від 3000 грн</p>
            </div>
            <div className="header-bottom-block">
                <div className="header-bottom">
                    <div className="left-elements-block">
                        <BurgerMenuButton handleToggleCategories={handleToggleCategories} viewCategories={viewCategories}/>
                        <div className="search-block">
                            <SearchLoupe src={SearchLoupeImg} /><SearchBar />
                        </div>
                    </div>
                    <div className="logo-block">
                        <Logo src={LogoImg} />

                    </div>
                    <div className="right-elements-block">
                        <RightHeaderElement src={PhoneImg} />
                        <RightHeaderElement src={PersonalCabinetImg} label={'Акаунт'} />
                        <RightHeaderElement src={HeartImg} label={'Вішлист'} />
                        <Link to={'/cart/'}><RightHeaderElement src={CartImg} label={'Кошик'} /></Link>

                        <div>{products.length}</div>
                    </div>
                </div>
                
            </div>
            {viewCategories && <CategoryList />}
        </div>
    )
}