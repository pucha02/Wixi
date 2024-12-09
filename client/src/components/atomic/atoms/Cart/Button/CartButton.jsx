import './CartButton.css'

export const CartButton = ({ text, handleClick, type="button" }) => {
    return (
        <button className='cart-button' type={type} onClick={handleClick}>
            {text}
        </button>
    )
}