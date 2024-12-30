import { PromocodeInput } from "../../atoms/Cart/Input/PromocodeInput";
import { CartButton } from "../../atoms/Cart/Button/CartButton";
import { useState } from "react";

export const PromocodeForm = ({ handleSubmit }) => {
  const [promoCode, setPromoCode] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(promoCode); // Передаём введённый промокод в handleSubmit
    setPromoCode(""); // Очищаем поле после отправки
  };

  const handleInputChange = (e) => {
    setPromoCode(e.target.value);
  };

  return (
    <form className="promocode-form" onSubmit={onSubmit}>
      <div className="promo-head">МАЄТЕ ПРОМОКОД?</div>
      <PromocodeInput onChange={handleInputChange} />{" "}
      {/* Передаём обработчик изменения */}
      <CartButton type="submit" text={"ЗАСТОСУВАТИ"} />
    </form>
  );
};
