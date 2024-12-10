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

  const getColor = (name) => {
    const colorMap = {
      "Чорний": "black",
      "Сірий": "gray",
      "Голубий": "lightblue",
      "Світло-сірий": "#d3d3d3",
      "Чорно-сірий": "#4d4d4d",
      "Чорно-білий": "linear-gradient(45deg, black, white)",
      "Графітовий": "#383838",
      "Білий": "white",
      "смарагд": "#50C878",
      "бордо": "#800020",
      "голубий": "#87CEEB",
      "оранжевий": "#FFA500",
      "м'ятний": "#98FF98",
      "персик": "#FFDAB9",
      "Xакі": "#F0E68C",
      "електрик": "#7DF9FF",
      "яскраво-рожевий": "#FF69B4",
      "графітовий": "#474A51",
      "синій": "#0000FF",
      "червоний": "#FF0000",
      "Малиновий": "#DC143C",
      "коричневий": "#8B4513",
      "блакитний": "#ADD8E6",
      "смарагдово-синій": "#007BA7",
      "темно-сірий": "#A9A9A9",
      "зелений": "#008000",
      "світло-рожевий": "#FFB6C1",
      "срібний": "#C0C0C0",
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
      {filterValue.toUpperCase()}
    </label>
  );
};

export default CheckBoxColorView;
