import './Name.css'

export const ProductName = ({ name }) => {
  return (
    <div className='name-block'>
      <p>{name.toUpperCase()}</p>
    </div>
  );
};