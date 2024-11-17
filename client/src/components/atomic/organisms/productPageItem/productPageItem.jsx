import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Carousel from "../../templates/Slider/Carousel";
import { ProductCost } from "../../atoms/atomsProduct/Cost";
import { ProductName } from "../../atoms/atomsProduct/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button";
import { ProductType } from "../../atoms/atomsProduct/Type";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductArticle } from "../../atoms/atomsProduct/Article/Article";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { addItem } from "../../../../redux/reducers/cartReducer";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
import useGetDataProduct from "../../../../services/FetchData";
import HeartIcon from '../../../../assets/svg/little-heart-2.svg';

import './productPageItem.css';

export const ProductPageItem = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const { addToCart } = useGetDataProduct();
    const dispatch = useDispatch();
    const location = useLocation();
    const userId = localStorage.getItem('userid');

    // Данные продукта из location.state
    const { localProductCost, localProductId, localProductName, localProductColors, localProductDiscount, localProductType } = location.state || {};

    const cost = localProductCost;
    const _id = localProductId;
    const title = localProductName;
    const colors = localProductColors;
    const discount = localProductDiscount;
    const type = localProductType;

    const activeColor = colors?.[activeIndex]; // Добавлена проверка наличия colors
    const totalAvailableQuantity = activeColor?.sizes.reduce((total, el) => total + el.availableQuantity, 0) || 0;

    const handleAddToCart = () => {
        const item = { title, _id, cost };
        dispatch(addItem(item));
        if (userId) {
            addToCart(userId, item);
        }
    };

    const handleAddToWishList = () => {
        setIsLiked(!isLiked);
    };

    const handleImageClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="product-itempage">
            {activeColor && activeColor.img ? (
                <Carousel activeColor={activeColor} />
            ) : (
                <div>Немає зображення</div>
            )}
            <div className="product-data-container">
                <div className="name-heart">
                    <ProductName name={title} className={''} />
                    <ProductHeart src={HeartIcon} isLiked={isLiked} toggleHeart={handleAddToWishList} />
                </div>
                <ProductType productType={type} className={''} />
                <div className="cost-article">
                    {totalAvailableQuantity > 0 ? (
                        <div className="availability-text">В наявності</div>
                    ) : (
                        <div className="availability-text">Немає у наявності</div>
                    )}
                    <ProductArticle article={555555} className={''} />
                </div>
                <div className="cost-addBtn">
                    <ProductCost cost={cost} discount={discount} className={''} />
                    <ProductButtonAddToCart handleAddToCart={handleAddToCart} className={''} />
                </div>
                <ColorList colors={colors} setActiveIndex={setActiveIndex} activeIndex={activeIndex} className={''} totalAvailableQuantity={totalAvailableQuantity} />
            </div>
        </div>
    );
};
