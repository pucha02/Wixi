import { ProductItem } from "../../organisms/productItem/ProductItem";
import { useEffect, useMemo, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { Link, useParams, useLocation } from "react-router-dom";

const ProductList = () => {
  const [data, setData] = useState([]);
  let { id } = useParams();
  const { getAllProduct } = useGetDataProduct();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProduct(id);
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
        <Link key={i} to={`${location.pathname}/${item.title}`}>
          <li>
            <ProductItem name={item.title} description={item.description} cost={item.price}/>
          </li>
        </Link>
      );
    });
    return <ul>{items}</ul>;
  }

  const elements = useMemo(() => {
    return renderItems(data);
  }, [data]);

  return (
    <div>
      {elements}
      {id}
    </div>
  );
};

export default ProductList;
