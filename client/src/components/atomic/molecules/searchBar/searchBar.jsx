import React from 'react';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
  return (
    <div className="search-bar">
      <Input 
        value={searchTerm} 
        onChange={onSearchChange} 
        placeholder="Search for products..." 
      />
      <Button label="Search" onClick={onSearchSubmit} />
    </div>
  );
};

export default SearchBar;
