import React, { useState } from 'react';
import TabContent from '../../atoms/ProductInfo/Description/Description';
import ProductInfoMenu from '../../molecules/ProductInfoMenu/ProductInfoMenu';

const ProductDescriptionMenu = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = ['ОПИС', 'ОПЛАТА', 'ДОСТАВКА'];
    const descriptions = [
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    ];

    return (
        <div>
            <ProductInfoMenu tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
            <TabContent>
                <p>{descriptions[activeTab]}</p>
            </TabContent>
        </div>
    );
};

export default ProductDescriptionMenu;
