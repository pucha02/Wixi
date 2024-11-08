import { ProductItem } from "../../organisms/productItem/ProductItem";
import { useEffect, useMemo, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";
import { Link, useParams, useLocation } from "react-router-dom";

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
          }}
        >
          <li>
            <ProductItem productName={item.title} productCost={item.cost} productId={item._id} />
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
