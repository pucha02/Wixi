import { useState } from "react";

import './Filter.css'

import FilterCostView from "../../molecules/FilterViewElements/CostView/FilterCostView";
import CheckBoxSizeView from "../../molecules/FilterViewElements/CheckBoxSizeView/CheckBoxSizeView";
import CheckBoxColorView from "../../molecules/FilterViewElements/CheckBoxColorView/CheckBoxColorView";


function Filter({ data, filteredData }) {
  const sizeFilter = ["XS", "S", "M", "L", "XL"];
  const colorFilter = [
    "Чорний",
    "Сірий",
    "Голубий",
    "Світло-сірий",
    "Чорно-сірий",
    "Чорно-білий",
    "Графітовий",
    "Білий",
  ];
  const allFilters = [sizeFilter];
  const filterName = ["Size", "Color"];

  const [selectedFilters, setSelectedFilters] = useState({
    Size: [],
    Color: [],
  });
  const [minPrice, setMinPrice] = useState(449);
  const [maxPrice, setMaxPrice] = useState(3000);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
  };

  const handleBlurMin = () => {
    if (minPrice > maxPrice) {
      setMinPrice(maxPrice);
    }
    if (minPrice < 449) {
      setMinPrice(449);
    }
  };

  const handleBlurMax = () => {
    if (maxPrice < minPrice) {
      setMaxPrice(minPrice);
    }
    if (maxPrice > 3000) {
      setMaxPrice(3000);
    }
  };

  const handleCheckboxChange = (name, value, isChecked) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (isChecked) {
        updatedFilters[name] = [...updatedFilters[name], value];
      } else {
        updatedFilters[name] = updatedFilters[name].filter(
          (item) => item !== value
        );
      }

      // После обновления состояния сразу фильтруем данные
      renderDataFiltered(updatedFilters);
      return updatedFilters;
    });
  };

  const renderDataFiltered = (currentFilters = selectedFilters) => {
    const filteredItems = data.filter((item) => {
      return item.color.some((color) => {
        const matchesColor =
          currentFilters.Color.length === 0 ||
          currentFilters.Color.includes(color.color_name);

        const matchesSize =
          currentFilters.Size.length === 0 ||
          color.sizes.some((size) =>
            currentFilters.Size.includes(size.size_name)
          );

        const matchesPrice = item.cost >= minPrice && item.cost <= maxPrice;

        return matchesColor && matchesSize && matchesPrice;
      });
    });

    filteredData(filteredItems);
  };

  return (
    <div>
      <ul>
        <div className="price-filter">
        <FilterCostView
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleMaxChange={handleMaxChange}
          handleMinChange={handleMinChange}
          handleBlurMax={handleBlurMax}
          handleBlurMin={handleBlurMin}
        />
        <button
          onClick={() => {
            renderDataFiltered();
            console.log(selectedFilters);
          }}
        >
          Застосувати
        </button>
        </div>
        {allFilters.map((item, i) => {
          return (
            <li key={i}>
              <ul>
                <div className="filter-head">
                  {filterName[i] === 'Size' ? 'Розмір' : "Колір"}
                </div>
                {item.map((elem, j) => {
                  return (
                    <li key={j}>
                      <CheckBoxSizeView
                        handleCheckboxChange={handleCheckboxChange}
                        renderDataFiltered={renderDataFiltered}
                        filterName={filterName[i]}
                        filterValue={elem}
                        isChecked={selectedFilters[filterName[i]].includes(
                          elem
                        )}
                      />
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}


        <ul>
          <div className="filter-head">
            {filterName[1] === 'Size' ? 'Розмір' : "Колір"}
          </div>
          {colorFilter.map((elem, i) => {
            return (
              <li>
                <CheckBoxColorView
                  handleCheckboxChange={handleCheckboxChange}
                  filterName={filterName[1]}
                  filterValue={elem}
                  isChecked={selectedFilters[filterName[1]].includes(elem)}
                />
              </li>
            );
          })}
        </ul>

        

      </ul>
    </div>
  );
}


const CostView = ({
  minPrice,
  handleMinChange,
  maxPrice,
  handleMaxChange,
  handleBlurMin,
  handleBlurMax,
}) => {
  return (
    <div>
      <div htmlFor="minPrice" className="filter-head">Ціна, грн</div>
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

// const CheckBoxView = ({
//   handleCheckboxChange,
//   filterName,
//   filterValue,
//   isChecked,
// }) => {
//   const handleChange = (event) => {
//     handleCheckboxChange(filterName, filterValue, event.target.checked);
//   };

//   return (
//     <div className="filter-checkbox">
//         <input
//           type="checkbox"
//           name={filterName}
//           value={filterValue}
//           onChange={handleChange}
//           checked={isChecked}
//         />
//         <div className="filter-value">{filterValue}</div>
//     </div>
//   );
// };


export default Filter;
