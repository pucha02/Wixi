import { ProductColor } from "../../atoms/atomsProduct/Color/Color";
import { ProductSize } from "../../atoms/atomsProduct/Size/ProductSize";
import './ColorList.css';

export const ColorList = ({ colors, setActiveIndex, activeIndex, setActiveSize, activeSize, classname, sizeError }) => {
  const activeColor = colors[activeIndex];

  return (
    <div className={`color-list`}>
      <div className={`${classname} color-header`}>КОЛІР</div>
      <div className="colors-container">
        {colors.map((color, index) => {
          const totalAvailableQuantity = color.sizes.reduce(
            (total, el) => total + el.availableQuantity,
            0
          );
          const isActive = index === activeIndex;
          const isAvailable = totalAvailableQuantity > 0;

          return (
            <ProductColor
              key={index}
              colorname={color}
              index={index}
              isActive={isActive && isAvailable}
              setActiveIndex={isAvailable ? setActiveIndex : () => { }}
              className={!isAvailable ? "inactive" : ""}
              setActiveSize={setActiveSize}
              isAvailable={isAvailable}
            />
          );
        })}
      </div>

      {/* Список размеров активного цвета */}
      {activeColor && (
        <div className={`size-list ${classname}`}>
          <div>РОЗМІР</div>
          {/* {notifications && <div className="notification">{notifications}</div>} */}
          {activeColor.sizes.map((size, sizeIndex) => (
            <ProductSize
              key={sizeIndex}
              size={size.size_name}
              available={size.availableQuantity > 0}
              className={size.availableQuantity === 0 ? "inactive" : ""}
              onClick={setActiveSize}
              isActive={activeSize === size.size_name}
            />

          ))}
          {sizeError && <div className="size-error">Будь ласка, оберіть розмір товару.</div>}
        </div>
      )}
    </div>
  );
};

