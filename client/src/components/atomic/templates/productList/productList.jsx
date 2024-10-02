import { ProductItem } from "../../organisms/productItem/ProductItem";
import { useEffect } from "react";
import { fetchData } from "../../../../services/FetchData";
import { useState } from "react";

export const ProductList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(fetchData());
  }, []);

  return (
    <div>
      {/* {data.map((el) => (
        <div key={el.id}>
            {el.name}
        </div>
      ))} */
      console.log(data)}
    </div>
  );
};

export default ProductList;
