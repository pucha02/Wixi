import CartImage from '../../../../assets/svg/cart.svg'

export const ProductButtonAddToCart = ({ some, handleAddToCart }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      <img style={{width:"auto", height:"auto"}} src={CartImage} alt="" onClick={handleAddToCart} />

    </div>
  );
};
