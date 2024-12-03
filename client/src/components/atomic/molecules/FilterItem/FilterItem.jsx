import FilterName from "../../atoms/FilterItem/FilterName"
import FilterCheckBox from "../../atoms/FilterItem/FilterCheckBox"
import FilterCount from "../../atoms/FilterItem/FilterCount"

import './FilterItem.css'

export default function FilterItem({size, count}) {
  return (
    <div className="filter_item">
      <FilterCheckBox/>
      <FilterName filterName={size}/>
      <FilterCount filterCount={count}/>
    </div>
  )
}
