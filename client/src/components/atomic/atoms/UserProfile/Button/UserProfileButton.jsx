import React from "react";
import "./UserProfileButton.css";

const UserProfileButton = ({ label, onClick, variant = "primary" }) => (
  <button className={`button-profile ${variant}`} onClick={onClick}>
    {label}
  </button>
);

export default UserProfileButton;
