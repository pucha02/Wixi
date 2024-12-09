import { ProductCost } from "../../atoms/atomsProduct/Cost";
import { ProductDescription } from "../../atoms/atomsProduct/Description";
import { ProductName } from "../../atoms/atomsProduct/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button";
import { ProductType } from "../../atoms/atomsProduct/Type";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductArticle } from "../../atoms/atomsProduct/Article/Article";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../../redux/reducers/cartReducer";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
import useGetDataProduct from "../../../../services/FetchData";
import { useState, useEffect, useMemo } from "react"; 
import { useParams } from "react-router-dom";
import {
  addItemToCart,
  fetchCart,
} from "../../../../redux/reducers/cartReducer";

import HeartIcon from "../../../../assets/svg/little-heart-2.svg";

import "./ProductItem.css";

export const ProductItem = () => {

  const [data, setData] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { addToCart, getProduct } = useGetDataProduct();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.cart.items);
  const location = useLocation();
  const userId = localStorage.getItem("userid");
  let { productName } = useParams();

  const token = localStorage.getItem('token')

  const activeColor = data[0]?.color?.[activeIndex];
  const activeImage = activeColor?.img?.[0]?.img_link || '';
  const totalAvailableQuantity = activeColor?.sizes?.reduce((total, el) => total + el.availableQuantity, 0) || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProduct(productName);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const {
    localProductColors,
  } = location.state || {};




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

  function renderDataProductProperty(newData) {
    if (newData.length === 0) return null;
    const item = newData[0]
    return (
      <div className="product-item">

        <ProductImage src={activeImage} className={""} />
 
      <div className="name-heart">
        <ProductName name={item.title} className={""} />
        {/* <ProductHeart 
          src={HeartIcon}
          isLiked={isLiked}
          toggleHeart={() => handleAddToWishList(i)}
        /> */}
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
          handleAddToCart={()=>handleAddToCart(item, activeColor)}
          className={""}
        />
      </div>
      <ColorList
        colors={item.color}
        setActiveIndex={(index) => setActiveIndex(index)}
        activeIndex={activeIndex}
        className={""}
      />
    </div>
    )
  }

  const elements = useMemo(() => {
    return renderDataProductProperty(data);
  }, [data, activeIndex]);

  return (
  elements
  );
};