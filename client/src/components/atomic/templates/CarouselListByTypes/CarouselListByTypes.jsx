import { ProductCost } from "../../atoms/atomsProduct/Cost/Cost";
import { ProductName } from "../../atoms/atomsProduct/Name/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductDiscount } from "../../atoms/atomsProduct/Discount/Discount";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";

import { addItem } from "../../../../redux/reducers/cartReducer";
import { addItemToCart } from "../../../../redux/reducers/cartReducer";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import "./CarouselListByTypes.css";

export const CarouselListByTypes = ({ type = null, getdata }) => {
  const [data, setData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const { getProductByType } = useGetDataProduct();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProductByType(type);
        const updatedData = result.map((item) => ({
          ...item,
          activeIndex: 0,
        }));
        setData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (getdata) {
      setData(getdata);
    } else {
      fetchData();
    }
  }, [type, getdata]);
  const token = localStorage.getItem("token");


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

  const renderItems = (arr) => {
    return arr.map((item) => {
      const activeColor = item.color?.[item.activeIndex] || item.color?.[0];
      const activeImage = activeColor?.img?.[0]?.img_link || "/placeholder-image.png";

      return (
        <SwiperSlide key={item._id}>
          <div className="product-item main-page">
            <Link to={`/category/productList/${item.category}/${item.title}`}>
              <ProductImage src={activeImage} className={"main-page"} />
            </Link>
            <div className="name-heart">
              <ProductName name={item.title} />
              <ProductHeart
                isLiked={isLiked}
                toggleHeart={() => setIsLiked(!isLiked)}
              />
              <ProductButtonAddToCart
                handleAddToCart={() => handleAddToCart(item, activeColor)}
              />
            </div>
            <div className="cost-addBtn">
              <ProductCost cost={item.cost} discount={item.discount.percentage} />
              {item.discount.percentage > 0 ? (
                <ProductDiscount discount={item.discount.percentage} />
              ) : null}
            </div>
            <ColorList
              colors={item.color}
              setActiveIndex={(index) =>
                setData((prev) =>
                  prev.map((el) =>
                    el._id === item._id ? { ...el, activeIndex: index } : el
                  )
                )
              }
              activeIndex={item.activeIndex}
            />
          </div>
        </SwiperSlide>
      );
    });
  };

  return (
    <div className="main-container">
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {renderItems(data)}
      </Swiper>
     
    </div>
  );
};
