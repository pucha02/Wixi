import { ProductCost } from "../../atoms/atomsProduct/Cost/Cost";
import { ProductName } from "../../atoms/atomsProduct/Name/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button/ButtonImage";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductDiscount } from "../../atoms/atomsProduct/Discount/Discount";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";

import { addItem } from "../../../../redux/reducers/cartReducer";
import { addItemToCart } from "../../../../redux/reducers/cartReducer";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { handleAddToCart } from "../../../../utils/cartOperations";
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import "./CarouselListByTypes.css";

export const CarouselListByTypes = ({ type = null, getdata, countSlide = 3 }) => {
  const [data, setData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
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
              {/* <ProductButtonAddToCart
                handleAddToCart={() => handleAddToCart(item, activeColor, dispatch, addItemToCart, addItem, token
              /> */}
            </div>
            <div className="cost-addBtn">
              <ProductCost cost={item.cost} discount={item.discount.percentage} />
              {item.discount.percentage > 0 ? (
                <ProductDiscount discount={item.discount.percentage} />
              ) : null}
            </div>
            <ColorList
              colors={item.color}
              setActiveIndex={(index) => setActiveIndex(index)}
              activeIndex={activeIndex}
              setActiveSize={setActiveSize}
              activeSize={activeSize}
              classname={"isDisplaySizes"}
            />

          </div>
        </SwiperSlide>
      );
    });
  };

  return (
    <div className="main-container">
      <Swiper
        slidesPerView={countSlide}
        spaceBetween={0}
        breakpoints={{
          320: {
            slidesPerView: 2, // 2 slides for mobile devices
            spaceBetween: 10, // Adjust the space between slides if necessary
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1324: {
            slidesPerView: countSlide,
            spaceBetween: 30,
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {renderItems(data)}
      </Swiper>

    </div>
  );
};
