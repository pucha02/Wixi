import { ProductItem } from "../../organisms/productItem/ProductItem";
import { useEffect, useMemo, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { Link, useParams, useLocation } from "react-router-dom";
import { FilterIcon } from "../../atoms/Filter/FilterIcon/FilterIcon";
import FilterImg from '../../../../assets/svg/filter.svg'
import './productList.css'

const ProductList = () => {
  const [data, setData] = useState([]);
  let { id } = useParams();
  const { getAllProductByCategory } = useGetDataProduct();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProductByCategory(id);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <Link
          key={i}
          to={`${location.pathname}/${item.title}`}
          state={{
            localProductName: item.title,
            localProductCost: item.cost,
            localProductId: item._id,
            localProductColors: item.color,
            localProductDiscount: item.discount,
            localProductType: item.type,
            localProductImage: item.img
          }}
        >
          <li className="product-item-li">
            <ProductItem productId={item._id} productName={item.title} productCost={item.cost} productColors={item.color} productDiscount={item.discount} productType={item.type} />
          </li>
        </Link>
      );
    });
    return <ul className="product-list">{items}</ul>;
  }

  const elements = useMemo(() => {
    return renderItems(data);
  }, [data]);

  return (
    <div className="catalog-container">
      <div className="category-title">{id}<FilterIcon src={FilterImg}/></div>
      {elements}
    </div>
  );
};

export default ProductList;