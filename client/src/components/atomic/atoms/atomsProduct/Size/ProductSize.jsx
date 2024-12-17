import './ProductSize.css';

export const ProductSize = ({ size, available, className, onClick, isActive }) => {
    return (
      <div
        className={`size-button ${className} ${available ? "" : "inactive"} ${isActive ? "active" : ""}`}
        disabled={!available}
        onClick={() => available && onClick(size)} // Добавляем обработчик клика
      >
        {size}
      </div>
    );
  };
  
  