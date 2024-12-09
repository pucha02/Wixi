import { ProductCost } from "../../atoms/atomsProduct/Cost/Cost";
import { ProductName } from "../../atoms/atomsProduct/Name/Name";
import { ProductButtonAddToCart } from "../../atoms/atomsProduct/Button/ButtonImage";
import { ProductType } from "../../atoms/atomsProduct/Type";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductDiscount } from "../../atoms/atomsProduct/Discount/Discount";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
import { CarouselListByTypes } from "../CarouselListByTypes/CarouselListByTypes";
import { handleAddToCart } from "../../../../utils/cartOperations";
import { handleAddToWishList } from "../../../../utils/wishListOperations";
import { addItem } from "../../../../redux/reducers/cartReducer";
import { addItemToCart } from "../../../../redux/reducers/cartReducer";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { Link, useParams, useLocation } from "react-router-dom";
import { FilterIcon } from "../../atoms/Filter/FilterIcon/FilterIcon";
import FilterImg from "../../../../assets/svg/filter.svg";
import HeartIcon from "../../../../assets/svg/little-heart-2.svg";
import "./productList.css";
import Filter from "../../organisms/Filter/Filter";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../../../redux/reducers/wishlistReducer";

const ProductList = () => {
  const [data, setData] = useState([]);

  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [activeSize, setActiveSize] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLiked, setLiked] = useState();
  const [filteredData, setFilteredData] = useState(null);

  const childRefs = useRef([]);


  let { id } = useParams();
  const { getAllProductByCategory } = useGetDataProduct();
  const location = useLocation();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.cart.items);

  const token = localStorage.getItem('token');

  useEffect(() => {
    loadRecentlyViewed();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProductByCategory(id);
        const updatedData = result.map((item) => ({
          ...item,
          activeIndex: 0,
        }));
        setData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    window.scrollTo(0, 0);
    fetchData();
  }, [id]);

  const loadRecentlyViewed = () => {
    const data = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(data);


    fetchData();
  }, []);


  const handleAddToWishlist = (product, index) => {
    const item = { title: product.title, _id: product._id, cost: product.cost };
    console.log(childRefs.current);

    if (childRefs.current[index]?.classList.contains("liked")) {
      dispatch(removeItemFromWishlist(item));
    } else {
      dispatch(addItemToWishlist(item));
    }
    setLiked(!isLiked);
    // if (userId) {
    //   addToCart(userId, item);
    // }
  };

  const handleSetActiveIndex = (productId, index) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === productId ? { ...item, activeIndex: index } : item
      )
    );
  };

  const addToRecentlyViewed = (product) => {
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    if (!recentlyViewed.some((item) => item._id === product._id)) {
      recentlyViewed.push(product);
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
  };


  const renderItems = (arr) => {
    const items = arr.map((item, i) => {
      const activeColor = item.color?.[item.activeIndex] || item.color?.[0];
      const activeImage =
        activeColor?.img?.[0]?.img_link || "/placeholder-image.png";


      return (
        <li className="product-item-li" key={i}>
    <div className="product-item">
        <Link to={`${location.pathname}/${item.title}`} onClick={() => addToRecentlyViewed(item)}>
            <ProductImage src={activeImage} className={""} />
        </Link>
        <div className="name-heart">
            <ProductName name={item.title} className={""} />
            <ProductHeart
                src={HeartIcon}
                toggleHeart={() => handleAddToWishlist(item, i)}
                id={item._id}
                ref={(el) => (childRefs.current[i] = el)}
            />
            <Link to={`${location.pathname}/${item.title}`} onClick={() => addToRecentlyViewed(item)}>
                <ProductButtonAddToCart
                />
            </Link>
        </div>
        <div className="cost-addBtn">
            <ProductCost cost={item.cost} discount={item.discount.percentage} />
            {item.discount.percentage > 0 ? <ProductDiscount discount={item.discount.percentage} /> : null}

        </div>
        {/* <div className="cost-article">
    {activeColor?.sizes?.reduce(
      (total, size) => total + size.availableQuantity,
      0
    ) > 0 ? (
      <div className="availability-text">В наличии</div>
    ) : (
      <div className="availability-text">Нет в наличии</div>
    )}
  </div> */}
        <div className="cost-addBtn">
            <ProductCost
                cost={item.cost}
                discount={item.discount}
                className={""}
            />
        </div>
        <ColorList
            colors={item.color}
            setActiveIndex={(index) => handleSetActiveIndex(item._id, index)}
            activeIndex={item.activeIndex}
            setActiveSize={setActiveSize}
            activeSize={activeSize}
            classname={"isDisplaySizes"}
        />
    </div>
</li>
      );
    });
    return <ul className="product-list">{items}</ul>;
  };

  const elements = useMemo(() => {

    const finallyData = filteredData ? filteredData : data
    return renderItems(finallyData);
  }, [data, activeIndex, isLiked, filteredData]);


  return (
    <div className="catalog-container">
      <div className="category-title">
        {id}
        <FilterIcon src={FilterImg} />
      </div>

      <Filter data={data} filteredData={setFilteredData}/>

      {elements}

    </div>
  );
};

export default ProductList;
