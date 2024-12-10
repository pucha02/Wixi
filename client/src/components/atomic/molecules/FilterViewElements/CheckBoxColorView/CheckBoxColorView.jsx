import './CheckBoxColorView.css'

const CheckBoxColorView = ({
  handleCheckboxChange,
  filterName,
  filterValue,
  isChecked,
}) => {
  const handleChange = (event) => {
    handleCheckboxChange(filterName, filterValue, event.target.checked);
  };

  // Функция для преобразования значений в CSS-цвета
  const getColor = (name) => {
    const colorMap = {
      Чорний: "black",
      Сірий: "gray",
      Голубий: "lightblue",
      "Світло-сірий": "#d3d3d3",
      "Чорно-сірий": "#4d4d4d",
      "Чорно-білий": "linear-gradient(45deg, black, white)",
      Графітовий: "#383838",
      Білий: "white",
    };
    return colorMap[name] || "transparent";
  };

  return (
    <label className="filter-checkbox-x">
      <input
        type="checkbox"
        name={filterName}
        value={filterValue}
        onChange={handleChange}
        checked={isChecked}
      />
      <span
        className="color-indicator"
        style={{ background: getColor(filterValue) }}
      ></span>
      {filterValue}
    </label>
  );
};

export default CheckBoxColorView;
