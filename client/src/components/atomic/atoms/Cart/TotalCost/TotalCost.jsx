import './TotalCost.css'

export const TotalCost = ({ totalPrice }) => {
    return (
        <div className="total-price-block">
            <span>ДО СПЛАТИ</span> <span className='total-price'>{totalPrice}$</span>
        </div>
    )
}