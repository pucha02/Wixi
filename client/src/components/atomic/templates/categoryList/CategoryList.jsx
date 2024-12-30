import { NameCategory } from "../../atoms/Category/NameField";
import { useEffect, useMemo, useState } from "react";
import useGetDataCategories from "../../../../services/FetchDataCategory";
import { Link } from "react-router-dom";

const CategoryList = ({
  setViewCategories,
  overlayVisible,
  setOverlayVisible,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false); // Состояние для анимации

  const { getAllCategories } = useGetDataCategories();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCategories();
        setCategories(result);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setIsVisible(true); // Включаем анимацию при монтировании
  }, []);

  const handleClose = () => {
    setIsVisible(false); // Отключаем анимацию
    setTimeout(() => {
      setViewCategories(false); // Убираем блок после завершения анимации
    }, 300); // Время должно совпадать с длительностью анимации в CSS
  };

  function renderItems(arr) {
    return (
      <ul className="category-list-ul">
        {arr.map((item, i) => (
          <Link
            key={i}
            state={{ title: item.title }}
            to={`/category/productList/${item.title}`}
          >
            <li className="name-category" onClick={handleClose}>
              <NameCategory name={item.title} />
            </li>
          </Link>
        ))}
      </ul>
    );
  }

  const elements = useMemo(() => renderItems(categories), [categories]);

  return (
    <div>
      <div
        className={`category-list-block ${isVisible ? "visible" : "hidden"}`}
      >
        <div className="category-list">
          <h3>Категорії</h3>
          {loading ? <p></p> : <div className="categories">{elements}</div>}
        </div>
      </div>
      {/* Оверлей */}
      <div
        className={`overlay ${overlayVisible ? "visible" : ""}`}
        onClick={handleClose}
      />
    </div>
  );
};

export default CategoryList;
