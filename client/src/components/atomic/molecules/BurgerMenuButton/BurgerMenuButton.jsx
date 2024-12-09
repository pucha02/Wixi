import { useState } from "react";
import { BurgerMenuSpan } from "../../atoms/Header/BurgerMenuSpan/BurgerMenuSpan";
import './BurgerMenuButton.css'

export const BurgerMenuButton = ({handleToggleCategories, viewCategories}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <button className={`burger-menu ${viewCategories ? "open" : ""}`} onClick={handleToggleCategories}>
            <BurgerMenuSpan />
        </button>
    );
};