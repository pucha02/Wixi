import { NameCategory } from "../../atoms/Category/NameField";
import { useEffect, useMemo, useState } from "react";
import useGetDataCategories from "../../../../services/FetchDataCategory";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const { getAllCategories } = useGetDataCategories();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCategories();

        setCategories(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <Link key={i} to={`/category/productList/${item.title}`} >
          <li>
            <NameCategory name={item.title} />
          </li>
        </Link>
      );
    });
    return <ul>{items}</ul>;
  }

  const elements = useMemo(() => {
    return renderItems(categories);
  }, [categories]);

  return <div>{elements}</div>;
};

export default CategoryList;
