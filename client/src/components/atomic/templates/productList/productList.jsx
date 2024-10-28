import { ProductItem } from "../../organisms/productItem/ProductItem";
import { useEffect, useMemo, useState } from "react";
import useGetDataProduct from "../../../../services/FetchData";

const ProductList = () => {
  const [data, setData] = useState([]);

  const { getAllProduct } = useGetDataProduct();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProduct('Костюми двійки');
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li key={i}>
          <ProductItem name={item.title} description={item.description} cost={item.price} />
        </li>
      );
    });
    return <ul>{items}</ul>;
  }

  const elements = useMemo(() => {
    return renderItems(data);
  }, [data]);

  return <div>{elements}</div>;
};

export default ProductList;