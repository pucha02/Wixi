// import { ProductCost } from "../../atoms/atomsProduct/Cost/Cost";
// import { ProductName } from "../../atoms/atomsProduct/Name/Name";
// import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button/ButtonImage";
// import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
// import { ProductDiscount } from "../../atoms/atomsProduct/Discount/Discount";
// import { ColorList } from "../../molecules/ColorList/ColorList";
// import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useMemo, useRef, useState } from "react";
// import useGetDataProduct from "../../../../services/FetchData";
// import { Link, useParams, useLocation } from "react-router-dom";
// import { FilterIcon } from "../../atoms/Filter/FilterIcon/FilterIcon";
// import FilterImg from "../../../../assets/svg/filter1.svg";
// import HeartIcon from "../../../../assets/svg/little-heart-2.svg";
// import HeartIcon2 from "../../../../assets/svg/little-heart-3.svg";
// import "./productList.css";
// import Filter from "../../organisms/Filter/Filter";
// import {
//   addItemToWishlist,
//   removeItemFromWishlist,
// } from "../../../../redux/reducers/wishlistReducer";

// import NoImg from '../../../../assets/svg/no-iamge.svg'

// const ProductList = ({ viewMobileFilter, setViewMobileFilter }) => {
//   const [data, setData] = useState([]);

//   const [recentlyViewed, setRecentlyViewed] = useState([]);
//   const [likedItems, setLikedItems] = useState({});
//   const [activeSize, setActiveSize] = useState(0);

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isLiked, setLiked] = useState();
//   const [filteredData, setFilteredData] = useState(null);

//   const childRefs = useRef([]);

//   let { id } = useParams();
//   const { getAllProductByCategory } = useGetDataProduct();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     loadRecentlyViewed();
//   }, []);

//   const storedLikes = useSelector((state) => state.wishlist.items);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getAllProductByCategory(id);
//         const updatedData = result.map((item) => ({
//           ...item,
//           activeIndex: 0,
//         }));
//         setData(updatedData);
//         setFilteredData(null); // Сброс фильтрованных данных
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     window.scrollTo(0, 0);
//     fetchData();
//   }, [id]); // Добавьте зависимости, чтобы предотвратить ошибки

//   const loadRecentlyViewed = () => {
//     const data = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
//     setRecentlyViewed(data);
//   };

//   useEffect(() => {
//     const initialLikedItems = {};
//     storedLikes.forEach((item) => {
//       initialLikedItems[item._id] = true;
//     });
//     setLikedItems(initialLikedItems);
//   }, [storedLikes]);

//   const handleAddToWishlist = (product, index) => {
//     const activeColor = product.color?.[product.activeIndex] || product.color?.[0];
//     const activeImage = product.color?.[product.activeIndex]?.img?.[0]?.img_link || "/placeholder-image.png";
//     const item = { title: product.title, _id: product._id, cost: product.cost, img: activeImage, color: activeColor, category: product.category };

//     const isCurrentlyLiked = !!likedItems[product._id]; // Проверяем, лайкнут ли товар

//     if (isCurrentlyLiked) {
//       dispatch(removeItemFromWishlist(item));
//     } else {
//       dispatch(addItemToWishlist(item));
//     }

//     // Обновляем локальное состояние сразу
//     setLikedItems((prev) => ({ ...prev, [product._id]: !isCurrentlyLiked }));
//   };

//   const handleSetActiveIndex = (productId, index) => {
//     setData((prevData) =>
//       prevData.map((item) =>
//         item._id === productId ? { ...item, activeIndex: index } : item
//       )
//     );

//     if (filteredData) {
//       setFilteredData((prevFiltered) =>
//         prevFiltered.map((item) =>
//           item._id === productId ? { ...item, activeIndex: index } : item
//         )
//       );
//     }
//   };

//   const handleViewMobileFilter = () => {
//     setViewMobileFilter(!viewMobileFilter)
//   }

//   const addToRecentlyViewed = (product) => {
//     const recentlyViewed =
//       JSON.parse(localStorage.getItem("recentlyViewed")) || [];
//     if (!recentlyViewed.some((item) => item._id === product._id)) {
//       recentlyViewed.push(product);
//       localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
//     }
//   };

//   const renderItems = (arr) => {
//     return arr.map((item, i) => {
//       const activeColor = item.color?.[item.activeIndex] || item.color?.[0];
//       const activeImage = activeColor?.img?.[0]?.img_link || NoImg;

