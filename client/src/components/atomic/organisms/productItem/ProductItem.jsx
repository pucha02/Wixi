import { ProductCost } from "../../atoms/atomsProduct/Cost";
import { ProductDescription } from "../../atoms/atomsProduct/Description";
import { ProductName } from "../../atoms/atomsProduct/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button";
import { ProductType } from "../../atoms/atomsProduct/Type";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductArticle } from "../../atoms/atomsProduct/Article/Article";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from "../../../../redux/reducers/cartReducer";
import { addItemToCart } from "../../../../redux/reducers/cartReducer";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
import useGetDataProduct from "../../../../services/FetchData";
import { useState } from "react";

import HeartIcon from '../../../../assets/svg/little-heart-2.svg'

import './ProductItem.css'

export const ProductItem = ({ productName, description, productCost, toProductItem, productId, productColors, productDiscount, productType, classNames }) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { addToCart } = useGetDataProduct();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.cart.items);
  const location = useLocation();

  const token = localStorage.getItem('token')

  const { localProductCost, localProductId, localProductName, localProductColors, localProductDiscount, localProductType } = location.state || {};

  const cost = productCost || localProductCost;
  const _id = productId || localProductId;
  const title = productName || localProductName;
  const colors = productColors || localProductColors;
  const discount = productDiscount || localProductDiscount;
  const type = productType || localProductType;

  const totalAvailableQuantity = colors[activeIndex]?.sizes.reduce((total, el) => {
    return total + el.availableQuantity;
  }, 0);

  const activeColor = colors[activeIndex];
  const activeImage = activeColor?.img[0]?.img_link;

  const handleAddToCart = () => {
    const item = { title, _id, cost, color: activeColor?.name, quantity: 1 };
    console.log(token)
    if (token) {
      const userId = localStorage.getItem('userid');
      dispatch(addItemToCart({ item, userId }));
    }
    else {
      dispatch(addItem(item));
      console.log(item)
    }
  };


  const handleAddToWishList = () => {
    setIsLiked(!isLiked);
    // const item = { title, _id, cost };
    // dispatch(addItem(item));
    // if (userId) {
    //   addToCart(userId, item);
    // }
    console.log(product, cost);
  };

  return (
    <div className="product-item" onClick={toProductItem}>
      <ProductImage src={activeImage} className={''} />
      <div className="name-heart">
        <ProductName name={title} className={''} />
        <ProductHeart src={HeartIcon} isLiked={isLiked} toggleHeart={handleAddToWishList} />
      </div>
      <ProductDescription description={description} className={''} />

      <ProductType productType={type} className={''} />
      <div className="cost-article">
        {
          totalAvailableQuantity > 0 ? (
            <div className="availability-text">В наявності</div>
          ) :
            <div className="availability-text">Немає у наявності</div>
        }
        <ProductArticle article={555555} className={''} />

      </div>
      <div className="cost-addBtn">
        <ProductCost cost={cost} discount={discount} className={''} />
        <ProductButtonAddToCart handleAddToCart={handleAddToCart} className={''} />
      </div>
      <ColorList colors={colors} setActiveIndex={setActiveIndex} activeIndex={activeIndex} className={''} />
    </div>
  );
};
