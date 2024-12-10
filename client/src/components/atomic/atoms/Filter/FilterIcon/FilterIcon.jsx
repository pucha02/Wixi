import './FilterIcon.css'

export const FilterIcon = ({ src, onClick }) => {
  return (
    <div className="filter-icon" onClick={onClick}>
      <img src={src} alt="" /> <div className='filter-icon-text'>ФІЛЬТР</div>
    </div>
  );
};
