import React, { useState, useCallback } from "react";
import "./SearchBar.css";
import useGetDataProduct from "../../../../services/FetchData";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getAllProduct, getAllProductBySearch } = useGetDataProduct();

  const fetchAndFilterProducts = useCallback(
    debounce(async (searchQuery) => {
      setIsLoading(true);
      setFilteredProducts([]);
      try {
        const result = await getAllProductBySearch(searchQuery);
        setData(result);
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

  function renderItems(arr) {
    return (
      <ul>
        {arr.map((item, i) => (
          <Link key={i} to={`/category/productList/${item.categoty}/${item.title}`}>
            <li>{item.title}</li>
          </Link>
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
