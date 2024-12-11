import { ProductCost } from "../../atoms/atomsProduct/Cost/Cost";
import { ProductName } from "../../atoms/atomsProduct/Name/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button/ButtonImage";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductDiscount } from "../../atoms/atomsProduct/Discount/Discount";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { Link } from "react-router-dom";
import HeartIcon from "../../../../assets/svg/little-heart-2.svg";
import HeartIcon2 from "../../../../assets/svg/little-heart-3.svg";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../../../redux/reducers/wishlistReducer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import "./CarouselListByTypes.css";

export const CarouselListByTypes = ({ type = null, getdata, countSlide = 3 }) => {

  const [data, setData] = useState([]);
  const [isLiked, setLiked] = useState();
  const [likedItems, setLikedItems] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const { getProductByType } = useGetDataProduct();
  const dispatch = useDispatch();
  const childRefs = useRef([]);
  const storedLikes = useSelector((state) => state.wishlist.items);

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

  const renderItems = (arr) => {
    return arr.map((item, i) => {
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
                src={HeartIcon}
                src2={HeartIcon2}
                toggleHeart={() => handleAddToWishlist(item, i)}
                id={item._id}
                isLiked={likedItems[item._id]} // Передаем состояние напрямую
                ref={(el) => (childRefs.current[i] = el)}
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
