import './QuantitySelector.css';

export const DecreaseButton = ({ onClick, disabled }) => {
  return (
    <div
      className={`minus ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
      role="button"
      aria-disabled={disabled}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path fillRule="evenodd" d="M20,12 L20,13 L5,13 L5,12 L20,12 Z" />
      </svg>
    </div>
  );
};
