import { useState } from "react";
import { BurgerMenuSpan } from "../../atoms/Header/BurgerMenuSpan/BurgerMenuSpan";
import './BurgerMenuButton.css'

export const BurgerMenuButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <button className={`burger-menu ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
            <BurgerMenuSpan />
        </button>
    );
};