import './QuantitySelector.css';
import PlusImg from '../../../../assets/svg/plus.svg'

export const IncreaseButton = ({ onClick, disabled }) => {
  return (
    <div
      className={`plus ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
      role="button"
      aria-disabled={disabled}
    >
      <img src={PlusImg} alt="" />
    </div>
  );
};
