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




  const handleAddToCart = () => {
    dispatch(addItem(data[0]));
    if (userId) {
      addToCart(userId, data[0]);
    }
    console.log(product, data[0].cost);
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
    const productData = newData[0]
    return (
      <div className="product-item" /* onClick={toProductItem}*/>
      {/* <ProductImage src={activeImage} className={""} /> */}
      <div className="name-heart">
        <ProductName name={productData.title} className={""} />
        <ProductHeart
          src={HeartIcon}
          isLiked={isLiked}
          toggleHeart={handleAddToWishList}
        />
      </div>
      <ProductDescription description={productData.description} className={""} />
      <ProductType productType={productData.type} className={""} />
      <div className="cost-article">
        {/* {totalAvailableQuantity > 0 ? (
          <div className="availability-text">В наявності</div>
        ) : (
          <div className="availability-text">Немає у наявності</div>
        )} */}
        <ProductArticle article={555555} className={""} />
      </div>
      <div className="cost-addBtn">
        <ProductCost cost={productData.cost} discount={productData.discount} className={""} />
        <ProductButtonAddToCart handleAddToCart={handleAddToCart} className={""} />
      </div>
      {/* <ColorList
        colors={colors}
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
        className={""}
      /> */}
      <button onClick={() => { console.log(data[0].cost) }}>testButtonForData</button>
    </div>
    )
  }

  const elements = useMemo(() => {
    return renderDataProductProperty(data);
  }, [data]);

  return (
  elements
  );
};
