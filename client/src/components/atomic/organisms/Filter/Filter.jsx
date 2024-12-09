import { useState } from "react";
import FilterCostView from "../../molecules/FilterViewElements/CostView/FilterCostView";
import CheckBoxSizeView from "../../molecules/FilterViewElements/CheckBoxSizeView/CheckBoxSizeView";
import CheckBoxColorView from "../../molecules/FilterViewElements/CheckBoxColorView/CheckBoxColorView";

function Filter({ data, filteredData }) {
  const sizeFilter = ["XS", "S", "M", "L", "XL"];
  const colorFilter = [
    "чорний",
    "сірий",
    "голубий",
    "світлосірий",
    "чорно-сірий",
    "чорно-білий",
    "графітовий",
    "білий",
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

      return updatedFilters;
    });
  };

  const renderDataFiltered = () => {
    const filteredItems = data.filter((item) => {
      return item.color.some((color) => {
        const matchesColor =
          selectedFilters.Color.length === 0 ||
          selectedFilters.Color.includes(color.color_name);
        console.log(matchesColor);
        const matchesSize =
          selectedFilters.Size.length === 0 ||
          color.sizes.some((size) =>
            selectedFilters.Size.includes(size.size_name)
          );

        const matchesPrice = item.cost >= minPrice && item.cost <= maxPrice;

        return matchesColor && matchesSize && matchesPrice;
      });
    });

    console.log(filteredItems);
    filteredData(filteredItems);
  };

  return (
    <div>
      <ul>
        {allFilters.map((item, i) => {
          return (
            <li key={i}>
              <ul>
                {filterName[i]}
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
          {filterName[1]}
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
      </ul>
    </div>
  );
}

export default Filter;
