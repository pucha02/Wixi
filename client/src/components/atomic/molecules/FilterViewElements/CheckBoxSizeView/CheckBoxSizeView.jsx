const CheckBoxSizeView = ({
  handleCheckboxChange,
  filterName,
  filterValue,
  isChecked,
  renderDataFiltered
}) => {
  const handleChange = (event) => {
    handleCheckboxChange(filterName, filterValue, event.target.checked)
    renderDataFiltered()
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name={filterName}
          value={filterValue}
          onChange={(e)=>{handleChange(e) }}
          checked={isChecked}
        />
        {filterValue}
      </label>
    </div>
  );
};

export default CheckBoxSizeView;
