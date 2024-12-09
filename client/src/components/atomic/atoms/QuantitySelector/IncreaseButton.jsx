import './QuantitySelector.css';

export const IncreaseButton = ({ onClick, disabled }) => {
  return (
    <div
      className={`plus ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
      role="button"
      aria-disabled={disabled}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path fillRule="evenodd" d="M13,5 L13,12 L20,12 L20,13 L13,13 L13,20 L12,20 L11.999,13 L5,13 L5,12 L12,12 L12,5 L13,5 Z" />
      </svg>
    </div>
  );
};
