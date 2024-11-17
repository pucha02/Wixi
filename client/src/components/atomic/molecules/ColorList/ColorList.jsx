import { ProductColor } from "../../atoms/atomsProduct/Color/Color";
import './ColorList.css';

export const ColorList = ({ colors, setActiveIndex, activeIndex, classname }) => {
    return (
        <div className={classname}>
            {colors.map((color, index) => {
                const totalAvailableQuantity = color.sizes.reduce((total, el) => {
                    return total + el.availableQuantity;
                }, 0);

                const isActive = index === activeIndex;
                const isAvailable = totalAvailableQuantity > 0;

                return (
                    <ProductColor
                        key={index}
                        colorname={color}
                        index={index}
                        isActive={isActive && isAvailable}
                        setActiveIndex={isAvailable ? setActiveIndex : () => {}}
                        className={!isAvailable ? "inactive" : ""}
                    />
                );
            })}
        </div>
    );
};
