const FilterCostView = ({
  minPrice,
  handleMinChange,
  maxPrice,
  handleMaxChange,
  handleBlurMin,
  handleBlurMax,
}) => {
  return (
    <div>
      <div htmlFor="minPrice" className="filter-head">
        Ціна, грн
      </div>
      <input
        id="minPrice"
        className="minPrice"
        type="number"
        value={minPrice === 0 ? "" : minPrice}
        onChange={handleMinChange}
        onBlur={handleBlurMin}
      />
      <span>–</span>
      <input
        id="maxPrice"
        className="maxPrice"
        type="number"
        value={maxPrice === 0 ? "" : maxPrice}
        onChange={handleMaxChange}
        onBlur={handleBlurMax}
      />
    </div>
  );
};

export default FilterCostView;
