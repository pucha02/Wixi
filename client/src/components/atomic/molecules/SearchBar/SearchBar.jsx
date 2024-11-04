import React, { useState, useCallback } from "react";
import "./SearchBar.css";
import useGetDataProduct from "../../../../services/FetchData";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getAllProduct } = useGetDataProduct();

  const fetchAndFilterProducts = useCallback(
    debounce(async (searchQuery) => {
      setIsLoading(true);
      try {
        const result = await getAllProduct();
        setData(result);
        const results = result.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(results);
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
    fetchAndFilterProducts(newValue);
  };

  function renderItems(arr) {
    return (
      <ul>
        {arr.map((item, i) => (
          <li key={i}>{item.title}</li>
        ))}
      </ul>
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
