import React from 'react';
import { MenuInfoElement } from '../../atoms/ProductInfo/MenuEl/MenuEl';
import './ProductInfoMenu.css'

const ProductInfoMenu = ({ tabs, activeTab, onTabClick }) => {
    return (
      <div className='tab-menu'>
        {tabs.map((tab, index) => (
          <MenuInfoElement
            key={index}
            label={tab}
            isActive={activeTab === index}
            onClick={() => onTabClick(index)}
          />
        ))}
      </div>
    );
  };

export default ProductInfoMenu;