//       return (
//         <CSSTransition key={item._id} timeout={300} classNames="fade">
//           <li className="product-item-li">
//             <div className="product-item">
//               <Link to={`${location.pathname}/${item.title}`} onClick={() => addToRecentlyViewed(item)}>
//                 <ProductImage src={activeImage} className={""} />
//               </Link>
//               <div className="name-heart">
//                 <Link to={`${location.pathname}/${item.title}`} onClick={() => addToRecentlyViewed(item)}>
//                   <ProductName name={item.title} className={""} />
//                 </Link>
//                 <ProductHeart
//                   src={HeartIcon}
//                   src2={HeartIcon2}
//                   toggleHeart={() => handleAddToWishlist(item, i)}
//                   id={item._id}
//                   isLiked={likedItems[item._id]}
//                 />
//               </div>
//               <div className="cost-addBtn">
//                 <ProductCost cost={item.cost} discount={item.discount.percentage} />
//                 {item.discount.percentage > 0 ? (
//                   <ProductDiscount discount={item.discount.percentage} />
//                 ) : null}
//               </div>
//               <ColorList
//                 colors={item.color}
//                 setActiveIndex={(index) => handleSetActiveIndex(item._id, index)}
//                 activeIndex={item.activeIndex}
//                 setActiveSize={setActiveSize}
//                 activeSize={activeSize}
//                 classname={"isDisplaySizes"}
//               />
//             </div>
//           </li>
//         </CSSTransition>
//       );
//     });
//   };

//   const elements = useMemo(() => {
//     const finallyData = filteredData ? filteredData : data;
//     return renderItems(finallyData);
//   }, [data, activeIndex, isLiked, filteredData, storedLikes]);

//   return (
//     <div className="catalog-container">
//       <div className="category-title"><Link to={'/'}>ГОЛОВНА</Link> / <Link to={`/category/productList/${id}`}>{id.toUpperCase()}</Link></div>
//       <FilterIcon src={FilterImg} onClick={handleViewMobileFilter} />
//       <div className="catalog-content">
//         <div className="filter-block">
//           <Filter data={data} filteredData={setFilteredData} />
//         </div>
//         <div
//           className={`filter-block-mobile ${viewMobileFilter ? "visible" : "hidden"}`}
//         >
//           <div
//             className="close-filter-block-mobile"
//             onClick={() => setViewMobileFilter(false)}
//           >
//             &times;
//           </div>
//           <Filter
//             data={data}
//             filteredData={setFilteredData}
//             setViewMobileFilter={setViewMobileFilter}
//           />
//         </div>

//         <TransitionGroup component="ul" className="product-list">
//           {elements}
//         </TransitionGroup>
//       </div>
//     </div>

//   );
// };

// export default ProductList;

import { ProductCost } from "../../atoms/atomsProduct/Cost/Cost";
import { ProductName } from "../../atoms/atomsProduct/Name/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button/ButtonImage";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductDiscount } from "../../atoms/atomsProduct/Discount/Discount";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { Link, useParams, useLocation } from "react-router-dom";
import { FilterIcon } from "../../atoms/Filter/FilterIcon/FilterIcon";
import FilterImg from "../../../../assets/svg/filter1.svg";
import HeartIcon from "../../../../assets/svg/little-heart-2.svg";
import HeartIcon2 from "../../../../assets/svg/little-heart-3.svg";

import Filter from "../../organisms/Filter/Filter";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../../../redux/reducers/wishlistReducer";

import NoImg from "../../../../assets/svg/no-iamge.svg";

