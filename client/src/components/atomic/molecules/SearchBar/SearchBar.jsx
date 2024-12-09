import React, { useState, useCallback } from "react";
import "./SearchBar.css";
import useGetDataProduct from "../../../../services/FetchData";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setQuery(newValue);
  };

  function renderItems(arr) {
    return (

      <div className="search-results">
        {arr.length ? (
          <ul>
            {arr.map((item, i) => {
              // Безопасная проверка на наличие данных
              const imgLink =
                item?.color?.[0]?.img?.[0]?.img_link || "placeholder.png"; // Путь к изображению или заглушка
  
              return (
                <Link key={i} to={`/category/productList/${item.category}/${item.title}`}>
                  <li className="search-item">
                    <img
                      src={imgLink} // Используем найденную ссылку или заглушку
                      alt={item.title || "No title"} // Защита от отсутствующего заголовка
                    />
                    <div className="item-info">
                      <span className="item-title">{item.title || "Название недоступно"}</span>
                      <span className="item-price">{item.cost ? `${item.cost}$` : "Ціна не вказана"}</span>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        ) : (
          <p className="no-results">Ничего не найдено</p>
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
      />
      {isLoading && <p>Загрузка...</p>}
      {!isLoading && query && renderItems(filteredProducts)}
    </div>
  );
};

export default SearchBar;
