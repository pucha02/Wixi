import React, { useState, useEffect } from "react";

export const CountDisplay = ({ count, setCount }) => {
  const [localCount, setLocalCount] = useState(count); // Локальное состояние для ввода

  useEffect(() => {
    setLocalCount(count); // Синхронизируем локальное состояние с родительским
  }, [count]);

  const handleChange = (e) => {
    const value = e.target.value;

    // Разрешаем только числовые значения
    if (/^\d*$/.test(value)) {
      setLocalCount(value); // Обновляем локальное состояние
    }
  };

  const handleBlur = () => {
    const parsedCount = parseInt(localCount) || 0;

    // Обновляем родительское состояние после потери фокуса
    if (parsedCount < 1) {
      setCount(1); // Устанавливаем минимальное значение 1, если введено некорректное значение
      setLocalCount(1);
    } else {
      setCount(parsedCount); // Обновляем родительское состояние
    }
  };

  return (
    <input
      className="count-product"
      type="text"
      value={localCount}
      onChange={handleChange}
      onBlur={handleBlur} // Срабатывает при потере фокуса
    />
  );
};
