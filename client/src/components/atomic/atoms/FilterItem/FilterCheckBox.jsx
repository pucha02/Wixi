import React from "react";

export default function FilterCheckBox({handleCheckboxChange}) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          name=""
          checked
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
}
