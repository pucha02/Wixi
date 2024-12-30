import CartImage from "../../../../../assets/svg/cart.svg";

export const ProductButtonAddToCart = ({ some, handleAddToCart }) => {
  return (
    <div className="add-to-cart-btn">
      <img src={CartImage} alt="" onClick={handleAddToCart} />
    </div>
  );
};
