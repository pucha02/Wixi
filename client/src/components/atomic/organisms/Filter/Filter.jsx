import FilterItem from "../../molecules/FilterItem/FilterItem";

function Filter({ data }) {
  const size = ["XS", "S", "M", "L", "XL"];
  const color = ["red", "green", "white", "black"];
  const brand = ["wixi", "adidas", "nike"];

  const allFilters = [size, color, brand];

  const filterName = ['Size', 'Color', 'Brand']

  return (
    <div>
      <ul>
        {allFilters.map((item, i) => {
          return (
            <li key={i}>
              <ul>
                {filterName[i]}
                {item.map((elem, j)=>{
                  return <li key={j}>{<FilterItem size={elem} count={2} />}</li>
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Filter;
