export const ProductCost = ({ cost, discount = 0 }) => {
  // Рассчитываем стоимость с учётом скидки и округляем
  const discountedCost = discount
    ? Math.round((cost * (100 - discount)) / 100)
    : Math.round(cost);

  return (
    <div className="cost-block">
      {/* Скидка отображается, если она есть */}
      <p className="price">{discountedCost} UAH</p>
      {discount > 0 && (
        <p
          className="discount-price"
          style={{ textDecoration: "line-through", color: "gray" }}
        >
          {Math.round(cost)} UAH
        </p>
      )}
    </div>
  );
};
