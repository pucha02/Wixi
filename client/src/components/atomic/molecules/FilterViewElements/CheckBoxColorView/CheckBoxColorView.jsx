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
      "білий": '#FFFFFF',
      "чорний": "#000000",
      "сірий": "#808080",
      "світло-сірий": "#D3D3D3",
      "смарагд": "#50C878",
      "бордо": "#800020",
      "голубий": "#87CEEB",
      "оранжевий": "#FFA500",
      "м'ятний": "#98FF98",
      "персик": "#FFDAB9",
      "хакі": "#F0E68C",
      "електрик": "#7DF9FF",
      "яскраво-рожевий": "#FF69B4",
      "графітовий": "#474A51",
      "синій": "#0000FF",
      "червоний": "#FF0000",
      "малиновий": "#DC143C",
      "коричневий": "#8B4513",
      "блакитний": "#ADD8E6",
      "смарагдово-синій": "#007BA7",
      "темно-сірий": "#A9A9A9",
      "зелений": "#008000",
      "світло-рожевий": "#FFB6C1",
      "срібний": "#C0C0C0",
      "чорно-білий": "#808080", // Средний серый для смешения
      "фіолетовий": "#800080",
      "чорно-сірий": "#505050", // Темно-серый
      "мятний": "#98FF98",
      "кавовий": "#6F4E37",
      "темний графіт": "#2F4F4F",
      "молочний": "#FFFDD0",
      "чорно-синій": "#001F3F",
      "чорно-зелений": "#013220",
      "чорний з сірими вставками": "#2B2B2B", // Темно-серый с черным
      "темно-синій": "#00008B",
      "рожевий": "#FFC0CB",
      "беж": "#F5F5DC",
      "молочно-білий": "#FAF0E6",
      "ніжно-рожевий": "#FFE4E1",
      "смарагдовий": "#50C878",
      "винний": "#722F37",
      "оливка": "#808000",
      "ліловий": "#C8A2C8",
      "пісочний": "#EDC9AF",
      "графіт": "#4B4B4B"
    };
    return colorMap[name] || "transparent";
  };

  const color = getColor(filterValue);
  const isWhite = color === "#FFFFFF"; // Проверка на белый цвет

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
        style={{
          background: color,
          
          borderColor: isWhite ? '#D3D3D3' : '#FFFFFF', // Серая рамка для белого
        }}
      ></span>
      {filterValue.toUpperCase()}
    </label>
  );
};

export default CheckBoxColorView;
