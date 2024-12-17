import './TotalCost.css'

export const TotalCost = ({ totalPrice }) => {
    const roundedPrice = Math.round(totalPrice); // Округление до ближайшего целого

    return (
        <div className="total-price-block">
            <span>ДО СПЛАТИ</span> <span className='total-price'>{roundedPrice} UAH</span>
        </div>
    );
};
