import { ProductCost } from "../../atoms/atomsProduct/Cost/Cost";
import { ProductName } from "../../atoms/atomsProduct/Name/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button/ButtonImage";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductDiscount } from "../../atoms/atomsProduct/Discount/Discount";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { Link } from "react-router-dom";
import HeartIcon from "../../../../assets/svg/little-heart-2.svg";
import HeartIcon2 from "../../../../assets/svg/little-heart-3.svg";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../../../redux/reducers/wishlistReducer";
import NoImg from "../../../../assets/svg/no-iamge.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "./CarouselListByTypes.css";

export const CarouselListByTypes = ({ type = null, getdata, countSlide = 3, setActiveIndex = null }) => {
  const [data, setData] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [productState, setProductState] = useState({});
  const [colors, setColors] = useState({});

  const { getProductByType } = useGetDataProduct();
  const dispatch = useDispatch();
  const childRefs = useRef([]);
  const storedLikes = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProductByType(type);
  
        // Фильтруем элементы с totalAvailable > 0
        const filteredResult = result.filter((item) => {
          const totalAvailable = item.color.reduce(
            (total, color) =>
              total + color.sizes.reduce((sum, size) => sum + size.availableQuantity, 0),
            0
          );
          return totalAvailable > 0; // Оставляем только элементы с totalAvailable > 0
        });
  
        setData(filteredResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    if (getdata) {
      // Если getdata существует, фильтруем и устанавливаем данные
      const filteredGetData = getdata.filter((item) => {
        const totalAvailable = item.color.reduce(
          (total, color) =>
            total + color.sizes.reduce((sum, size) => sum + size.availableQuantity, 0),
          0
        );
        return totalAvailable > 0;
      });
  
      setData(filteredGetData);
    } else {
      fetchData();
    }
  }, [type, getdata]);
  

  useEffect(() => {
    if (data.length) {
      const initialState = {};
      data.forEach((item) => {
        initialState[item._id] = { activeIndex: 0, activeSize: 0 };
      });
      setProductState(initialState);
    }
  }, [data]);

  useEffect(() => {
    const initialLikedItems = {};
    storedLikes.forEach((item) => {
      initialLikedItems[item._id] = true;
    });
    setLikedItems(initialLikedItems);
  }, [storedLikes]);

  const updateProductState = (id, field, value) => {
    setProductState((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], [field]: value },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://16.171.32.44/api/colors/get-colors');
        if (!response.ok) {
          throw new Error('Ошибка сети: ' + response.status);
        }

        const data = await response.json();

        const colorMap = data.reduce((acc, color) => {
          acc[color.name.toLowerCase()] = color.color;
          return acc;
        }, {});

        setColors(colorMap);
        console.log(colorMap)
      } catch (err) {
        console.error(err);
      } finally {
      }
    };

    fetchData();
  }, []);

  const handleAddToWishlist = (product, index) => {
    const activeColor = product.color?.[productState[product._id]?.activeIndex] || product.color?.[0];
    const activeImage = activeColor?.img?.[0]?.img_link || NoImg;
    const item = {
      title: product.title,
      _id: product._id,
      cost: product.cost,
      img: activeImage,
      color: activeColor,
      category: product.category,
    };

    const isCurrentlyLiked = !!likedItems[product._id];

    if (isCurrentlyLiked) {
      dispatch(removeItemFromWishlist(item));
    } else {
      dispatch(addItemToWishlist(item));
    }

    setLikedItems((prev) => ({ ...prev, [product._id]: !isCurrentlyLiked }));
  };

  const addToRecentlyViewed = (product) => {
    if (setActiveIndex) {
      setActiveIndex(0)
    }
    const recentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    if (!recentlyViewed.some((item) => item._id === product._id)) {
      recentlyViewed.push(product);
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
  };
  const filledData = [
    ...data,
    ...Array(Math.max(0, countSlide - data.length)).fill({ _id: "empty", isPlaceholder: true }),
  ];
  const renderItems = (arr) => {
    return arr.map((item, i) => {
      if (item.isPlaceholder) {
        return <SwiperSlide key={`placeholder-${i}`} />;
      }
      const productStateItem = productState[item._id] || { activeIndex: 0, activeSize: 0 };
      const activeColor = item.color?.[productStateItem.activeIndex] || item.color?.[0];
      const activeImage = activeColor?.img?.[0]?.img_link || NoImg;

      return (
        <SwiperSlide key={item._id}>
          <div className="product-item main-page">
            <Link
              to={`/category/productList/${item.category}/${item.title}`}
              onClick={() => addToRecentlyViewed(item)}
            >
              <ProductImage src={activeImage} className={"main-page"} />
            </Link>
            <div className="name-heart">
              <Link
                to={`/category/productList/${item.category}/${item.title}`}
                onClick={() => addToRecentlyViewed(item)}
              >
                <ProductName name={item.title} />
              </Link>
              <ProductHeart
                src={HeartIcon}
                src2={HeartIcon2}
                toggleHeart={() => handleAddToWishlist(item, i)}
                id={item._id}
                isLiked={likedItems[item._id]}
                ref={(el) => (childRefs.current[i] = el)}
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
              setActiveIndex={(index) => updateProductState(item._id, "activeIndex", index)}
              activeIndex={productStateItem.activeIndex}
              setActiveSize={(size) => updateProductState(item._id, "activeSize", size)}
              activeSize={productStateItem.activeSize}
              classname={"isDisplaySizes"}
              colorsList={colors}
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


        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
            slidesOffsetBefore: 0,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 0,
            slidesOffsetBefore: 0,
          },
          1444: {
            slidesPerView: countSlide,
            spaceBetween: 0,
            slidesOffsetBefore: 0,
          },
          1920: {
            slidesPerView: 4,
            spaceBetween: 0,
            slidesOffsetBefore: 0,
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {renderItems(filledData)}
      </Swiper>
    </div>
  );
};
