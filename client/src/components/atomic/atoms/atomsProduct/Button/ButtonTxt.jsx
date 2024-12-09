import './Button.css'

export const ProductButtonAddToCartTxt = ({ handleAddToCart }) => {
    return (
        <div className="add-to-cart-btn-with-txt" onClick={handleAddToCart}>
            <div>ДОДАТИ В КОШИК</div>
        </div>
    );
};
