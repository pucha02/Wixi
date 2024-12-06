import CartImage from '../../../../../assets/svg/cart.svg'
import './Button.css'

export const ProductButtonAddToCart = ({ some, handleAddToCart }) => {
  return (
    <div className="add-to-cart-btn">
      <img style={{ width: "auto", height: "auto" }} src={CartImage} alt="" onClick={handleAddToCart} />

    </div>
  );
};
