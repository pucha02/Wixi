import FilterName from "../../atoms/FilterItem/FilterName"
import FilterCheckBox from "../../atoms/FilterItem/FilterCheckBox"
import FilterCount from "../../atoms/FilterItem/FilterCount"

import './FilterItem.css'

export default function FilterItem({nameFilterItem, count, handleCheckboxChange}) {
  return (
    <div className="filter_item">
      <FilterCheckBox handleCheckboxChange={handleCheckboxChange}/>
      <FilterName filterName={nameFilterItem}/>
      <FilterCount filterCount={count}/>
    </div>
  )
}
