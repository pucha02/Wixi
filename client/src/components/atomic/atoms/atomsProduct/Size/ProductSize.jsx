export const ProductSize = ({
  size,
  available,
  className,
  onClick,
  isActive,
  setSku,
  sku,
  variationId,
  setVariationId,
  setAvailableQuantity,
  availableQuantity,
}) => {
  const handleSetSku = () => {
    setSku(sku);
    setVariationId(variationId);
    setAvailableQuantity(availableQuantity);
    console.log(availableQuantity);
  };
  return (
    <div
      className={`size-button ${className} ${available ? "" : "inactive"} ${
        isActive ? "active" : ""
      }`}
      disabled={!available}
      onClick={() => {
        available && onClick(size);
        handleSetSku();
      }} // Добавляем обработчик клика
    >
      {size}
    </div>
  );
};
