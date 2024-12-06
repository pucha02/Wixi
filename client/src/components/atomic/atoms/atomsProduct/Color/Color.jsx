import './Color.css';

export const ProductColor = ({ colorname, index, isActive, setActiveIndex, setActiveSize, isAvailable }) => {
    const handleClick = () => {
        setActiveIndex(index);
        setActiveSize(0)
    };

    return (
        <div
            className={`color-circle ${isActive ? "active" : ""} ${isAvailable ? '' : 'isNotAvailability'}`}
            onClick={handleClick}
            style={{
                backgroundColor: colorname.color_name,
            }}
            title={colorname.color_name}
        ></div>
    );
};