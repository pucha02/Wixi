import './Color.css';

export const ProductColor = ({ colorname, index, isActive, setActiveIndex, setActiveSize, isAvailable }) => {
    const handleClick = () => {
        setActiveIndex(index);
        setActiveSize(0);
    };

    const colorCodes = {
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
        "малиновий": "#DC143C",         // Малиновый
        "коричневий": "#8B4513",       // Коричневый
        "блакитний": "#ADD8E6",        // Бледно-голубой
        "смарагдово-синій": "#007BA7", // Смарагдово-синий
        "темно-сірий": "#A9A9A9",      // Темно-серый
        "зелений": "#008000",          // Зеленый
        "світло-рожевий": "#FFB6C1",   // Светло-розовый
        "срібний": "#C0C0C0",          // Серебряный
    };
    
    // Проверяем наличие colorname и colorname.color_name
    const colorName = colorname?.color_name?.toLowerCase();

    // Если colorName не найден, устанавливаем цвет по умолчанию (например, белый)
    const colorCode = colorCodes[colorName] || "#FFFFFF";
    return (
        <div
            className={`color-circle ${isActive ? "active" : ""} ${isAvailable ? '' : 'isNotAvailability'}`}
            onClick={handleClick}
            style={{
                backgroundColor: colorCode,
            }}
            title={colorname?.color_name || "Неизвестный цвет"}
        >
        </div>
    );
};
