import './Cost.css'

export const ProductCost = ({ cost, discount = 0 }) => {
  // Рассчитываем стоимость с учётом скидки
  const discountedCost = discount ? (cost * (100 - discount)) / 100 : cost;

  return (
    <div className='cost-block' >
      {/* Скидка отображается, если она есть */}
      <p className='price' style={{ fontWeight: 'bold'}}>
        {discountedCost}$
      </p>
      {discount > 0 && (
        <p className='discount-price' style={{ textDecoration: 'line-through',color: 'gray' }}>
          {cost}$
        </p>
      )}

    </div>
  );
};
