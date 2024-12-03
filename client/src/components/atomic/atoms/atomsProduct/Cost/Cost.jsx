import './Cost.css'

export const ProductCost = ({ cost, discount = 0 }) => {
  // Рассчитываем стоимость с учётом скидки
  const discountedCost = discount ? (cost * (100 - discount)) / 100 : cost;

  return (
    <div className='cost-block' >
      {/* Скидка отображается, если она есть */}
      <p style={{ fontWeight: 'bold', fontSize: '1.2em'}}>
        {discountedCost}$
      </p>
      {discount > 0 && (
        <p style={{ textDecoration: 'line-through', fontSize: '0.9em', color: 'gray' }}>
          {cost}$
        </p>
      )}

    </div>
  );
};
