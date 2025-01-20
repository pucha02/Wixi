import { ProductCost } from "../../atoms/atomsProduct/Cost/Cost";
import { ProductName } from "../../atoms/atomsProduct/Name/Name";
import { ProductImage } from "../../atoms/atomsProduct/Image/Image";
import { ProductDiscount } from "../../atoms/atomsProduct/Discount/Discount";
import { ColorList } from "../../molecules/ColorList/ColorList";
import { ProductHeart } from "../../atoms/atomsProduct/Heart/Heart";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { Link } from "react-router-dom";
import { FilterIcon } from "../../atoms/Filter/FilterIcon/FilterIcon";
import FilterImg from "../../../../assets/svg/filter1.svg";
import HeartIcon from "../../../../assets/svg/little-heart-2.svg";
import HeartIcon2 from "../../../../assets/svg/little-heart-3.svg";
import Filter from "../../organisms/Filter/Filter";
import {
    addItemToWishlist,
    removeItemFromWishlist,
} from "../../../../redux/reducers/wishlistReducer";

import NoImg from '../../../../assets/svg/no-iamge.svg'


const AllProductList = ({ viewMobileFilter, setViewMobileFilter }) => {
    const [data, setData] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [likedItems, setLikedItems] = useState({});
    const [activeSize, setActiveSize] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    const [totalPages, setTotalPages] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLiked, setLiked] = useState();
    const [filteredData, setFilteredData] = useState(null);
    const [hasMoreItems, setHasMoreItems] = useState(true); // Флаг для отображения кнопки "Ещё"
    const childRefs = useRef([]);
    const { getPaginatedProducts } = useGetDataProduct();
    const dispatch = useDispatch();

    useEffect(() => {
        loadRecentlyViewed();
    }, []);

    const storedLikes = useSelector((state) => state.wishlist.items);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPaginatedProducts(page, limit);
                if (result.products.length > 0) {
                    setData((prevData) => [...prevData, ...result.products]); // Добавляем новые товары
                    setTotalPages(result.totalPages);
                } else {
                    setHasMoreItems(false); // Если товаров больше нет, скрываем кнопку "Ещё"
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [page, limit]);

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
        const activeColor = product.color?.[product.activeIndex] || product.color?.[0];
        const activeImage = product.color?.[product.activeIndex]?.img?.[0]?.img_link || NoImg;
        const item = { title: product.title, _id: product._id, cost: product.cost, img: activeImage, color: activeColor, category: product.category };

        const isCurrentlyLiked = !!likedItems[product._id];

        if (isCurrentlyLiked) {
            dispatch(removeItemFromWishlist(item));
        } else {
            dispatch(addItemToWishlist(item));
        }
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
        setViewMobileFilter(!viewMobileFilter)
    };

    const addToRecentlyViewed = (product) => {
        const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
        if (!recentlyViewed.some((item) => item._id === product._id)) {
            recentlyViewed.push(product);
            localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
        }
    };

    const renderItems = (arr) => {
        return arr.map((item, i) => {
            const activeColor = item.color?.[item.activeIndex] || item.color?.[0];
            const activeImage = activeColor?.img?.[0]?.img_link || NoImg;

            return (
                <CSSTransition key={item._id} timeout={300} classNames="fade">
                    <li className="product-item-li" key={i}>
                        <div className="product-item">
                            <Link to={`/category/productList/${item.category}/${item.title}`} onClick={() => addToRecentlyViewed(item)}>
                                <ProductImage src={activeImage} className={""} />
                            </Link>
                            <div className="name-heart">
                                <Link to={`/category/productList/${item.category}/${item.title}`} onClick={() => addToRecentlyViewed(item)}>
                                    <ProductName name={item.title} className={""} />
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
                                {item.discount.percentage > 0 && <ProductDiscount discount={item.discount.percentage} />}
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
                </CSSTransition>
            );
        });
    };

    const elements = useMemo(() => {
        const finallyData = filteredData ? filteredData : data;
        return renderItems(finallyData);
    }, [data, activeIndex, isLiked, filteredData, storedLikes]);

    return (
        <div className="catalog-container">
            <div className="category-title">
                <Link to={"/"}>ГОЛОВНА</Link> / <Link to={`/allproducts`}>КАТАЛОГ</Link>
            </div>
            <FilterIcon src={FilterImg} onClick={() => setViewMobileFilter(!viewMobileFilter)} />
            <div className="catalog-content">
                <div className="filter-block">
                    <Filter data={data} filteredData={setFilteredData} />
                </div>
                <div className={`filter-block-mobile ${viewMobileFilter ? "visible" : "hidden"}`}>
                    <div className="close-filter-block-mobile" onClick={() => setViewMobileFilter(false)}>&times;</div>
                    <Filter data={data} filteredData={setFilteredData} setViewMobileFilter={setViewMobileFilter} />
                </div>
                <ul className="product-list">
                    <TransitionGroup component={null}>{elements}</TransitionGroup>
                </ul>
            </div>
            {hasMoreItems && (
                <div className="load-more-container">
                    <button onClick={() => setPage((prevPage) => prevPage + 1)} className="load-more-btn">
                        Ещё
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllProductList;
