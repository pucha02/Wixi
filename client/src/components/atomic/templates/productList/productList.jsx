import { ProductCost } from "../../atoms/atomsProduct/Cost/Cost";
import { ProductDescription } from "../../atoms/atomsProduct/Description";
import { ProductName } from "../../atoms/atomsProduct/Name/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button";
import { ProductType } from "../../atoms/atomsProduct/Type";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductArticle } from "../../atoms/atomsProduct/Article/Article";
import { ProductDiscount } from "../../atoms/atomsProduct/Discount/Discount";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
import { CarouselListByTypes } from "../CarouselListByTypes/CarouselListByTypes";

import { addItem } from "../../../../redux/reducers/cartReducer";
import {
  addItemToCart,
  fetchCart,
} from "../../../../redux/reducers/cartReducer";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { Link, useParams, useLocation } from "react-router-dom";
import { FilterIcon } from "../../atoms/Filter/FilterIcon/FilterIcon";
import FilterImg from '../../../../assets/svg/filter.svg'
import HeartIcon from "../../../../assets/svg/little-heart-2.svg";
import './productList.css'

const ProductList = () => {
  const [data, setData] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  let { id } = useParams();
  const { getAllProductByCategory } = useGetDataProduct();
  const location = useLocation();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.cart.items);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProductByCategory(id);
        const updatedData = result.map((item) => ({
          ...item,
          activeIndex: 0
        }));
        setData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const loadRecentlyViewed = () => {
    const data = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(data);
  };

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const handleAddToCart = (product, activeColor) => {
    const hasDiscount = product.discount?.percentage > 0;
    const discountedCost = hasDiscount
      ? product.cost - (product.cost * product.discount.percentage) / 100
      : product.cost;
  
    // Формируем объект товара
    const item = {
      title: product.title,
      _id: product._id,
      cost: discountedCost, // Цена (с учетом скидки, если есть)
      color: activeColor?.name,
      quantity: 1,
      ...(hasDiscount && { originalCost: product.cost }), // Добавляем originalCost только при наличии скидки
      ...(hasDiscount && { discount: product.discount.percentage }), // Процент скидки, только если она есть
    };
  
    console.log(token);
    if (token) {
      const userId = localStorage.getItem('userid');
      dispatch(addItemToCart({ item, userId }));
    } else {
      dispatch(addItem(item));
      console.log(item);
    }
  };
  


  const handleAddToWishList = () => {
    setIsLiked(!isLiked);
    console.log(product, data[0].cost);
  };

  const handleSetActiveIndex = (productId, index) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === productId
          ? { ...item, activeIndex: index }
          : item
      )
    );
  };

  const addToRecentlyViewed = (product) => {
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    console.log(recentlyViewed)
    if (!recentlyViewed.some((item) => item._id === product._id)) {
      recentlyViewed.push(product);
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
  };

  const renderItems = (arr) => {
    const items = arr.map((item, i) => {
      const activeColor = item.color?.[item.activeIndex] || item.color?.[0];
      const activeImage = activeColor?.img?.[0]?.img_link || "/placeholder-image.png";

      return (
        <li className="product-item-li" key={i}>
          <div className="product-item">
            <Link to={`${location.pathname}/${item.title}`} onClick={() => addToRecentlyViewed(item)}>
              <ProductImage src={activeImage} className={""} />
            </Link>
            <div className="name-heart">
              <ProductName name={item.title} className={""} />
              <ProductHeart
                src={HeartIcon}
                isLiked={isLiked}
                toggleHeart={() => handleAddToWishList(i)}
              />
              <ProductButtonAddToCart
                handleAddToCart={() => handleAddToCart(item, activeColor)}
                className={""}
              />
            </div>
            <div className="cost-addBtn">
              <ProductCost cost={item.cost} discount={item.discount.percentage} />
              {item.discount.percentage > 0 ? <ProductDiscount discount={item.discount.percentage} /> : null}
            </div>
            <ColorList
              colors={item.color}
              setActiveIndex={(index) => handleSetActiveIndex(item._id, index)}
              activeIndex={item.activeIndex}
              className={""}
            />
          </div>
        </li>
      );
    });
    return <ul className="product-list">{items}</ul>;
  };

  return (
    <div className="catalog-container">
      <div className="category-title">
        {id}
        <FilterIcon src={FilterImg} />
      </div>
      {renderItems(data)}
      <div className="recently-viewed-container">
        <h2>Recently Viewed</h2>
        <CarouselListByTypes type={null} getdata={JSON.parse(localStorage.getItem("recentlyViewed"))} />
      </div>
    </div>
  );
};

export default ProductList;
