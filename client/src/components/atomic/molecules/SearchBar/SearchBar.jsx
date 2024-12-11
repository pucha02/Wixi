import React, { useState, useCallback, useEffect, useRef } from "react";
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
  const searchBarRef = useRef(null); // Ссылка на контейнер поиска

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

  const handleOutsideClick = (e) => {
    // Проверяем, кликнул ли пользователь за пределами поискового компонента
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      setQuery(""); // Очищаем поле поиска
      setFilteredProducts([]); // Сбрасываем результаты
      setIsFocused(false); // Сбрасываем состояние фокуса
    }
  };

  useEffect(() => {
    // Добавляем обработчик клика
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Удаляем обработчик при размонтировании
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
                  onMouseDown={(e) => e.preventDefault()} // Отключаем потерю фокуса
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
    <div className="search-bar" ref={searchBarRef}>
      <input
        type="text"
        className="search-input"
        placeholder="Знайти товар..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)} // Обработка фокуса
      />
      {isLoading && <p>Завантаження...</p>}
      {!isLoading && query && renderItems(filteredProducts)}
    </div>
  );
};

export default SearchBar;
