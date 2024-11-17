import './Color.css';

export const ProductColor = ({ colorname, index, isActive, setActiveIndex }) => {
    const handleClick = () => {
        setActiveIndex(index);
    };

    return (
        <div
            className={`color-circle ${isActive ? "active" : ""}`}
            onClick={handleClick}
            style={{
                backgroundColor: colorname.color_name,
            }}
            title={colorname.color_name}
        ></div>
    );
};