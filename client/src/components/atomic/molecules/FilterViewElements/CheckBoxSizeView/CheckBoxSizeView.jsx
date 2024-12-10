const CheckBoxSizeView = ({
  handleCheckboxChange,
  filterName,
  filterValue,
  isChecked,
}) => {
  const handleChange = (event) => {
    handleCheckboxChange(filterName, filterValue, event.target.checked);
  };

  return (
    <div className="filter-checkbox">
      
        <input
          type="checkbox"
          name={filterName}
          value={filterValue}
          onChange={handleChange}
          checked={isChecked}
          disabled={false}
        />
        {filterValue}
      
    </div>
  );
};

export default CheckBoxSizeView;