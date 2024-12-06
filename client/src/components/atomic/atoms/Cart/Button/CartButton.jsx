import './CartButton.css'

export const CartButton = ({ text, handleClick }) => {
    return (
        <div onClick={handleClick}>
            {text}
        </div>
    )
}