import { ProductCost } from "../../atoms/atomsProduct/Cost/Cost";
import { ProductDescription } from "../../atoms/atomsProduct/Description";
import { ProductName } from "../../atoms/atomsProduct/Name/Name";
import ProductDescriptionMenu from "../ProductDescriptionMenu/ProductDescriptionMenu";
import { SizeTable } from "../../atoms/atomsProduct/SizeTable/SizeTable";
import { ProductButtonAddToCartTxt } from "../../atoms/atomsProduct/Button/ButtonTxt";
import { ProductArticle } from "../../atoms/atomsProduct/Article/Article";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../../redux/reducers/cartReducer";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
import { CarouselListByTypes } from "../../templates/CarouselListByTypes/CarouselListByTypes";
import { ProductDiscount } from "../../atoms/atomsProduct/Discount/Discount";
import useGetDataProduct from "../../../../services/FetchData";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  addItemToCart,
} from "../../../../redux/reducers/cartReducer";
import { handleAddToCart } from "../../../../utils/cartOperations";
import { handleAddToWishList } from "../../../../utils/wishListOperations";
import ImageSlider from "../../templates/Slider/ImageSlider";
import HeartIcon from "../../../../assets/svg/little-heart-2.svg";

import "./ProductItem.css";

export const ProductItem = () => {

  const [data, setData] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { getProduct } = useGetDataProduct();
  const dispatch = useDispatch();
  const location = useLocation();
  let { productName } = useParams();

  const token = localStorage.getItem('token')

  const activeColor = data[0]?.color?.[activeIndex];
  console.log(activeColor?.img)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProduct(productName);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    window.scrollTo(0, 0);
    fetchData();
  }, [productName]);

  function renderDataProductProperty(newData) {
    if (newData.length === 0) return null;
    const item = newData[0]
    const isLiked = likedItems[item._id] || false;
    return (
      <div className="product-item">
        <div className="name-heart">
          <ProductName name={item.title} className={""} />
          <ProductHeart
            src={HeartIcon}
            isLiked={isLiked}
            toggleHeart={() => handleAddToWishList(item._id, setLikedItems)}
          />
        </div>
        <ProductDescription description={item.description} className={""} />
        <div className="cost-article">
          {activeColor?.sizes?.reduce((total, size) => total + size.availableQuantity, 0) > 0 ? (
            <div className="availability-text">В наличии</div>
          ) : (
            <div className="availability-text">Нет в наличии</div>
          )}
          <ProductArticle article={item.article || "—"} className={""} />
        </div>
        <div className="cost-addBtn">
          <ProductCost cost={item.cost} discount={item.discount.percentage} />
          {/* {item.discount.percentage > 0 ? <ProductDiscount discount={item.discount.percentage} /> : null} */}

        </div>
        <ColorList
          colors={item.color}
          setActiveIndex={(index) => setActiveIndex(index)}
          activeIndex={activeIndex}
          setActiveSize={setActiveSize}
          activeSize={activeSize}
        />
        <SizeTable />
        <ProductButtonAddToCartTxt
          handleAddToCart={() => handleAddToCart(item, activeColor, activeSize, dispatch, addItemToCart, addItem, token)}
          className={""}
        />
      </div>
    )
  }

  const elements = useMemo(() => {
    return renderDataProductProperty(data);
  }, [data, activeIndex, likedItems, isLiked, activeSize]);

  return (
    <div>
      <div className="product-page-container">
        <div className="product-page-data-block">
          <ImageSlider images={activeColor?.img && activeColor?.img.length > 0 ? activeColor.img : []} />

          {elements}
        </div>
        <div className="tab-menu-block">
          <ProductDescriptionMenu />
        </div>
        <div className="recently-viewed-container">
          {JSON.parse(localStorage.getItem("recentlyViewed"))?.length > 0 && (
            <>
              <h2>ПЕРЕГЛЯНУТІ
                ТОВАРИ:</h2>
              <CarouselListByTypes
                type={null}
                getdata={JSON.parse(localStorage.getItem("recentlyViewed"))}
                countSlide={4}
              />
            </>
          )}
        </div>

      </div>
    </div>
  );
};