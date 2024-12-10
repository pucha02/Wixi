import { useState, useEffect } from "react";
import './Filter.css';
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
      "смарагд",
      "бордо",
      "голубий",
      "оранжевий",
      "м'ятний",
      "персик",
      "Xакі",
      "електрик",
      "яскраво-рожевий",
      "графітовий",
      "синій",
      "червоний",
      "Малиновий",
      "коричневий",
      "блакитний",
      "смарагдово-синій",
      "темно-сірий",
      "зелений",
      "світло-рожевий",
      "срібний"
  ];

  const [selectedFilters, setSelectedFilters] = useState({
    Size: [],
    Color: [],
  });
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);

  useEffect(() => {
    const sizes = new Set();
    const colors = new Set();

    data.forEach((item) => {
      item.color.forEach((color) => {
        colors.add(color.color_name);
        color.sizes.forEach((size) => {
          sizes.add(size.size_name);
        });
      });
    });

    setAvailableSizes([...sizes]);
    setAvailableColors([...colors]);
  }, [data]);

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
    if (minPrice < 100) {
      setMinPrice(100);
    }
  };

  const handleBlurMax = () => {
    if (maxPrice < minPrice) {
      setMaxPrice(minPrice+1);
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

        let matchesPrice
        
          if (item.discount.percentage === 0) {
             matchesPrice = item.cost >= minPrice && item.cost <= maxPrice
          } else {
            const discountPrice = item.cost - (item.discount.percentage / 100 * item.cost)
            matchesPrice = discountPrice >= minPrice && discountPrice <= maxPrice
          };
          
        

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
          className="price-filter-btn"
            onClick={() => {
              renderDataFiltered();
              console.log(selectedFilters);
            }}
          >
            ОК
          </button>
        </div>

        {/* Фильтр размеров */}
        {availableSizes.length > 0 && (
          <li>
            <ul>
              <div className="filter-head">Розмір</div>
              {sizeFilter.map((elem, j) => (
                availableSizes.includes(elem) && (
                  <li key={j}>
                    <CheckBoxSizeView
                      handleCheckboxChange={handleCheckboxChange}
                      renderDataFiltered={renderDataFiltered}
                      filterName="Size"
                      filterValue={elem}
                      isChecked={selectedFilters.Size.includes(elem)}
                    />
                  </li>
                )
              ))}
            </ul>
          </li>
        )}

        {/* Фильтр цветов */}
        {availableColors.length > 0 && (
          <ul>
            <div className="filter-head">Колір</div>
            {colorFilter.map((elem, i) => (
              availableColors.includes(elem) && (
                <li key={i}>
                  <CheckBoxColorView
                    handleCheckboxChange={handleCheckboxChange}
                    filterName="Color"
                    filterValue={elem}
                    isChecked={selectedFilters.Color.includes(elem)}
                  />
                </li>
              )
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
}

export default Filter;
