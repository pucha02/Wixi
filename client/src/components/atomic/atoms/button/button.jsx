import React from 'react';

const Button = ({ label, onClick, isActive }) => {
  return (
    <button onClick={onClick} className={isActive ? 'active' : ''}>
      {label}
    </button>
  );
};

export default Button;
