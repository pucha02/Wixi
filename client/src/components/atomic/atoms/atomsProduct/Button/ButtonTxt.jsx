export const ProductButtonAddToCartTxt = ({ handleAddToCart, disabled }) => {
  return (
    <div
      className={`add-to-cart-btn-with-txt ${disabled ? "disabled" : ""}`}
      onClick={!disabled ? handleAddToCart : null} // Отключаем обработчик клика, если кнопка неактивна
    >
      <div>ДОДАТИ В КОШИК</div>
    </div>
  );
};
