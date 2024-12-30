import React, { useEffect } from "react";
import { IncreaseButton } from "../../atoms/QuantitySelector/IncreaseButton";
import { DecreaseButton } from "../../atoms/QuantitySelector/DecreaseButton";
import { CountDisplay } from "../../atoms/QuantitySelector/CountDisplay";
import './QuantitySelector.css';

export const ProductQuantitySelector = ({ count, setCount, maxCount }) => {
  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Для перерендеривания при изменении count
  useEffect(() => {
    console.log("Count changed to:", count, maxCount);
  }, [count]);

  return (
    <div className="product-quantity-selector-container">
      <div className="product-quantity-selector-elements">
        <DecreaseButton onClick={handleDecrease} disabled={count <= 1} />
        <CountDisplay count={count} setCount={setCount} />
        <IncreaseButton onClick={handleIncrease} disabled={count >= maxCount} />
      </div>
    </div>
  );
};
