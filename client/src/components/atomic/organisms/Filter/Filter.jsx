import { useState } from "react";

function Filter({ data, filteredData }) {

  const sizeFilter = ["XS", "S", "M", "L", "XL"];
  const colorFilter = ["чорний", "сірий", "голубий", "світлосірий", "чорно-сірий", 'чорно-білий', 'графітовий', 'білий'];
  const allFilters = [sizeFilter, colorFilter];
  const filterName = ["Size", "Color"];

  const [selectedFilters, setSelectedFilters] = useState({
    Size: [],
    Color: [],
  });

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
          console.log(matchesColor)
        const matchesSize =
          selectedFilters.Size.length === 0 ||
          color.sizes.some((size) =>
            selectedFilters.Size.includes(size.size_name)
          );
  
        return matchesColor && matchesSize; 
      });
    });
  
    console.log(filteredItems)
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
                      <CheckBoxView
                        handleCheckboxChange={handleCheckboxChange}
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
        <button
        onClick={() => {
          renderDataFiltered();
          console.log(selectedFilters, "\n allData", data[1].color[0].sizes[0].size_name);
        }}
      >
        Застосувати
      </button>
      </ul>
      
    </div>
  );
}

const CheckBoxView = ({
  handleCheckboxChange,
  filterName,
  filterValue,
  isChecked,
}) => {
  const handleChange = (event) => {
    handleCheckboxChange(filterName, filterValue, event.target.checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name={filterName}
          value={filterValue}
          onChange={handleChange}
          checked={isChecked}
        />
        {filterValue}
      </label>
    </div>
  );
};

export default Filter;
