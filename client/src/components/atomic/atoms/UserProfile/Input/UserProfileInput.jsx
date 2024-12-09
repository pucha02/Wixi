import React from "react";
import "./UserProfileInput.css";

const UserProfileInput = ({ type = "text", placeholder, value, onChange }) => (
  <input
    className="input-field-profile"
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default UserProfileInput;
