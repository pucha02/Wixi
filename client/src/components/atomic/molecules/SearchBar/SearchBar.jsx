import React, { useEffect, useState } from 'react';
import './SearchBar.css'
import useGetDataProduct from '../../../../services/FetchData';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const result = await getAllProduct();
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
  }, [])

  const {getAllProduct} = useGetDataProduct()

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    const results = data.filter((product) =>
      product.title
    );
    setFilteredProducts(results);

  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Найти товар..."
        value={query}
        onChange={handleInputChange}
      />
      {query && (
        <ul className="search-results">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product.id} className="search-item">
                {product.title}
              </li>
            ))
          ) : (
            <li className="search-item no-results">Товаров не найдено</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