const ProductList = ({ viewMobileFilter, setViewMobileFilter }) => {
  const [data, setData] = useState([]);

  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [activeSize, setActiveSize] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLiked, setLiked] = useState();
  const [filteredData, setFilteredData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const childRefs = useRef([]);

  let { id } = useParams();
  const { getAllProductByCategory } = useGetDataProduct();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const storedLikes = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProductByCategory(id);
        const updatedData = result.map((item) => ({
          ...item,
          activeIndex: 0,
        }));
        setData(updatedData);
        setFilteredData(null); // Сброс фильтрованных данных
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    window.scrollTo(0, 0);
    fetchData();
  }, [id]); // Добавьте зависимости, чтобы предотвратить ошибки

  const loadRecentlyViewed = () => {
    const data = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(data);
  };

  useEffect(() => {
    const initialLikedItems = {};
    storedLikes.forEach((item) => {
      initialLikedItems[item._id] = true;
    });
    setLikedItems(initialLikedItems);
  }, [storedLikes]);

  const handleAddToWishlist = (product, index) => {
    const activeColor =
      product.color?.[product.activeIndex] || product.color?.[0];
    const activeImage =
      product.color?.[product.activeIndex]?.img?.[0]?.img_link ||
      "/placeholder-image.png";
    const item = {
      title: product.title,
      _id: product._id,
      cost: product.cost,
      img: activeImage,
      color: activeColor,
      category: product.category,
    };

    const isCurrentlyLiked = !!likedItems[product._id]; // Проверяем, лайкнут ли товар

    if (isCurrentlyLiked) {
      dispatch(removeItemFromWishlist(item));
    } else {
      dispatch(addItemToWishlist(item));
    }

    // Обновляем локальное состояние сразу
    setLikedItems((prev) => ({ ...prev, [product._id]: !isCurrentlyLiked }));
  };

  const handleSetActiveIndex = (productId, index) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === productId ? { ...item, activeIndex: index } : item
      )
    );

    if (filteredData) {
      setFilteredData((prevFiltered) =>
        prevFiltered.map((item) =>
          item._id === productId ? { ...item, activeIndex: index } : item
        )
      );
    }
  };

  const handleViewMobileFilter = () => {
    setViewMobileFilter(!viewMobileFilter);
  };

  const addToRecentlyViewed = (product) => {
    const recentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    if (!recentlyViewed.some((item) => item._id === product._id)) {
      recentlyViewed.push(product);
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
  };

  const renderItems = (arr) => {
    return arr.map((item, i) => {
      const activeColor = item.color?.[item.activeIndex] || item.color?.[0];
      const firstImage = activeColor?.img?.[0]?.img_link || NoImg;
      const secondImage = activeColor?.img?.[1]?.img_link || firstImage;

      return (
        <CSSTransition key={item._id} timeout={300} classNames="fade">
          <li className="product-item-li">
            <div className="product-item">
              <Link
                to={`${location.pathname}/${item.title}`}
                onClick={() => addToRecentlyViewed(item)}
              >
                <ProductImage
                  setHoveredItemId={setHoveredItemId}
                  item={item}
                  src={hoveredItemId === item._id ? secondImage : firstImage}
                />
              </Link>
              <div className="name-heart">
                <Link
                  to={`${location.pathname}/${item.title}`}
                  onClick={() => addToRecentlyViewed(item)}
                >
                  <ProductName name={item.title} className={""} />
                </Link>
                <ProductHeart
                  src={HeartIcon}
                  src2={HeartIcon2}
                  toggleHeart={() => handleAddToWishlist(item, i)}
                  id={item._id}
                  isLiked={likedItems[item._id]}
                />
              </div>
              <div className="cost-addBtn">
                <ProductCost
                  cost={item.cost}
                  discount={item.discount.percentage}
                />
                {item.discount.percentage > 0 ? (
                  <ProductDiscount discount={item.discount.percentage} />
                ) : null}
              </div>
              <ColorList
                colors={item.color}
                setActiveIndex={(index) =>
                  handleSetActiveIndex(item._id, index)
                }
                activeIndex={item.activeIndex}
                setActiveSize={setActiveSize}
                activeSize={activeSize}
                classname={"isDisplaySizes"}
              />
            </div>
          </li>
        </CSSTransition>
      );
    });
  };

  const elements = useMemo(() => {
    const finallyData = filteredData ? filteredData : data;
    return renderItems(finallyData);
  }, [
    data,
    activeIndex,
    isLiked,
    filteredData,
    storedLikes,
    isHovered,
    hoveredItemId,
  ]);

  return (
    <div className="catalog-container">
      <div className="category-title">
        <Link to={"/"}>ГОЛОВНА</Link> /{" "}
        <Link to={`/category/productList/${id}`}>{id.toUpperCase()}</Link>
      </div>
      <FilterIcon src={FilterImg} onClick={handleViewMobileFilter} />
      <div className="catalog-content">
        <div className="filter-block">
          <Filter data={data} filteredData={setFilteredData} />
        </div>
        <div
          className={`filter-block-mobile ${
            viewMobileFilter ? "visible" : "hidden"
          }`}
        >
          <div
            className="close-filter-block-mobile"
            onClick={() => setViewMobileFilter(false)}
          >
            &times;
          </div>
          <Filter
            data={data}
            filteredData={setFilteredData}
            setViewMobileFilter={setViewMobileFilter}
          />
        </div>

        <TransitionGroup component="ul" className="product-list">
          {elements}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default ProductList;
