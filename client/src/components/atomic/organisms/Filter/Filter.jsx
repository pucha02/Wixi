import { useState, useEffect } from "react";
import FilterCostView from "../../molecules/FilterViewElements/CostView/FilterCostView";
import CheckBoxSizeView from "../../molecules/FilterViewElements/CheckBoxSizeView/CheckBoxSizeView";
import CheckBoxColorView from "../../molecules/FilterViewElements/CheckBoxColorView/CheckBoxColorView";

function Filter({ data, filteredData, setViewMobileFilter }) {
  const sizeFilter = ["XS", "S", "M", "L", "XL"];
  const colorFilter = [
    "чорний",
    "сірий",
    "світло-сірий",
    "білий",
    "смарагд",
    "бордо",
    "голубий",
    "оранжевий",
    "м'ятний",
    "персик",
    "хакі",
    "електрик",
    "яскраво-рожевий",
    "графітовий",
    "синій",
    "червоний",
    "малиновий",
    "коричневий",
    "блакитний",
    "смарагдово-синій",
    "темно-сірий",
    "зелений",
    "світло-рожевий",
    "срібний",
    "чорно-білий",
    "фіолетовий",
    "чорно-сірий",
    "мятний",
    "кавовий",
    "темний графіт",
    "молочний",
    "чорно-синій",
    "чорно-зелений",
    "чорний з сірими вставками",
    "темно-синій",
    "рожевий",
    "беж",
    "молочно-білий",
    "ніжно-рожевий",
    "смарагдовий",
    "винний",
    "оливка",
    "ліловий",
    "пісочний",
    "графіт",
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
      setMaxPrice(minPrice + 1);
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

        let matchesPrice;

        if (item.discount.percentage === 0) {
          matchesPrice = item.cost >= minPrice && item.cost <= maxPrice;
        } else {
          const discountPrice =
            item.cost - (item.discount.percentage / 100) * item.cost;
          matchesPrice = discountPrice >= minPrice && discountPrice <= maxPrice;
        }

        return matchesColor && matchesSize && matchesPrice;
      });
    });

    filteredData(filteredItems);
  };

  const resetFilters = () => {
    setSelectedFilters({ Size: [], Color: [] });
    setMinPrice(100);
    setMaxPrice(3000);
    filteredData(data); // Отображаем все данные без фильтров
    if (setViewMobileFilter) {
      setViewMobileFilter(false);
    }
  };

  return (
    <div>
      <ul>
        <button className="price-filter-btn" onClick={resetFilters}>
          СБРОСИТИ ФІЛЬТРИ
        </button>
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
            className="price-filter-btns"
            onClick={() => {
              renderDataFiltered();
              if (setViewMobileFilter) {
                setViewMobileFilter(false);
              }
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
              {sizeFilter.map(
                (elem, j) =>
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
              )}
            </ul>
          </li>
        )}

        {/* Фильтр цветов */}
        {availableColors.length > 0 && (
          <ul>
            <div className="filter-head">Колір</div>
            {colorFilter.map(
              (elem, i) =>
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
            )}
          </ul>
        )}
        {selectedFilters.Size.length > 0 || selectedFilters.Color.length > 0 ? (
          <button
            className="price-filter-btn"
            onClick={() => {
              renderDataFiltered();
              if (setViewMobileFilter) {
                setViewMobileFilter(false);
              }
            }}
          >
            ПОКАЗАТИ ОБРАНІ ТОВАРИ
          </button>
        ) : null}
      </ul>
    </div>
  );
}

export default Filter;
