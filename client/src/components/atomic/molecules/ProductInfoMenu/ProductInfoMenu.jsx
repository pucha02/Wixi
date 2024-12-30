import React from 'react';
import { MenuInfoElement } from '../../atoms/ProductInfo/MenuEl/MenuEl';
import './ProductInfoMenu.css'

const ProductInfoMenu = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className='tab-menu'>
      <div className='tab-menu-buttons'>
        {tabs.map((tab, index) => (
          <MenuInfoElement
            key={index}
            label={tab}
            isActive={activeTab === index}
            onClick={() => onTabClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductInfoMenu;