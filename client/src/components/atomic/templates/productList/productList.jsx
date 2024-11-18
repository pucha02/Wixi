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
          
        >
          <li className="product-item-li">
            <h2>{item.title}</h2>
            <p>{item.cost}</p> 
            <img src={item.img} alt=""/>
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