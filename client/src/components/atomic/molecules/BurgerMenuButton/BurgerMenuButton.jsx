import { useState } from "react";
import { BurgerMenuSpan } from "../../atoms/Header/BurgerMenuSpan/BurgerMenuSpan";

export const BurgerMenuButton = ({
  handleToggleCategories,
  viewCategories,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      className={`burger-menu ${viewCategories ? "open" : ""}`}
      onClick={handleToggleCategories}
    >
      <BurgerMenuSpan />
    </button>
  );
};
