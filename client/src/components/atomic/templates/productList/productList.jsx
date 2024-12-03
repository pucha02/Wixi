import { ProductCost } from "../../atoms/atomsProduct/Cost";
import { ProductDescription } from "../../atoms/atomsProduct/Description";
import { ProductName } from "../../atoms/atomsProduct/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button";
import { ProductType } from "../../atoms/atomsProduct/Type";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductArticle } from "../../atoms/atomsProduct/Article/Article";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";

import { addItem } from "../../../../redux/reducers/cartReducer";
import {
  addItemToCart,
} from "../../../../redux/reducers/cartReducer";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { Link, useParams, useLocation } from "react-router-dom";
import { FilterIcon } from "../../atoms/Filter/FilterIcon/FilterIcon";
import FilterImg from '../../../../assets/svg/filter.svg'
import HeartIcon from "../../../../assets/svg/little-heart-2.svg";
import './productList.css'
import Filter from "../../organisms/Filter/Filter";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  let { id } = useParams();
  const { getAllProductByCategory } = useGetDataProduct();
  const location = useLocation();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.cart.items);

  const token = localStorage.getItem('token')


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
  }, []);
  

  const handleAddToCart = (product, activeColor) => {
    const item = { title: product.title, _id: product._id, cost: product.cost, color: activeColor?.name, quantity: 1 };
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
  
  const renderItems = (arr) => {
    const items = arr.map((item, i) => {
      const activeColor = item.color?.[item.activeIndex] || item.color?.[0]; 
      const activeImage = activeColor?.img?.[0]?.img_link || "/placeholder-image.png"; 
  
      return (
        <li className="product-item-li" key={i}>
          <div className="product-item">
            <Link to={`${location.pathname}/${item.title}`}>
              <ProductImage src={activeImage} className={""} />
            </Link>
            <div className="name-heart">
              <ProductName name={item.title} className={""} />
              <ProductHeart
                src={HeartIcon}
                isLiked={isLiked}
                toggleHeart={() => handleAddToWishList(i)}
              />
            </div>
            <ProductDescription description={item.description} className={""} />
            <ProductType productType={item.type} className={""} />
            <div className="cost-article">
              {activeColor?.sizes?.reduce((total, size) => total + size.availableQuantity, 0) > 0 ? (
                <div className="availability-text">В наличии</div>
              ) : (
                <div className="availability-text">Нет в наличии</div>
              )}
              <ProductArticle article={item.article || "—"} className={""} />
            </div>
            <div className="cost-addBtn">
              <ProductCost cost={item.cost} discount={item.discount} className={""} />
              <ProductButtonAddToCart
                handleAddToCart={() => handleAddToCart(item, activeColor)}
                className={""}
              />
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
  
  const elements = useMemo(() => {
    return renderItems(data);
  }, [data, activeIndex]);

  return (
    <div className="catalog-container">
      <div className="category-title">{id}<FilterIcon src={FilterImg} /></div>
      <Filter/>
      {elements}
    </div>
  );
};

export default ProductList;