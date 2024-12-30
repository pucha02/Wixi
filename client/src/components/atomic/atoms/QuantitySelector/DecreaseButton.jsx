import './QuantitySelector.css';
import MinusImg from '../../../../assets/svg/minus.svg'


export const DecreaseButton = ({ onClick, disabled }) => {
  return (
    <div
      className={`minus ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
      role="button"
      aria-disabled={disabled}
    >
      <img src={MinusImg} alt="" />
    </div>
  );
};
