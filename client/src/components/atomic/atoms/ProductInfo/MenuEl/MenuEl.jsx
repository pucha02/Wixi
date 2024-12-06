import './MenuEl.css';

export const MenuInfoElement = ({ label, isActive, onClick }) => {
    return (
        <button
            className={`tab-button ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};