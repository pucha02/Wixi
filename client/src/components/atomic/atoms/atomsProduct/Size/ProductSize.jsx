import './ProductSize.css';

export const ProductSize = ({ size, available, className, onClick, isActive, setSku, sku, variationId, setVariationId }) => {
  const handleSetSku = () =>{
    setSku(sku)
    setVariationId(variationId)
    console.log(sku)
  }
    return (
      <div
        className={`size-button ${className} ${available ? "" : "inactive"} ${isActive ? "active" : ""}`}
        disabled={!available}
        onClick={() => {available && onClick(size); handleSetSku()}} // Добавляем обработчик клика
      >
        {size}
      </div>
    );
  };
  
  