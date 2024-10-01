import React from 'react';
import Checkbox from '../../atoms/checkbox/checkbox';

const Filter = ({ filters, onFilterChange }) => {
  return (
    <div className="filters">
      {filters.map((filter, index) => (
        <Checkbox
          key={index}
          label={filter.label}
          checked={filter.checked}
          onChange={() => onFilterChange(filter.label)}
        />
      ))}
    </div>
  );
};

export default Filter;
