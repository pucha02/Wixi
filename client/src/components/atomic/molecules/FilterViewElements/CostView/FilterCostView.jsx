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
        <label htmlFor="minPrice">Ціна</label>
        <input
          id="minPrice"
          type="number"
          value={minPrice}
          onChange={handleMinChange}
          onBlur={handleBlurMin}
          style={{
            width: "80px",
            padding: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            textAlign: "center",
          }}
        />
        <span>–</span>
        <input
          id="maxPrice"
          type="number"
          value={maxPrice}
          onChange={handleMaxChange}
          onFocus={handleBlurMax}
          style={{
            width: "80px",
            padding: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            textAlign: "center",
          }}
        />
      </div>
    );
  };

  export default FilterCostView