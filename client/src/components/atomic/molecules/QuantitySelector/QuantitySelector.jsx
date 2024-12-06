import { IncreaseButton } from "../../atoms/QuantitySelector/IncreaseButton";
import { DecreaseButton } from "../../atoms/QuantitySelector/DecreaseButton";
import { CountDisplay } from "../../atoms/QuantitySelector/CountDisplay";
import './QuantitySelector.css';

export const ProductQuantitySelector = ({ count, setCount, updateTotal }) => {
  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateTotal(newCount);
  };

  const handleDecrease = () => {
    if (count > 1) { // Минимальное количество - 1
      const newCount = count - 1;
      setCount(newCount);
      updateTotal(newCount);
    }
  };

  return (
    <div className="product-quantity-selector-container">
      <div className="product-quantity-selector-elements">
        <DecreaseButton onClick={handleDecrease} disabled={count <= 1} />
        <CountDisplay count={count} setCount={setCount}/>
        <IncreaseButton onClick={handleIncrease} />
      </div>
    </div>
  );
};
