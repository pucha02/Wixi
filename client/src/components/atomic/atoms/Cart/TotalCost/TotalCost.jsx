import './TotalCost.css'

export const TotalCost = ({ totalPrice, oldPrice }) => {
    const roundedPrice = Math.round(totalPrice); // Округление до ближайшего целого
    const roundedOldPrice = oldPrice ? Math.round(oldPrice) : null; // Округление старой цены, если она есть

    return (
        <div className="total-price-block">

            <span>ДО СПЛАТИ</span>
            <span className='total-price'>{roundedPrice} UAH</span>
            {roundedOldPrice && roundedOldPrice > roundedPrice && (
                <span className="old-price">{roundedOldPrice} UAH</span> // Отображаем старую цену
            )}
        </div>
    );
};
