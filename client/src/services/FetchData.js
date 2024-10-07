import { useHttp } from "../hooks/http.hook";

const useGetDataProduct = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _url = 'http://localhost:5000/api/products/get-products-by-category';

  const getAllProduct = async (category) => {
    // Формируем URL с query параметром category
    const result = await request(`${_url}?category=${encodeURIComponent(category)}`);
    console.log(result);
    return result;
  };

  return {
    getAllProduct,
    process,
    setProcess,
    clearError,
  };
};

export default useGetDataProduct;
