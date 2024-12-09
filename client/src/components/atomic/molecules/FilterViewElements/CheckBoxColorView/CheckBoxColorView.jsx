const CheckBoxColorView = ({
    handleCheckboxChange,
    filterName,
    filterValue,
    isChecked,
  }) => {
    const handleChange = (event) => {
      handleCheckboxChange(filterName, filterValue, event.target.checked);
    };
  
    return (
      <div>
        <label>
          <input
            type="checkbox"
            name={filterName}
            value={filterValue}
            onChange={handleChange}
            checked={isChecked}
          />
          {filterValue}
        </label>
      </div>
    );
  };
  
  export default CheckBoxColorView;  