import React, { useState, useCallback } from "react";
import "./SearchBar.css";
import useGetDataProduct from "../../../../services/FetchData";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Для управления фокусом
  const { getAllProductBySearch } = useGetDataProduct();

  const fetchAndFilterProducts = useCallback(
    debounce(async (searchQuery) => {
      setIsLoading(true);
      setFilteredProducts([]);
      try {
        const result = await getAllProductBySearch(searchQuery);
        setFilteredProducts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }, 650),
    []
  );

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    setQuery(newValue);
    setFilteredProducts([]);

    if (newValue) {
      fetchAndFilterProducts(newValue);
    }
  };

  const handleBlur = () => {
    if (!isFocused) {
      setQuery(""); // Очищаем поле, если пользователь не выбирает элемент
      setFilteredProducts([]);
    }
  };

  const handleFocus = () => {
    setIsFocused(true); // Активируем фокус
  };

  const handleMouseDown = () => {
    setIsFocused(true); // Отключаем немедленное очищение при выборе элемента
  };

  const handleMouseUp = () => {
    setIsFocused(false); // Сбрасываем фокус после выбора
  };

  function renderItems(arr) {
    return (
      <div className="search-results">
        {arr.length ? (
          <ul>
            {arr.map((item, i) => {
              const imgLink =
                item?.color?.[0]?.img?.[0]?.img_link || "placeholder.png";

              return (
                <Link
                  key={i}
                  to={`/category/productList/${item.category}/${item.title}`}
                  onMouseDown={handleMouseDown} // Отключаем очищение при клике
                  onMouseUp={handleMouseUp} // Сбрасываем состояние после клика
                >
                  <li className="search-item">
                    <img src={imgLink} alt={item.title || "No title"} />
                    <div className="item-info">
                      <span className="item-title">{item.title || ""}</span>
                      <span className="item-price">{item.cost ? `${item.cost} UAH` : "Ціна не вказана"}</span>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        ) : (
          <p className="no-results">Товарів не знайдено</p>
        )}
      </div>
    );
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Знайти товар..."
        value={query}
        onChange={handleInputChange}
        onBlur={handleBlur} // Проверка потери фокуса
        onFocus={handleFocus} // Обработка фокуса
      />
      {isLoading && <p>Завантаження...</p>}
      {!isLoading && query && renderItems(filteredProducts)}
    </div>
  );
};

export default SearchBar;
