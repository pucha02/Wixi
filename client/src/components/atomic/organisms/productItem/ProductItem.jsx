import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductCost } from "../../atoms/atomsProduct/Cost/Cost";
import { ProductDescription } from "../../atoms/atomsProduct/Description";
import { ProductName } from "../../atoms/atomsProduct/Name/Name";
import ProductDescriptionMenu from "../ProductDescriptionMenu/ProductDescriptionMenu";
import { SizeTable } from "../../atoms/atomsProduct/SizeTable/SizeTable";
import { ProductButtonAddToCartTxt } from "../../atoms/atomsProduct/Button/ButtonTxt";
import { ProductArticle } from "../../atoms/atomsProduct/Article/Article";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { CarouselListByTypes } from "../../templates/CarouselListByTypes/CarouselListByTypes";
import { addItemToCart } from "../../../../redux/reducers/cartReducer";
import { handleAddToCart } from "../../../../utils/cartOperations";
import { removeItemFromWishlist } from "../../../../redux/reducers/wishlistReducer";
import { addItemToWishlist } from "../../../../redux/reducers/wishlistReducer";
import { useSelector } from "react-redux";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
import { addItem } from "../../../../redux/reducers/cartReducer";
import { useRef } from "react";
import { Link } from "react-router-dom";
import useGetDataProduct from "../../../../services/FetchData";
import ImageSlider from "../../templates/Slider/ImageSlider";
import HeartIcon from "../../../../assets/svg/little-heart-2.svg";
import HeartIcon2 from "../../../../assets/svg/little-heart-3.svg";

import "./ProductItem.css";

export const ProductItem = ({ notification, setNotification }) => {
  const [data, setData] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSize, setActiveSize] = useState(null);
  const [notifications, setNotifications] = useState("");
  const [sizeError, setSizeError] = useState(false);


  const { getProduct } = useGetDataProduct();
  const dispatch = useDispatch();
  let { productName } = useParams();

  const token = localStorage.getItem("token");
  const childRefs = useRef([]);
  const activeColor = data[0]?.color?.[activeIndex];
  const storedLikes = useSelector((state) => state.wishlist.items);
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

  useEffect(() => {
    if (notifications || sizeError) {

      const timer = setTimeout(() => {
        setNotifications(false);
        setSizeError(false)
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [notifications, sizeError]);

  useEffect(() => {
    const initialLikedItems = {};
    storedLikes.forEach((item) => {
      initialLikedItems[item._id] = true;
    });
    setLikedItems(initialLikedItems);
  }, [storedLikes]);

  const handleAddToWishlist = (product, index) => {
    const activeColor = product.color?.[product.activeIndex] || product.color?.[0];
    const activeImage = product.color?.[product.activeIndex]?.img?.[0]?.img_link || "/placeholder-image.png";
    const item = { title: product.title, _id: product._id, cost: product.cost, img: activeImage, color: activeColor, category: product.category };

    const isCurrentlyLiked = !!likedItems[product._id]; // Проверяем, лайкнут ли товар

    if (isCurrentlyLiked) {
      dispatch(removeItemFromWishlist(item));
    } else {
      dispatch(addItemToWishlist(item));
    }

    // Обновляем локальное состояние сразу
    setLikedItems((prev) => ({ ...prev, [product._id]: !isCurrentlyLiked }));
  };

  function handleAddToCartWithValidation() {
    if (!activeColor) {
      setNotifications("Будь ласка, оберіть колір товару.");
      return;
    }
    if (activeSize === null) {
      setSizeError(true); // Показываем сообщение об ошибке
      setNotifications("Будь ласка, оберіть розмір товару.");
      return;
    }

    handleAddToCart(data[0], activeColor, activeSize, dispatch, addItemToCart, addItem, token, setNotifications);
    if (activeColor && activeSize) {
      setNotification("Товар успішно доданий до кошика!");
    }
  }


  function renderDataProductProperty(newData) {
    if (newData.length === 0) return null;
    const item = newData[0];
    const isLiked = likedItems[item._id] || false;

    return (
      <div className="product-item">

        <div className="name-heart">
          <ProductName name={item.title} className={""} />
          <ProductHeart
            src={HeartIcon}
            src2={HeartIcon2}
            toggleHeart={() => handleAddToWishlist(item, item._id)}
            id={item._id}
            isLiked={likedItems[item._id]} // Передаем состояние напрямую
            ref={(el) => (childRefs.current[item._id] = el)}
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
          <ProductCost cost={item.cost} discount={item.discount?.percentage || 0} />
        </div>
        <ColorList
          colors={item.color}
          setActiveIndex={(index) => setActiveIndex(index)}
          activeIndex={activeIndex}
          setActiveSize={setActiveSize}
          activeSize={activeSize}
          notifications={notifications}
          sizeError={sizeError}
        />
        <div className="size-table-block">
          <SizeTable />

        </div>

        <ProductButtonAddToCartTxt
          handleAddToCart={handleAddToCartWithValidation}
          className={""}
        />
      </div>
    );
  }

  const elements = useMemo(() => {
    return renderDataProductProperty(data);
  }, [data, activeIndex, likedItems, activeSize, notifications]);

  return (
    <div>
      <div className="product-page-container">
        <div className="category-title"><Link to={'/'}>ГОЛОВНА</Link> / <Link to={`/category/productList/${data[0] ? data[0].category : ''}`}>{data[0] ? data[0].category : ''}</Link> / <Link to={`/category/productList/${data[0] ? data[0].category : ''}/${data[0] ? data[0].title : ''}`}>{data[0] ? data[0].title : ''.toUpperCase()}</Link></div>

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
              <h2 className="product-item-view-head">ПЕРЕГЛЯНУТІ ТОВАРИ:</h2>
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
